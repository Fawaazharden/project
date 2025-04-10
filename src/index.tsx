import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Import router components
import { Vocalx } from "./screens/Vocalx";
import { ContactUs } from "./screens/ContactUs/ContactUs"; // Import ContactUs component
import { AdminPage } from "./screens/Admin"; // Import AdminPage component
// Removed incorrect Tailwind CSS import

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Vocalx />} /> {/* Home page route */}
        <Route path="/contact" element={<ContactUs />} /> {/* Contact page route */}
        <Route path="/admin" element={<AdminPage />} /> {/* Admin page route */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
