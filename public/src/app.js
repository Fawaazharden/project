// Gate the reveal animation on JS actually running, so a script failure degrades
// to a fully readable page rather than 47 invisible sections.
document.documentElement.classList.add('js');

const header = document.querySelector('[data-header]');
const menu = document.querySelector('[data-menu]');
const mobile = document.querySelector('[data-mobile]');
const sticky = document.querySelector('[data-sticky]');
const book = document.querySelector('#book');

const closeMenu = () => {
  if (!menu || !mobile) return;
  menu.setAttribute('aria-expanded', 'false');
  mobile.hidden = true;
  document.body.classList.remove('menu-open');
};

const onScroll = () => {
  header?.classList.toggle('scrolled', scrollY > 8);
  if (sticky) {
    const pastHero = scrollY > 480;
    const beforeCta = !book || scrollY < book.offsetTop - innerHeight * 0.8;
    sticky.hidden = !(pastHero && beforeCta);
  }
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  mobile.hidden = open;
  document.body.classList.toggle('menu-open', !open);
});
mobile?.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

const reveals = [...document.querySelectorAll('.reveal')];
const show = (el) => el.classList.add('visible');

const io = 'IntersectionObserver' in window
  ? new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { show(e.target); io.unobserve(e.target); }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    )
  : null;

if (io) {
  reveals.forEach((el) => io.observe(el));
  // Failsafe. If the observer has not revealed anything shortly after load, something
  // about this environment is not firing it, and copy nobody can read is worse than
  // copy that arrives without an animation.
  setTimeout(() => {
    if (!document.querySelector('.reveal.visible')) reveals.forEach(show);
  }, 2500);
} else {
  reveals.forEach(show);
}

// Testimonials stay as a poster frame until tapped, then play with sound and real controls.
document.querySelectorAll('[data-video]').forEach((wrap) => {
  const play = () => {
    const video = wrap.querySelector('video');
    if (!video) return;
    wrap.querySelector('.video-overlay')?.remove();
    wrap.querySelector('.video-badge')?.remove();
    wrap.querySelector('.video-name')?.remove();
    video.muted = false;
    video.controls = true;
    video.currentTime = 0;
    video.play().catch(() => {});
    wrap.removeAttribute('role');
    wrap.removeAttribute('tabindex');
    wrap.style.cursor = 'default';
  };
  wrap.addEventListener('click', play);
  wrap.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); play(); }
  });
});

// Both motion mocks replay the same way. The markup's default state is the
// FINISHED story, so no-JS visitors get the whole picture; this winds it back to
// empty, walks it forward a beat at a time, holds on the complete state, resets.
// paint(i) owns what beat i looks like. Reduced motion paints the last beat once
// and never starts a timer.
function replay(count, hold, ms, paint) {
  const still = matchMedia('(prefers-reduced-motion: reduce)');
  let loop = null;
  const sync = () => {
    if (loop) { clearInterval(loop); loop = null; }
    if (still.matches) { paint(count + hold); return; }
    let i = 0;
    paint(i);
    loop = setInterval(() => { i = (i + 1) % (count + hold + 1); paint(i); }, ms);
  };
  sync();
  still.addEventListener?.('change', sync);
}

// Hero lifecycle timeline. One stop every 1.5s, two beats on the finished state.
const timeline = document.querySelector('[data-timeline]');
if (timeline) {
  const stops = [...timeline.querySelectorAll('.tl-stop')];
  replay(stops.length, 2, 1500, (i) => {
    stops.forEach((s, n) => {
      s.classList.toggle('on', n === i - 1);
      s.classList.toggle('done', n < i - 1);
    });
  });
}

// Intent Match. The lead's own activity building up, then the matched follow up
// that comes out of it. Eight beats at a brisk 700ms: the story is longer than
// the hero timeline's, so a slower beat made you wait to reach the punchline.
const intent = document.querySelector('[data-intent]');
if (intent) {
  const steps = [...intent.querySelectorAll('[data-i]')];
  replay(steps.length, 4, 700, (i) => {
    steps.forEach((s, n) => s.classList.toggle('shown', n < i));
  });
}
