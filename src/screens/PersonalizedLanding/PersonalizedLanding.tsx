import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { getPersonalizedPageBySlug, extractYouTubeVideoId } from "../../lib/sanity";

export const PersonalizedLanding = (): JSX.Element => {
  const { businessName } = useParams<{ businessName: string }>();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [videoId, setVideoId] = useState<string>("");

  const navItems = [
    { title: "Features", href: "/#features" },
    { title: "Use Cases", href: "/#use-cases" },
    { title: "Testimonials", href: "/#testimonials" },
    { title: "Pricing", href: "/#pricing" },
    { title: "Contact Us", href: "/contact" },
  ];

  useEffect(() => {
    const fetchPage = async () => {
      if (!businessName) return;
      
      try {
        const data = await getPersonalizedPageBySlug(businessName);
        
        if (!data) {
          // Page not found - redirect to home
          navigate("/");
          return;
        }
        
        setPageData(data);
        const extractedVideoId = extractYouTubeVideoId(data.youtubeUrl);
        if (extractedVideoId) {
          setVideoId(extractedVideoId);
        }
      } catch (error) {
        console.error("Error fetching personalized page:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [businessName, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!pageData) return null;

  return (
    <div className="flex flex-col items-center justify-center relative bg-white overflow-x-hidden">
      {/* Header - Same as main landing page */}
      <header className="w-full flex flex-col items-center bg-white px-4 sm:px-6 lg:px-0">
        <nav className="w-full max-w-7xl mx-auto lg:max-w-none lg:mx-0 lg:px-8 flex items-center justify-between py-6">
          <div className="flex-1 md:flex-none flex items-center">
            <Link to="/">
              <img
                src="/screenshot-2025-03-26-224229-1.png"
                alt="Vocalx Labs Logo"
                className="h-10 sm:h-10"
                width="160"
                height="40"
              />
            </Link>
          </div>
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
          <div className="md:hidden flex-1 flex justify-end">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
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

        {/* Personalized Hero Content */}
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center pt-16 px-4 pb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-black leading-tight mb-5 [font-family:'Inter',Helvetica]">
            {pageData.businessName}, your follow-up is<br />costing you clients.
          </h1>
          
          <p className="text-xl text-gray-900 max-w-3xl mb-4 [font-family:'Inter',Helvetica] font-medium">
            You spend money getting Facebook leads.
          </p>
          <p className="text-xl text-gray-900 max-w-3xl [font-family:'Inter',Helvetica] font-medium">
            Our AI turns those leads into booked calls instantly — before your competition does.
          </p>
          
          <div className="mt-8 mb-4">
            <p className="text-lg font-semibold text-gray-800 mb-6">
              I have made you a video on how to close more deals without increasing the ad spend
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <span className="text-4xl">👇</span>
              <span className="text-4xl">👇</span>
              <span className="text-4xl">👇</span>
              <span className="text-4xl">👇</span>
            </div>
          </div>

          {/* YouTube Video Embed */}
          {videoId && (
            <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title={`Video for ${pageData.businessName}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}

          {!videoId && (
            <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl bg-gray-200 flex items-center justify-center" style={{ minHeight: '400px' }}>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-400 flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
                <p className="text-gray-500">Video placeholder</p>
                <p className="text-sm text-gray-400 mt-2">Add a YouTube video ID to display the video</p>
              </div>
            </div>
          )}

          {/* CTA Button */}
          <div className="mt-10">
            <Link
              to="/contact"
              className="bg-[#717fe8] hover:bg-[#5a67d8] text-white font-semibold text-lg py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Book a 15‑min Demo
            </Link>
          </div>
        </div>
      </header>

      {/* Footer - Same as main landing page */}
      <footer className="w-full bg-gray-900 text-gray-300 py-8 sm:py-12 px-4 sm:px-8 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6 md:gap-0">
          <div className="mb-6 md:mb-0">
            <img
              src="/screenshot-2025-03-26-224229-1.png"
              alt="Vocalx Labs Logo"
              className="h-7 sm:h-8 mb-3 sm:mb-4 mx-auto md:mx-0"
              width="160"
              height="40"
            />
            <p className="text-xs sm:text-sm">&copy; {new Date().getFullYear()} Vocalx Labs. All rights reserved.</p>
            <a href="mailto:team@vocalxlabs.com" className="block mt-2 text-xs sm:text-sm text-gray-400 hover:text-white hover:underline">
              team@vocalxlabs.com
            </a>
          </div>
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
            <Link to="/privacy-policy" className="text-xs sm:text-sm hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-xs sm:text-sm hover:text-white">
              Terms
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

