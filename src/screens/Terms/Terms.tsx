import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "../../components/ui/button";

export const Terms = (): JSX.Element => {
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
            Terms and Conditions
          </h1>
          
          <div className="prose prose-lg max-w-none text-gray-800 [font-family:'Inter',Helvetica]">
            <p className="mb-6">
              Please read these terms and conditions ("terms and conditions", "terms") carefully before using https://vocalxlabs.com website ("website", "service") operated by vocalxlabs ("us", "we", "our").
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Conditions of Use</h2>
            <p className="mb-6">
              By using this website, you certify that you have read and reviewed this Agreement and that you agree to comply with its terms. If you do not want to be bound by the terms of this Agreement, you are advised to stop using the website accordingly. vocalxlabs only grants use and access of this website, its products, and its services to those who have accepted its terms.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Privacy Policy</h2>
            <p className="mb-6">
              Before you continue using our website, we advise you to read our <Link to="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link> regarding our user data collection. It will help you better understand our practices.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Intellectual Property</h2>
            <p className="mb-4">
              You agree that all materials, products, and services provided on this website are the property of vocalxlabs, its affiliates, directors, officers, employees, agents, suppliers, or licensors including all copyrights, trade secrets, trademarks, patents, and other intellectual property. You also agree that you will not reproduce or redistribute vocalxlabs's intellectual property in any way, including electronic, digital, or new trademark registrations.
            </p>
            <p className="mb-6">
              You grant vocalxlabs a royalty-free and non-exclusive license to display, use, copy, transmit, and broadcast the content you upload and publish. For issues regarding intellectual property claims, you should contact the company in order to come to an agreement.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">User Accounts</h2>
            <p className="mb-4">
              As a user of this website, you may be asked to register with us and provide private information. You are responsible for ensuring the accuracy of this information, and you are responsible for maintaining the safety and security of your identifying information. You are also responsible for all activities that occur under your account or password.
            </p>
            <p className="mb-4">
              If you think there are any possible issues regarding the security of your account on the website, inform us immediately so we may address them accordingly.
            </p>
            <p className="mb-6">
              We reserve all rights to terminate accounts, edit or remove content and cancel orders at our sole discretion.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Applicable Law</h2>
            <p className="mb-6">
              By using this website, you agree that the laws of the United States, without regard to principles of conflict of laws, will govern these terms and conditions, or any dispute of any sort that might arise between you and vocalxlabs, or its business partners and associates.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">SMS Disclosure</h2>
            <p className="mb-6">
              Please note that, subject to end-user opt-in, vocalxlabs will periodically send SMS notifications regarding account issues and outages (customer care) and new offers (marketing). Msg volume may vary. Text HELP for more assistance. Text STOP to unsubscribe. Msg & Data Rates May Apply. Carriers are not liable for delayed or undelivered messages.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Disputes</h2>
            <p className="mb-6">
              Any dispute related in any way to your use of this website or to products you purchase from us shall be arbitrated by state or federal court in the United States, and you consent to the exclusive jurisdiction and venue of such courts.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Indemnification</h2>
            <p className="mb-6">
              You agree to indemnify vocalxlabs and its affiliates and hold vocalxlabs harmless against legal claims and demands that may arise from your use or misuse of our services. We reserve the right to select our own legal counsel.
            </p>

            <h2 className="text-2xl font-bold text-black mt-8 mb-4">Limitation on Liability</h2>
            <p className="mb-6">
              vocalxlabs is not liable for any damages that may occur to you as a result of your misuse of our website.
            </p>
            <p className="mb-6">
              vocalxlabs reserves the right to edit, modify, and change this Agreement at any time. We shall let our users know of these changes through electronic mail. This Agreement is an understanding between vocalxlabs and the user, and this supersedes and replaces all prior agreements regarding the use of this website.
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