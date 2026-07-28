import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import router components
import { HelmetProvider } from "react-helmet-async";
const ContactUs = lazy(() => import("./screens/ContactUs/ContactUs").then(m => ({ default: m.ContactUs })));
const AdminPage = lazy(() => import("./screens/Admin").then(m => ({ default: m.AdminPage })));
const PrivacyPolicy = lazy(() => import("./screens/PrivacyPolicy").then(m => ({ default: m.PrivacyPolicy })));
const Terms = lazy(() => import("./screens/Terms").then(m => ({ default: m.Terms })));
const BlogListPage = lazy(() => import("./screens/Blog/BlogListPage"));
const BlogPostPage = lazy(() => import("./screens/Blog/BlogPostPage"));
const PersonalizedLanding = lazy(() => import("./screens/PersonalizedLanding").then(m => ({ default: m.PersonalizedLanding })));
// Removed incorrect Tailwind CSS import

// The live homepage is a static page Netlify serves at "/", outside this bundle.
// Reaching it needs a real request, so RedirectHome does a full page load rather
// than a client-side <Navigate>. Anything the router cannot match lands here,
// which keeps a mistyped URL from falling through to the retired Vocalx page.
//
// INITIAL_PATH is the path of the document as first served, captured before any
// client-side navigation can change it.
const INITIAL_PATH = window.location.pathname;

const RedirectHome = (): null => {
  // If the bundle was itself served at "/", the static homepage rule did not
  // fire and replacing the location would loop. Bail rather than spin.
  if (INITIAL_PATH !== "/") {
    window.location.replace("/");
  }
  return null;
};

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<div />}> 
          <Routes>
            <Route path="/" element={<RedirectHome />} /> {/* Static homepage lives outside this bundle */}
            <Route path="/contact" element={<ContactUs />} /> {/* Contact page route */}
            <Route path="/admin" element={<AdminPage />} /> {/* Admin page route */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* Privacy Policy page route */}
            <Route path="/terms" element={<Terms />} /> {/* Terms page route */}
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/:businessName" element={<PersonalizedLanding />} /> {/* Personalized landing page - MUST be last */}
            <Route path="*" element={<RedirectHome />} /> {/* Anything unmatched goes to the live site */}
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
