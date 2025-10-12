import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import router components
import { HelmetProvider } from "react-helmet-async";
const Vocalx = lazy(() => import("./screens/Vocalx").then(m => ({ default: m.Vocalx })));
const ContactUs = lazy(() => import("./screens/ContactUs/ContactUs").then(m => ({ default: m.ContactUs })));
const AdminPage = lazy(() => import("./screens/Admin").then(m => ({ default: m.AdminPage })));
const PrivacyPolicy = lazy(() => import("./screens/PrivacyPolicy").then(m => ({ default: m.PrivacyPolicy })));
const Terms = lazy(() => import("./screens/Terms").then(m => ({ default: m.Terms })));
const BlogListPage = lazy(() => import("./screens/Blog/BlogListPage"));
const BlogPostPage = lazy(() => import("./screens/Blog/BlogPostPage"));
// Removed incorrect Tailwind CSS import

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<div />}> 
          <Routes>
            <Route path="/" element={<Vocalx />} /> {/* Home page route */}
            <Route path="/contact" element={<ContactUs />} /> {/* Contact page route */}
            <Route path="/admin" element={<AdminPage />} /> {/* Admin page route */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* Privacy Policy page route */}
            <Route path="/terms" element={<Terms />} /> {/* Terms page route */}
            <Route path="/blog" element={<BlogListPage />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
