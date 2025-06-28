import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "../../components/ui/button";

export const PrivacyPolicy = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Navigation items - same as main page for consistency
  const navItems = [
    { title: "Features", href: "/#features" },
    { title: "Use Cases", href: "/#use-cases" },
    { title: "Testimonials", href: "/#testimonials" },
    { title: "Pricing", href: "/#pricing" },
    { title: "Contact Us", href: "/contact" },
  ];

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
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="w-full">
          <h1 className="text-4xl font-extrabold text-black mb-8 text-center [font-family:'Inter',Helvetica]">
            Privacy Policy
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-800 [font-family:'Inter',Helvetica]">
            <p className="text-sm text-gray-600 mb-8">
              <strong>Effective Date:</strong> 14/06/2025
            </p>

            <p className="mb-6">
              Welcome to vocalxlabs ("we," "us," or "our"). We are committed to protecting the privacy and security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and protect the information we collect from visitors to our website and users of our services.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Information We Collect</h2>
            <p className="mb-6">
              <strong>Personal Information:</strong> When you use our website and services, we may collect personal information, such as your name, address, phone number, and email address. We collect this information when you voluntarily provide it to us through forms or other means.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">How We Use Your Information</h2>
            <p className="mb-4">
              We may use the information we collect for the following purposes:
            </p>
            <p className="mb-6">
              When you use our website and services, we use the information we collect in order to identify you, to provide you with our services, identify you, respond to questions or comments and make recommendations.
            </p>
            <p className="mb-6">
              <strong>Sharing of Personal Information:</strong> We may share your information with our partners for the purpose of providing you with our services. Mobile information including text messaging originator opt-in data and consent will not be shared with third parties/affiliates for marketing/promotional purposes or for any other purpose.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Opt-In Consent</h2>
            <p className="mb-6">
              Before collecting your information, we will obtain your explicit consent through an opt-in mechanism. By providing your personal information, you are expressly consenting to the collection and processing of that information for the purposes outlined in this Privacy Policy.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Information Sharing</h2>
            <p className="mb-4">
              Your information will only be shared with our business partners in the event that it helps us provide you with essential business functions. We do not sell, trade, or otherwise transfer your personal information to third parties. Mobile information will not be shared with third parties/affiliates for marketing/promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
            </p>
            <p className="mb-4">
              We may share your information in the following circumstances:
            </p>
            <p className="mb-4">
              <strong>Service Providers:</strong> We may share your information with third-party service providers who assist us in providing and maintaining our services, including sending SMS or email messages to you. These service providers are obligated to maintain the confidentiality and security of your information.
            </p>
            <p className="mb-6">
              <strong>Legal Compliance:</strong> We may disclose your information when required by law or to protect our rights, privacy, safety, or property, or that of our users or others.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Your Choices</h2>
            <p className="mb-4">
              You have the following choices regarding your personal information:
            </p>
            <p className="mb-6">
              <strong>Access and Update:</strong> You may access and update your personal information by contacting us at any time.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">SMS</h2>
            <p className="mb-4">
              <strong>Opt-Out:</strong> You can opt out of receiving SMS communications from us at any time by texting STOP to opt out to the number you receive SMSs from.
            </p>
            <p className="mb-6">
              <strong>Help:</strong> Text HELP for assistance with SMS messaging.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Data Security</h2>
            <p className="mb-6">
              We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the internet or electronic storage is entirely secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Children's Privacy</h2>
            <p className="mb-6">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe that a child has provided us with their personal information, please contact us, and we will take steps to delete that information.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Changes to this Privacy Policy</h2>
            <p className="mb-6">
              We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the updated policy on our website with the effective date.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Contact Us</h2>
            <p className="mb-6">
              If you have any questions, concerns, or requests related to this Privacy Policy or your personal information, please contact us at: support@vocalxlabs.com
            </p>

            <p className="mb-6">
              Thank you for visiting vocalxlabs. Your privacy is important to us, and we are committed to safeguarding your personal information and ensuring that it is used responsibly and securely.
            </p>
          </div>
        </div>
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
            <Link
              to="/privacy-policy"
              className="text-xs sm:text-sm hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-xs sm:text-sm hover:text-white"
            >
              Terms
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}; 