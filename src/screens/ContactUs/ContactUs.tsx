import React, { useState, useEffect } from 'react';

import { Link } from "react-router-dom";
import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "../../components/ui/button";

export const ContactUs = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Navigation items - same as main page for consistency
  const navItems = [
    { title: "Features", href: "/#features" },
    { title: "Use Cases", href: "/#use-cases" },
    { title: "Testimonials", href: "/#testimonials" },
    { title: "Pricing", href: "/#pricing" },
    { title: "Contact Us", href: "/contact" },
  ];
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCalendlyLoading, setIsCalendlyLoading] = useState(false);

  // Basic submit handler - prevents default and logs.
  // Add actual form submission logic here (e.g., API call).sss
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    console.log('Form submitted');
    // Placeholder for actual submission logic
    // alert('Form submitted! (Placeholder)'); // Simple feedback - replaced by showing Calendly
    setIsSubmitted(true);
    setIsCalendlyLoading(true);
  };

  // Effect to load Calendly script when the component mounts or isSubmitted changes
  // This ensures the script is loaded only when needed and re-initializes the widget if necessary.
  useEffect(() => {
    if (isSubmitted) {
      const scriptId = 'calendly-widget-script';
      // Check if script already exists
      if (document.getElementById(scriptId)) {
        // If script exists, potentially re-initialize Calendly if needed
        // (window as any).Calendly?.initInlineWidgets(); // Uncomment if re-initialization is necessary
        setIsCalendlyLoading(false);
        return;
      }

      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      
      // Add event listener to detect when Calendly is loaded
      script.onload = () => {
        // Give a small delay to allow Calendly to initialize
        setTimeout(() => {
          setIsCalendlyLoading(false);
        }, 1000);
      };
      
      document.body.appendChild(script);

      // Cleanup function to remove the script when the component unmounts
      // or if isSubmitted becomes false again
      return () => {
        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
          document.body.removeChild(existingScript);
        }
        // Also remove any Calendly badges that might persist
        const badges = document.querySelectorAll('.calendly-badge-widget');
        badges.forEach(badge => badge.remove());
        const popups = document.querySelectorAll('.calendly-popup-content');
        popups.forEach(popup => popup.remove());
      };
    }
  }, [isSubmitted]);

  // Loading spinner component with updated styling to match theme
  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#717fe8] mb-4"></div>
      <p className="[font-family:'Inter',Helvetica] font-medium text-gray-700 text-lg">Loading calendar...</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white overflow-x-hidden">
      {/* Header Section - Matching main page */}
      <header className="w-full flex flex-col items-center bg-white px-4 sm:px-6 lg:px-0">
        {/* Navigation */}
        <nav className="w-full max-w-7xl mx-auto lg:max-w-none lg:mx-0 lg:px-8 flex items-center justify-between py-6">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img
                src="/screenshot-2025-03-26-224229-1.png"
                alt="Vocalx Labs Logo"
                className="h-8 sm:h-10"
              />
            </Link>
          </div>
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-10">
            {navItems.map((item) => (
              item.href.startsWith('/') ? (
                <Link
                  key={item.title}
                  to={item.href}
                  className="text-base lg:text-lg font-semibold text-black hover:text-gray-700 [font-family:'Inter',Helvetica]"
                >
                  {item.title}
                </Link>
              ) : (
                <a
                  key={item.title}
                  href={item.href}
                  className="text-base lg:text-lg font-semibold text-black hover:text-gray-700 [font-family:'Inter',Helvetica]"
                >
                  {item.title}
                </a>
              )
            ))}
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden w-full bg-white absolute top-20 left-0 z-50 shadow-lg py-4">
            <div className="flex flex-col items-center space-y-4">
              {navItems.map((item) => (
                item.href.startsWith('/') ? (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="text-lg font-semibold text-black hover:text-gray-700 [font-family:'Inter',Helvetica]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <a
                    key={item.title}
                    href={item.href}
                    className="text-lg font-semibold text-black hover:text-gray-700 [font-family:'Inter',Helvetica]"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.title}
                  </a>
                )
              ))}
            </div>
          </div>
        )}
      </header>
      
      {/* Main Content */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center p-8">
      {!isSubmitted ? (
        <>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-black leading-tight mb-6 [font-family:'Inter',Helvetica]">Contact Us</h1>
          <p className="text-xl text-gray-800 mb-8 text-center max-w-2xl [font-family:'Inter',Helvetica] font-medium">
            We'd love to hear from you! Reach out with any questions about our AI voice technology.
          </p>
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-xl">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 [font-family:'Inter',Helvetica]">Name</label>
              <input
                type="text"
                id="name"
                required
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#717fe8] focus:border-transparent transition duration-200"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 [font-family:'Inter',Helvetica]">Email</label>
              <input
                type="email"
                id="email"
                required
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#717fe8] focus:border-transparent transition duration-200"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2 [font-family:'Inter',Helvetica]">Message</label>
              <textarea
                id="message"
                rows={4}
                required
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#717fe8] focus:border-transparent transition duration-200"
              ></textarea>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-[#717fe8] to-[#954ad2] hover:from-[#5a67d8] hover:to-[#7e3eb3] text-white font-semibold text-lg py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#717fe8] focus:ring-offset-2 w-full"
              >
                Schedule a Meeting
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h2 className="text-4xl font-extrabold text-black mb-4 [font-family:'Inter',Helvetica]">Thank You!</h2>
          <p className="text-xl text-gray-800 mb-8 text-center max-w-2xl [font-family:'Inter',Helvetica] font-medium">
            Your message has been sent. Please book a meeting with our voice AI experts below.
          </p>
          
          {/* Show loading spinner while Calendly is loading */}
          {isCalendlyLoading && <LoadingSpinner />}
          
          {/* Calendly inline widget begin */}
          {/* Added w-full and max-w-4xl for better responsiveness */}
          <div
            className={`calendly-inline-widget w-full max-w-4xl rounded-2xl overflow-hidden shadow-xl ${isCalendlyLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}
            data-url="https://calendly.com/danielgrayson087/30min?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=717fe8"
            style={{ minWidth: '320px', height: '700px' }}
          ></div>
          {/* Script is now loaded via useEffect */}
          {/* Calendly inline widget end */}
        </>
      )}
      </div>
      
      {/* Footer Section - Matching main page */}
      <footer className="w-full bg-gray-900 text-gray-300 py-8 sm:py-12 px-4 sm:px-8 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6 md:gap-0">
          {/* Logo and Copyright */}
          <div className="mb-6 md:mb-0">
            <img
              src="/screenshot-2025-03-26-224229-1.png"
              alt="Vocalx Labs Logo"
              className="h-7 sm:h-8 mb-3 sm:mb-4 mx-auto md:mx-0"
            />
            <p className="text-xs sm:text-sm">&copy; {new Date().getFullYear()} Vocalx Labs. All rights reserved.</p>
            {/* Add Email Link */}
            <a href="mailto:team@vocalxlabs.com" className="block mt-2 text-xs sm:text-sm text-gray-400 hover:text-white hover:underline">
              team@vocalxlabs.com
            </a>
          </div>

          {/* Footer Navigation */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-4 sm:gap-x-6 gap-y-2">
            {navItems.map((item) => (
              item.href.startsWith('/') ? (
                <Link
                  key={item.title}
                  to={item.href}
                  className="text-xs sm:text-sm hover:text-white"
                >
                  {item.title}
                </Link>
              ) : (
                <a
                  key={item.title}
                  href={item.href}
                  className="text-xs sm:text-sm hover:text-white"
                >
                  {item.title}
                </a>
              )
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
};