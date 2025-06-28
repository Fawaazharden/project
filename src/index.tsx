import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import router components
import { HelmetProvider } from "react-helmet-async";
import { Vocalx } from "./screens/Vocalx";
import { ContactUs } from "./screens/ContactUs/ContactUs"; // Import ContactUs component
import { AdminPage } from "./screens/Admin"; // Import AdminPage component
import { PrivacyPolicy } from "./screens/PrivacyPolicy"; // Import PrivacyPolicy component
import { Terms } from "./screens/Terms"; // Import Terms component
import BlogListPage from "./screens/Blog/BlogListPage";
import BlogPostPage from "./screens/Blog/BlogPostPage";
// Removed incorrect Tailwind CSS import

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Vocalx />} /> {/* Home page route */}
          <Route path="/contact" element={<ContactUs />} /> {/* Contact page route */}
          <Route path="/admin" element={<AdminPage />} /> {/* Admin page route */}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} /> {/* Privacy Policy page route */}
          <Route path="/terms" element={<Terms />} /> {/* Terms page route */}
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
