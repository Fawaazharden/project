"""Pre-deploy QA for the static blog pages under public/.

Checks, per page:
  - JSON-LD blocks parse as valid JSON
  - required schema types are present (BreadcrumbList / BlogPosting / FAQPage)
  - FAQPage answers actually appear in the visible copy (no schema-only FAQs)
  - canonical, og:url, og:image, title and meta description exist and are sane
  - house style rules: no em dashes, no banned AI-slop phrases, no "24/7"
  - internal links resolve to a real directory under public/

Usage:
    python scripts/verify-posts.py [slug ...]      # default: every post
"""
import json
import os
import re
import sys
from html import unescape

ROOT = "public"
BLOG = os.path.join(ROOT, "blog")

BANNED_PHRASES = [
    "in today's fast-paced", "in today's digital", "it's important to note",
    "it is important to note", "let's dive in", "dive into", "game-changer",
    "game changer", "leverage the", "unlock the", "navigate the landscape",
    "in conclusion", "delve into", "delving into", "at the end of the day",
    "when it comes to", "look no further", "the bottom line is",
]
BANNED_TOKENS = ["24/7", "24-7"]

TAG_RE = re.compile(r"<(script|style)[^>]*>.*?</\1>", re.S | re.I)
LDJSON_RE = re.compile(
    r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', re.S | re.I
)


def visible_text(html):
    stripped = TAG_RE.sub(" ", html)
    return unescape(re.sub(r"<[^>]+>", " ", stripped))


def norm(s):
    return re.sub(r"\s+", " ", s).strip().lower()


def collect_types(node, out):
    if isinstance(node, dict):
        t = node.get("@type")
        if isinstance(t, str):
            out.add(t)
        elif isinstance(t, list):
            out.update(t)
        for v in node.values():
            collect_types(v, out)
    elif isinstance(node, list):
        for v in node:
            collect_types(v, out)


def find_faq_entities(node, out):
    if isinstance(node, dict):
        if node.get("@type") == "FAQPage":
            for q in node.get("mainEntity", []) or []:
                name = q.get("name", "")
                ans = (q.get("acceptedAnswer") or {}).get("text", "")
                out.append((name, ans))
        for v in node.values():
            find_faq_entities(v, out)
    elif isinstance(node, list):
        for v in node:
            find_faq_entities(v, out)


def check(slug):
    path = os.path.join(BLOG, slug, "index.html")
    errors, warnings = [], []
    if not os.path.exists(path):
        return [f"MISSING FILE: {path}"], []

    html = open(path, encoding="utf-8").read()
    body = visible_text(html)
    body_n = norm(body)

    # --- house style -------------------------------------------------------
    for m in re.finditer(r"[—–]", body):
        ctx = norm(body[max(0, m.start() - 60):m.start() + 60])
        errors.append(f"em/en dash in copy: ...{ctx}...")
    for p in BANNED_PHRASES:
        if p in body_n:
            i = body_n.find(p)
            errors.append(f"AI-slop phrase {p!r}: ...{body_n[max(0,i-50):i+70]}...")
    for t in BANNED_TOKENS:
        if t in body:
            errors.append(f"banned token {t!r} present")

    # --- head tags ---------------------------------------------------------
    def meta(pattern):
        m = re.search(pattern, html, re.I)
        return m.group(1).strip() if m else None

    title = meta(r"<title>(.*?)</title>")
    desc = meta(r'<meta\s+name=["\']description["\']\s+content=["\'](.*?)["\']')
    canon = meta(r'<link\s+rel=["\']canonical["\']\s+href=["\'](.*?)["\']')
    ogurl = meta(r'<meta\s+property=["\']og:url["\']\s+content=["\'](.*?)["\']')
    ogimg = meta(r'<meta\s+property=["\']og:image["\']\s+content=["\'](.*?)["\']')

    expect = f"https://vocalxlabs.com/blog/{slug}/"
    if not title:
        errors.append("no <title>")
    elif len(title) > 62:
        warnings.append(f"title {len(title)} chars (>62 may truncate): {title}")
    if not desc:
        errors.append("no meta description")
    elif not (110 <= len(desc) <= 165):
        warnings.append(f"meta description {len(desc)} chars: {desc}")
    if canon != expect:
        errors.append(f"canonical is {canon!r}, expected {expect!r}")
    if ogurl != expect:
        errors.append(f"og:url is {ogurl!r}, expected {expect!r}")
    if ogimg:
        rel = ogimg.replace("https://vocalxlabs.com/", "")
        if not os.path.exists(os.path.join(ROOT, rel)):
            errors.append(f"og:image file missing: {rel}")
    else:
        errors.append("no og:image")

    # --- structured data ---------------------------------------------------
    blocks = LDJSON_RE.findall(html)
    if not blocks:
        errors.append("no JSON-LD")
    types, faqs = set(), []
    for raw in blocks:
        try:
            data = json.loads(raw)
        except json.JSONDecodeError as e:
            errors.append(f"INVALID JSON-LD: {e}")
            continue
        collect_types(data, types)
        find_faq_entities(data, faqs)

    for required in ("BreadcrumbList", "FAQPage"):
        if required not in types:
            errors.append(f"schema missing {required}")
    # Tool pages legitimately use WebApplication instead of BlogPosting.
    if not types & {"BlogPosting", "Article", "WebApplication"}:
        errors.append("schema missing BlogPosting (or WebApplication for tool pages)")

    for q, a in faqs:
        if norm(q) not in body_n:
            errors.append(f"FAQ question not visible on page: {q[:70]}")
        probe = norm(a)[:60]
        if probe and probe not in body_n:
            errors.append(f"FAQ answer not visible on page: {a[:70]}")

    # --- internal links ----------------------------------------------------
    for href in set(re.findall(r'href=["\'](/[^"\'#?]*)["\']', html)):
        if href in ("/",) or href.startswith("/ai-acquisition-manager/"):
            continue
        target = os.path.join(ROOT, href.strip("/"))
        if not (os.path.isdir(target) or os.path.exists(target)):
            errors.append(f"internal link 404: {href}")

    words = len(body.split())
    if words < 1200:
        warnings.append(f"only {words} words")
    return errors, warnings, words


def main():
    slugs = sys.argv[1:] or sorted(
        d for d in os.listdir(BLOG) if os.path.isdir(os.path.join(BLOG, d))
    )
    total_e = 0
    for slug in slugs:
        result = check(slug)
        if len(result) == 2:
            errors, warnings = result
            words = 0
        else:
            errors, warnings, words = result
        total_e += len(errors)
        status = "FAIL" if errors else ("warn" if warnings else "ok")
        print(f"\n[{status.upper():4}] {slug}  ({words} words)")
        for e in errors:
            print(f"   ERROR  {e}")
        for w in warnings:
            print(f"   warn   {w}")
    print(f"\n{'=' * 60}\n{len(slugs)} pages checked, {total_e} errors")
    sys.exit(1 if total_e else 0)


if __name__ == "__main__":
    main()
