import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import { MenuIcon, XIcon, Trash2Icon, Upload, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { createPersonalizedPage } from "../../lib/sanity";

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
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
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

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle paste from clipboard
  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith('image/')) {
          const file = items[i].getAsFile();
          if (file) {
            setLogoFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
              setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
          }
        }
      }
    }
  };

  // Remove logo
  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
            {/* Create Personalized Landing Page Section */}
            <div className="w-full mb-12">
              <h2 className="text-2xl font-bold mb-6">Create Personalized Landing Page</h2>
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <form onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const businessName = formData.get('businessName') as string;
                  const youtubeUrl = formData.get('youtubeUrl') as string;
                  const heroText = formData.get('heroText') as string;
                  const industry = formData.get('industry') as string;
                  const pricing = parseInt(formData.get('pricing') as string, 10);
                  
                  // Collect section visibility settings
                  const sections = {
                    videoSection: formData.get('section_videoSection') === 'on',
                    trustedByLogos: formData.get('section_trustedByLogos') === 'on',
                    callAiAssistant: formData.get('section_callAiAssistant') === 'on',
                    vaReplacement: formData.get('section_vaReplacement') === 'on',
                    whyManualFails: formData.get('section_whyManualFails') === 'on',
                    testimonialPricing: formData.get('section_testimonialPricing') === 'on',
                    faqSection: formData.get('section_faqSection') === 'on',
                    finalCta: formData.get('section_finalCta') === 'on',
                  };
                  
                  if (!businessName || !youtubeUrl) {
                    alert('Please fill in all fields');
                    return;
                  }
                  
                  try {
                    await createPersonalizedPage(
                      businessName.trim(), 
                      youtubeUrl.trim(), 
                      logoFile || undefined,
                      industry || 'general',
                      pricing || 199,
                      sections,
                      heroText || 'default'
                    );
                    alert(`✅ Landing page created!\n\nURL: vocalxlabs.com/${businessName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '')}`);
                    e.currentTarget.reset();
                    removeLogo();
                  } catch (error) {
                    console.error('Error creating page:', error);
                    alert('❌ Error creating landing page. Please try again.');
                  }
                }}>
                  <div className="mb-4">
                    <label htmlFor="businessName" className="block text-gray-700 text-sm font-bold mb-2">
                      Business Name
                    </label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      required
                      placeholder="e.g., Acme Corporation"
                      className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#717fe8]"
                    />
                    <p className="text-xs text-gray-500 mt-1">This will be converted to a URL-friendly slug</p>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="businessLogo" className="block text-gray-700 text-sm font-bold mb-2">
                      Business Logo (Optional)
                    </label>
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#717fe8] transition-colors cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                      onPaste={handlePaste}
                      tabIndex={0}
                    >
                      {logoPreview ? (
                        <div className="relative inline-block">
                          <img 
                            src={logoPreview} 
                            alt="Logo preview" 
                            className="max-h-32 mx-auto object-contain"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeLogo();
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                          <p className="text-gray-600 mb-1">Click to upload or paste image from clipboard</p>
                          <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      id="businessLogo"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <p className="text-xs text-gray-500 mt-1">Upload the business logo to show partnership (Vocalx & Their Logo)</p>
                  </div>
                  
                  <div className="mb-4">
                    <label htmlFor="youtubeUrl" className="block text-gray-700 text-sm font-bold mb-2">
                      YouTube Video URL
                    </label>
                    <input
                      type="url"
                      id="youtubeUrl"
                      name="youtubeUrl"
                      required
                      placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                      className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#717fe8]"
                    />
                    <p className="text-xs text-gray-500 mt-1">Full YouTube URL (e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ)</p>
                  </div>

                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-3">
                      Hero Message (Pain Point & Angle)
                    </label>
                    <div className="border border-gray-300 rounded-lg p-4 max-h-96 overflow-y-auto">
                      {/* Default option */}
                      <label className="flex items-start gap-3 p-3 border-2 rounded-lg mb-3 cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-[#717fe8] has-[:checked]:bg-blue-50">
                        <input type="radio" name="heroText" value="default" defaultChecked className="mt-1 w-4 h-4 text-[#717fe8]" />
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900 mb-1">Default Message</p>
                          <p className="text-sm text-gray-600">Your follow-up is <span className="text-red-600 font-bold">costing you clients</span></p>
                        </div>
                      </label>
                      
                      {/* Pain Point 1 */}
                      <details className="mb-2 border rounded-lg">
                        <summary className="cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 rounded-lg font-semibold text-gray-900 transition-colors">
                          Pain Point #1 - Missed Calls / Lost Leads
                        </summary>
                        <div className="p-3 space-y-2">
                          <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-[#717fe8] has-[:checked]:bg-blue-50">
                            <input type="radio" name="heroText" value="angle1" className="mt-1 w-4 h-4 text-[#717fe8]" />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm mb-1">Angle 1: Immediate Loss</p>
                              <p className="text-xs text-gray-600">Your leads are <span className="text-red-600 font-bold">talking to competitors</span>.</p>
                            </div>
                          </label>
                          <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-[#717fe8] has-[:checked]:bg-blue-50">
                            <input type="radio" name="heroText" value="angle2" className="mt-1 w-4 h-4 text-[#717fe8]" />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm mb-1">Angle 2: Every Missed Call = Money Lost</p>
                              <p className="text-xs text-gray-600">Every unanswered call becomes <span className="text-red-600 font-bold">someone else's client</span>.</p>
                            </div>
                          </label>
                        </div>
                      </details>

                      {/* Pain Point 2 */}
                      <details className="mb-2 border rounded-lg">
                        <summary className="cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 rounded-lg font-semibold text-gray-900 transition-colors">
                          Pain Point #2 - Slow Follow-Up / No System
                        </summary>
                        <div className="p-3 space-y-2">
                          <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-[#717fe8] has-[:checked]:bg-blue-50">
                            <input type="radio" name="heroText" value="angle3" className="mt-1 w-4 h-4 text-[#717fe8]" />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm mb-1">Angle 3: Response Time Kills ROI</p>
                              <p className="text-xs text-gray-600">You lose leads because of <span className="text-red-600 font-bold">slow responses</span>.</p>
                            </div>
                          </label>
                          <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-[#717fe8] has-[:checked]:bg-blue-50">
                            <input type="radio" name="heroText" value="angle4" className="mt-1 w-4 h-4 text-[#717fe8]" />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm mb-1">Angle 4: Your CRM Isn't Fast Enough</p>
                              <p className="text-xs text-gray-600">Manual follow-up is dead. Today, <span className="text-green-600 font-bold">AI wins instantly</span>.</p>
                            </div>
                          </label>
                        </div>
                      </details>

                      {/* Pain Point 3 */}
                      <details className="mb-2 border rounded-lg">
                        <summary className="cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 rounded-lg font-semibold text-gray-900 transition-colors">
                          Pain Point #3 - VAs Are Expensive + Inconsistent
                        </summary>
                        <div className="p-3 space-y-2">
                          <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-[#717fe8] has-[:checked]:bg-blue-50">
                            <input type="radio" name="heroText" value="angle5" className="mt-1 w-4 h-4 text-[#717fe8]" />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm mb-1">Angle 5: Cost of Manual Labor</p>
                              <p className="text-xs text-gray-600">AI does the work at <span className="text-green-600 font-bold">half the cost</span>.</p>
                            </div>
                          </label>
                          <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-[#717fe8] has-[:checked]:bg-blue-50">
                            <input type="radio" name="heroText" value="angle6" className="mt-1 w-4 h-4 text-[#717fe8]" />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm mb-1">Angle 6: People Get Busy. AI Doesn't.</p>
                              <p className="text-xs text-gray-600">VAs sleep and forget. AI responds <span className="text-green-600 font-bold">instantly 24/7</span>.</p>
                            </div>
                          </label>
                        </div>
                      </details>

                      {/* Pain Point 4 */}
                      <details className="mb-2 border rounded-lg">
                        <summary className="cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 rounded-lg font-semibold text-gray-900 transition-colors">
                          Pain Point #4 - Wasted Ad Spend
                        </summary>
                        <div className="p-3 space-y-2">
                          <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-[#717fe8] has-[:checked]:bg-blue-50">
                            <input type="radio" name="heroText" value="angle7" className="mt-1 w-4 h-4 text-[#717fe8]" />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm mb-1">Angle 7: Traffic Without Conversion</p>
                              <p className="text-xs text-gray-600">Slow follow-up means your budget <span className="text-red-600 font-bold">funds competitors</span>.</p>
                            </div>
                          </label>
                          <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-[#717fe8] has-[:checked]:bg-blue-50">
                            <input type="radio" name="heroText" value="angle8" className="mt-1 w-4 h-4 text-[#717fe8]" />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm mb-1">Angle 8: Your Ads Are Working — Your Follow-Up Isn't</p>
                              <p className="text-xs text-gray-600">Your ads are working — <span className="text-red-600 font-bold">your follow-up isn't</span>.</p>
                            </div>
                          </label>
                        </div>
                      </details>

                      {/* Pain Point 5 */}
                      <details className="mb-2 border rounded-lg">
                        <summary className="cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 rounded-lg font-semibold text-gray-900 transition-colors">
                          Pain Point #5 - Time Drain & Overworked Team
                        </summary>
                        <div className="p-3 space-y-2">
                          <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-[#717fe8] has-[:checked]:bg-blue-50">
                            <input type="radio" name="heroText" value="angle9" className="mt-1 w-4 h-4 text-[#717fe8]" />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm mb-1">Angle 9: Team Bottleneck</p>
                              <p className="text-xs text-gray-600">Your team should only talk to <span className="text-green-600 font-bold">serious buyers</span>.</p>
                            </div>
                          </label>
                          <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-[#717fe8] has-[:checked]:bg-blue-50">
                            <input type="radio" name="heroText" value="angle10" className="mt-1 w-4 h-4 text-[#717fe8]" />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm mb-1">Angle 10: AI Handles The Busy Work</p>
                              <p className="text-xs text-gray-600">Focus on closing — <span className="text-green-600 font-bold">AI handles everything</span>.</p>
                            </div>
                          </label>
                        </div>
                      </details>

                      {/* Pain Point 6 */}
                      <details className="mb-2 border rounded-lg">
                        <summary className="cursor-pointer p-3 bg-gray-50 hover:bg-gray-100 rounded-lg font-semibold text-gray-900 transition-colors">
                          Pain Point #6 - Low Ad Conversion Rate
                        </summary>
                        <div className="p-3 space-y-2">
                          <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-[#717fe8] has-[:checked]:bg-blue-50">
                            <input type="radio" name="heroText" value="angle11" className="mt-1 w-4 h-4 text-[#717fe8]" />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm mb-1">Angle 11: The Click Isn't the Win</p>
                              <p className="text-xs text-gray-600">Your ads work — but <span className="text-red-600 font-bold">conversion dies</span>.</p>
                            </div>
                          </label>
                          <label className="flex items-start gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-[#717fe8] has-[:checked]:bg-blue-50">
                            <input type="radio" name="heroText" value="angle12" className="mt-1 w-4 h-4 text-[#717fe8]" />
                            <div className="flex-1">
                              <p className="font-medium text-gray-900 text-sm mb-1">Angle 12: You Don't Need More Clicks — You Need More Conversations</p>
                              <p className="text-xs text-gray-600">Leads convert when you <span className="text-green-600 font-bold">respond instantly</span>.</p>
                            </div>
                          </label>
                        </div>
                      </details>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Choose a hero message that resonates with your client's main pain point</p>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="industry" className="block text-gray-700 text-sm font-bold mb-2">
                      Industry
                    </label>
                    <select
                      id="industry"
                      name="industry"
                      defaultValue="general"
                      className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#717fe8]"
                    >
                      <option value="general">General Page</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="roofing">Roofing</option>
                      <option value="christmas-lighting">Christmas Lighting</option>
                      <option value="pressure-wash">Pressure Wash</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Select the industry for keyword personalization</p>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="pricing" className="block text-gray-700 text-sm font-bold mb-2">
                      Monthly Pricing ($)
                    </label>
                    <input
                      type="number"
                      id="pricing"
                      name="pricing"
                      defaultValue={199}
                      min={0}
                      step={1}
                      required
                      className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#717fe8]"
                    />
                    <p className="text-xs text-gray-500 mt-1">Set the monthly pricing for this client</p>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-3">
                      Page Sections
                    </label>
                    <div className="border border-gray-300 rounded-lg p-4 space-y-3">
                      <p className="text-xs text-gray-500 mb-3">Select which sections to display on the landing page</p>
                      
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="section_videoSection"
                          defaultChecked
                          className="w-4 h-4 text-[#717fe8] border-gray-300 rounded focus:ring-[#717fe8]"
                        />
                        <span className="text-sm text-gray-700">Video Section</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="section_trustedByLogos"
                          defaultChecked
                          className="w-4 h-4 text-[#717fe8] border-gray-300 rounded focus:ring-[#717fe8]"
                        />
                        <span className="text-sm text-gray-700">Trusted By Logos</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="section_callAiAssistant"
                          defaultChecked
                          className="w-4 h-4 text-[#717fe8] border-gray-300 rounded focus:ring-[#717fe8]"
                        />
                        <span className="text-sm text-gray-700">Call AI Assistant + Testimonials</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="section_vaReplacement"
                          defaultChecked
                          className="w-4 h-4 text-[#717fe8] border-gray-300 rounded focus:ring-[#717fe8]"
                        />
                        <span className="text-sm text-gray-700">VA Replacement Section</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="section_whyManualFails"
                          defaultChecked
                          className="w-4 h-4 text-[#717fe8] border-gray-300 rounded focus:ring-[#717fe8]"
                        />
                        <span className="text-sm text-gray-700">Why Manual Follow-Up Fails</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="section_testimonialPricing"
                          defaultChecked
                          className="w-4 h-4 text-[#717fe8] border-gray-300 rounded focus:ring-[#717fe8]"
                        />
                        <span className="text-sm text-gray-700">Testimonial-Only Pricing</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="section_faqSection"
                          defaultChecked
                          className="w-4 h-4 text-[#717fe8] border-gray-300 rounded focus:ring-[#717fe8]"
                        />
                        <span className="text-sm text-gray-700">FAQ Section</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="section_finalCta"
                          defaultChecked
                          className="w-4 h-4 text-[#717fe8] border-gray-300 rounded focus:ring-[#717fe8]"
                        />
                        <span className="text-sm text-gray-700">Final CTA Section</span>
                      </label>
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-[#717fe8] to-[#954ad2] hover:from-[#5a67d8] hover:to-[#7e3eb3] text-white font-semibold text-lg py-3 px-8 rounded-lg shadow-md transition duration-300 w-full"
                  >
                    Create Landing Page
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Form Submissions Section */}
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