import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { MenuIcon, XIcon, Trash2Icon } from "lucide-react";
import { Button } from "../../components/ui/button";

// Define the submission type
interface Submission {
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

export const AdminPage = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Navigation items - same as main page for consistency
  const navItems = [
    { title: "Features", href: "/#features" },
    { title: "Use Cases", href: "/#use-cases" },
    { title: "Testimonials", href: "/#testimonials" },
    { title: "Pricing", href: "/#pricing" },
    { title: "Contact Us", href: "/contact" },
  ];

  // Simple authentication
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password check - in a real app, use proper authentication
    if (password === 'admin123') {
      setIsAuthenticated(true);
      loadSubmissions();
    } else {
      alert('Incorrect password');
    }
  };

  // Load submissions from localStorage
  const loadSubmissions = () => {
    try {
      const storedData = localStorage.getItem('contactSubmissions');
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setSubmissions(parsedData);
      }
    } catch (error) {
      console.error('Error loading submissions:', error);
    }
  };

  // Delete a submission
  const deleteSubmission = (index: number) => {
    try {
      const updatedSubmissions = [...submissions];
      updatedSubmissions.splice(index, 1);
      setSubmissions(updatedSubmissions);
      localStorage.setItem('contactSubmissions', JSON.stringify(updatedSubmissions));
    } catch (error) {
      console.error('Error deleting submission:', error);
    }
  };

  // Clear all submissions
  const clearAllSubmissions = () => {
    if (window.confirm('Are you sure you want to delete all submissions?')) {
      setSubmissions([]);
      localStorage.removeItem('contactSubmissions');
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch {
      return dateString;
    }
  };

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
        <h1 className="text-4xl sm:text-5xl font-extrabold text-black leading-tight mb-6 [font-family:'Inter',Helvetica]">Admin Dashboard</h1>
        
        {!isAuthenticated ? (
          <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 [font-family:'Inter',Helvetica]">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#717fe8] focus:border-transparent transition duration-200"
                />
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-[#717fe8] to-[#954ad2] hover:from-[#5a67d8] hover:to-[#7e3eb3] text-white font-semibold text-lg py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#717fe8] focus:ring-offset-2 w-full"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="w-full">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Contact Form Submissions</h2>
              <Button 
                onClick={clearAllSubmissions}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Clear All
              </Button>
            </div>
            
            {submissions.length === 0 ? (
              <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
                <p className="text-gray-500 text-lg">No submissions found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-xl">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold">{submission.name}</h3>
                        <p className="text-blue-600">{submission.email}</p>
                        <p className="text-gray-500 text-sm mt-1">
                          {formatDate(submission.timestamp)}
                        </p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => deleteSubmission(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2Icon className="h-5 w-5" />
                      </Button>
                    </div>
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <p className="whitespace-pre-wrap">{submission.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500 mb-2">
                Note: This page only shows submissions saved in your browser's localStorage.
              </p>
              <p className="text-sm text-gray-500">
                For all submissions, check your Netlify Forms dashboard.
              </p>
            </div>
          </div>
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