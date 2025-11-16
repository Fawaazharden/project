import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPersonalizedPageBySlug, extractYouTubeVideoId, urlFor } from "../../lib/sanity";

interface FAQ {
  question: string;
  shortAnswer: string;
  fullAnswer: string;
  icon: string;
}

export const PersonalizedLanding = (): JSX.Element => {
  const { businessName } = useParams<{ businessName: string }>();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [videoId, setVideoId] = useState<string>("");
  const [priceRevealed, setPriceRevealed] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  const faqs: FAQ[] = [
    {
      question: "Does the AI actually sound human?",
      shortAnswer: "Yes — it sounds like a normal conversational agent, not robotic.",
      fullAnswer: "Our AI uses natural conversational modeling, tone-matching, and memory. It pauses, laughs, asks questions, understands accents, and reacts to context. 90% of leads cannot tell it's an AI—until you tell them.",
      icon: "🎤"
    },
    {
      question: "Will it work with my existing Facebook ad leads?",
      shortAnswer: "Yes — it plugs directly into your lead forms or CRM.",
      fullAnswer: "We automatically sync your Facebook leads, Google leads, website leads, or CRM entries. Every new lead gets called and texted instantly within 3 seconds.",
      icon: "🔌"
    },
    {
      question: "Is this replacing my VA or my sales team?",
      shortAnswer: "It replaces the repetitive tasks, not the closer.",
      fullAnswer: "Your AI handles: first call, qualification, follow-up, and appointment booking. Your closer handles the sale. You get the best of both worlds — without the salary, training, or unreliability.",
      icon: "👥"
    },
    {
      question: "Can the AI really call me or my leads instantly?",
      shortAnswer: "Yes — try it on this page.",
      fullAnswer: "Enter your number in the form above and you'll receive a call in seconds. The exact same behavior happens for your real leads.",
      icon: "⚡"
    },
    {
      question: "What if a lead asks complex questions?",
      shortAnswer: "AI handles 95% of real-world objections.",
      fullAnswer: "Your AI is trained on your offers, your scripts, your FAQs, and your tone. It can answer pricing, availability, scheduling, and product questions without hesitation. If something is too complex, it transfers to a human instantly.",
      icon: "❓"
    },
    {
      question: "How accurate is the qualification process?",
      shortAnswer: "Very accurate — over 87% match with human qualifiers.",
      fullAnswer: "Your AI listens to tone, intent, emotional signals, and keywords. It tags leads, scores them, and pushes only qualified ones to your calendar. Unqualified leads are filtered automatically.",
      icon: "🎯"
    },
    {
      question: "Is this allowed by Facebook and Google policies?",
      shortAnswer: "Yes — fully compliant.",
      fullAnswer: "Our system only calls leads who opted-in. We follow all TCPA, DNC, and required compliance guidelines. You're 100% protected.",
      icon: "🛡️"
    },
    {
      question: "How long does setup take?",
      shortAnswer: "10–15 minutes.",
      fullAnswer: "We customize your AI voice, script, lead flow, and integrations. Most businesses are live within the same day.",
      icon: "⏱️"
    },
    {
      question: "Do I need to record anything?",
      shortAnswer: "No.",
      fullAnswer: "Your AI learns from text input. No recording, no voice acting, no lengthy training required.",
      icon: "🎙️"
    },
    {
      question: "How does pricing work?",
      shortAnswer: "Simple usage-based model.",
      fullAnswer: "You only pay for the calls/texts your AI actually sends. No hidden fees. No long-term contracts.",
      icon: "💰"
    },
    {
      question: "What if the AI says something wrong?",
      shortAnswer: "It won't — everything is predefined.",
      fullAnswer: "Your AI only speaks from the scripts, knowledge, and rules you give it. It cannot go off-track or invent information. This ensures perfect consistency — every single time.",
      icon: "✅"
    },
    {
      question: "Is this personalized page actually made for my business?",
      shortAnswer: "Yes — 100% personalized using your data.",
      fullAnswer: `This page is built exclusively for ${pageData?.businessName || 'your business'}: personalized headline, custom demo, custom AI script, and custom call experience. It shows exactly how your business would use the system.`,
      icon: "🎨"
    }
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

  // Scroll video into view on mobile devices after page loads
  useEffect(() => {
    if (!loading && pageData && videoRef.current) {
      // Small delay to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        if (videoRef.current) {
          // For mobile devices, scroll the video to the bottom of viewport
          // This ensures the video is fully visible but nothing below it is shown
          videoRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end', // Positions the element at the bottom of the viewport
            inline: 'nearest'
          });
        }
      }, 300); // 300ms delay to ensure smooth loading experience
      
      return () => clearTimeout(timer);
    }
  }, [loading, pageData]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!pageData) return <></>;

  return (
    <div className="flex flex-col items-center justify-center relative bg-white overflow-x-hidden">
      {/* Header - Partnership Logos */}
      <header className="w-full flex flex-col items-center bg-white px-4 sm:px-6 lg:px-0">
        <nav className="w-full max-w-7xl mx-auto lg:max-w-none lg:mx-0 lg:px-8 flex items-center justify-start py-3 sm:py-6">
          <div className="flex items-center gap-0">
            <Link to="/">
              <img
                src="/screenshot-2025-03-26-224229-1.png"
                alt="Vocalx Labs Logo"
                className="h-8 sm:h-12 w-auto object-contain"
              />
            </Link>
            {pageData.businessLogo && (
              <>
                <span className="text-xl sm:text-3xl font-bold text-gray-600">&</span>
                <img
                  src={urlFor(pageData.businessLogo).width(200).url()}
                  alt={`${pageData.businessName} Logo`}
                  className="h-8 sm:h-12 w-auto object-contain"
                  style={{ maxWidth: '200px' }}
                />
              </>
            )}
          </div>
        </nav>

        {/* Personalized Hero Content */}
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center pt-2 sm:pt-4 px-4 pb-6 sm:pb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-black leading-tight mb-2 sm:mb-5 [font-family:'Inter',Helvetica]">
            {pageData.businessName}, your follow-up is<span className="hidden sm:inline"><br /></span> costing you clients.
          </h1>
          
          <p className="text-sm sm:text-xl text-gray-900 max-w-3xl mb-2 sm:mb-4 [font-family:'Inter',Helvetica] font-medium hidden sm:block">
            You spend money getting Facebook leads.
          </p>
          <p className="text-sm sm:text-xl text-gray-900 max-w-3xl mb-3 sm:mb-0 [font-family:'Inter',Helvetica] font-medium">
            Our AI turns those leads into booked calls instantly — before your competition does.
          </p>
          
          <div className="mt-3 sm:mt-8 mb-2 sm:mb-4">
            <p className="text-sm sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-6">
              Watch how to close more deals without increasing ad spend
            </p>
            <div className="flex justify-center gap-2 sm:gap-4 mb-3 sm:mb-8">
              <span className="text-2xl sm:text-4xl animate-bounce" style={{ animationDelay: '0s', animationDuration: '1.5s' }}>👇</span>
              <span className="text-2xl sm:text-4xl animate-bounce" style={{ animationDelay: '0.2s', animationDuration: '1.5s' }}>👇</span>
              <span className="text-2xl sm:text-4xl animate-bounce" style={{ animationDelay: '0.4s', animationDuration: '1.5s' }}>👇</span>
              <span className="text-2xl sm:text-4xl animate-bounce" style={{ animationDelay: '0.6s', animationDuration: '1.5s' }}>👇</span>
            </div>
          </div>

          {/* YouTube Video Embed */}
          {videoId && (
            <div ref={videoRef} className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
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

          {/* Call AI Agent Section */}
          <div className="w-full max-w-3xl mt-12 sm:mt-16 px-4">
            <div className="text-center">
              {/* Section Title */}
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black mb-4 sm:mb-6 [font-family:'Inter',Helvetica] leading-tight">
                Your AI Agent Wants to Talk To You, Call Now?
              </h2>
              
              {/* Section Subtext */}
              <div className="mb-8 sm:mb-10">
                <p className="text-base sm:text-lg text-gray-700 mb-2 [font-family:'Inter',Helvetica]">
                  Your AI assistant is live right now.
                </p>
                <p className="text-base sm:text-lg text-gray-700 [font-family:'Inter',Helvetica]">
                  It will greet you, answer questions, and show you exactly how it follows up with your leads 24/7.
                </p>
              </div>

              {/* Main CTA Button */}
              <div className="mb-4">
                <a
                  href="tel:+14706651434"
                  className="inline-flex items-center justify-center gap-3 px-8 sm:px-12 py-4 sm:py-5 text-lg sm:text-xl font-bold text-white rounded-full shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] animate-pulse-subtle"
                  style={{
                    background: 'linear-gradient(135deg, #22c55e 0%, #10b981 50%, #3b82f6 100%)',
                  }}
                >
                  <span className="text-2xl sm:text-3xl">📞</span>
                  <span>Call Your AI Agent</span>
                </a>
              </div>

              {/* Failsafe Text */}
              <div className="mb-6 sm:mb-8">
                <p className="text-sm sm:text-base text-gray-600 flex items-center justify-center gap-2 [font-family:'Inter',Helvetica]">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>Or dial manually: <strong>+1 (470) 665-1434</strong></span>
                </p>
              </div>

              {/* Microproof */}
              <div className="text-center">
                <p className="text-xs sm:text-sm text-gray-500 [font-family:'Inter',Helvetica] italic">
                  ✨ Over 50,000+ AI-led conversations completed — experience how natural it sounds.
                </p>
              </div>
            </div>
          </div>

          {/* VA Replacement Section */}
          <div className="w-full max-w-6xl mt-16 sm:mt-24 px-4">
            {/* Section Title */}
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black mb-4 [font-family:'Inter',Helvetica] leading-tight">
                All you need is one killer closer. Let AI replace the rest.<br />
                <span className="text-red-600">Fire them.</span>
              </h2>
              <p className="text-base sm:text-xl text-gray-700 [font-family:'Inter',Helvetica] mt-4 max-w-3xl mx-auto leading-relaxed">
                Your best closer should only talk to <strong>qualified leads</strong> — not waste time chasing no-shows, dead leads, and unresponsive people.
              </p>
            </div>

            {/* Vertical Checkmark vs Cross Comparison */}
            <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8 mb-8 sm:mb-12">
              {[
                {
                  feature: 'Speed & Scale',
                  ai: 'Calls 200 leads instantly',
                  va: 'Can only call a few leads at a time'
                },
                {
                  feature: 'Consistent Follow-Up',
                  ai: 'Follows up 8–12 times automatically',
                  va: 'Forgets or gets too busy after 2-3 attempts'
                },
                {
                  feature: 'Tone & Quality',
                  ai: 'Perfect tone and consistency every single time',
                  va: 'Depends on mood, energy, and how their day is going'
                },
                {
                  feature: 'Availability',
                  ai: 'Works 24/7 without breaks, sick days, or vacations',
                  va: 'Limited hours, takes breaks, calls in sick'
                },
                {
                  feature: 'Objection Handling',
                  ai: 'Handles objections flawlessly using proven scripts',
                  va: 'Struggles with tough objections or gives up'
                },
                {
                  feature: 'Lead Qualification',
                  ai: 'Qualifies leads in 30 seconds with precision',
                  va: 'Takes 5-10 minutes and might miss red flags'
                }
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-xl shadow-lg border-2 border-gray-200 overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                >
                  {/* Feature Name Header */}
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-4 sm:px-6 py-3 sm:py-4">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white [font-family:'Inter',Helvetica]">
                      {item.feature}
                    </h3>
                  </div>
                  
                  {/* Comparison Content */}
                  <div className="p-4 sm:p-6 space-y-4">
                    {/* AI - Green Checkmark */}
                    <div className="flex items-start gap-3 bg-green-50 p-3 sm:p-4 rounded-lg border-l-4 border-green-500">
                      <span className="text-green-600 text-xl sm:text-2xl flex-shrink-0 mt-0.5">✓</span>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-bold text-green-900 mb-1 [font-family:'Inter',Helvetica]">
                          AI:
                        </p>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-800 font-semibold [font-family:'Inter',Helvetica] leading-relaxed">
                          {item.ai}
                        </p>
                      </div>
                    </div>
                    
                    {/* VA - Red Cross */}
                    <div className="flex items-start gap-3 bg-red-50 p-3 sm:p-4 rounded-lg border-l-4 border-red-500">
                      <span className="text-red-600 text-xl sm:text-2xl flex-shrink-0 mt-0.5">❌</span>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-bold text-red-900 mb-1 [font-family:'Inter',Helvetica]">
                          VA:
                        </p>
                        <p className="text-sm sm:text-base lg:text-lg text-gray-800 [font-family:'Inter',Helvetica] leading-relaxed">
                          {item.va}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA Block */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-500 p-6 sm:p-8 rounded-2xl shadow-xl text-center max-w-3xl mx-auto">
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 [font-family:'Inter',Helvetica] leading-relaxed mb-3">
                <span className="text-green-600">Your closer talks ONLY to people who are ready to buy.</span>
              </p>
              <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 [font-family:'Inter',Helvetica] leading-relaxed">
                AI handles the junk — without hourly wages, mistakes, delays, or attitude.
              </p>
            </div>

            {/* Bottom Trust Bar */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 sm:p-6 rounded-xl shadow-lg text-center mt-8 sm:mt-12">
              <p className="text-sm sm:text-base lg:text-lg [font-family:'Inter',Helvetica] leading-relaxed">
                <strong>Businesses waste 80% of their VA budget on chasing leads who never respond.</strong>
                <br className="hidden sm:block" />
                <span className="text-green-400 font-semibold"> AI eliminates that waste instantly.</span>
              </p>
            </div>
          </div>

          {/* Why Manual Follow-Up Fails Section */}
          <div className="w-full max-w-6xl mt-16 sm:mt-24 px-4">
            {/* Section Title */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black mb-4 [font-family:'Inter',Helvetica] leading-tight flex items-center justify-center gap-3">
                <span>Why Manual Follow-Up Fails Every Time</span>
              </h2>
              <p className="text-base sm:text-xl text-gray-600 [font-family:'Inter',Helvetica] mt-4">
                And why <strong>{pageData.businessName}</strong> loses clients without even realizing it.
              </p>
            </div>

            {/* Problem/Agitate vs Solution Split Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl mb-12">
              {/* LEFT SIDE - PROBLEM & AGITATE */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 sm:p-8 lg:p-10 lg:border-r-4 lg:border-red-200">
                {/* PROBLEM Section */}
                <div className="mb-8 sm:mb-10">
                  <div className="text-center lg:text-left mb-6">
                    <div className="inline-block lg:hidden mb-3">
                      <span className="text-4xl">⚠️</span>
                    </div>
                    <div className="flex items-start gap-3 lg:mb-0">
                      <span className="text-3xl flex-shrink-0 hidden lg:inline">⚠️</span>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#7d2e2e] [font-family:'Inter',Helvetica] leading-tight">
                        Your Leads Don't Get Followed Up Fast Enough
                      </h3>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 sm:space-y-5">
                    <li className="flex items-start gap-2 sm:gap-3">
                      <span className="text-[#7d2e2e] font-bold text-lg sm:text-xl flex-shrink-0 mt-0.5">•</span>
                      <p className="text-sm sm:text-base lg:text-lg text-gray-800 [font-family:'Inter',Helvetica] leading-relaxed">
                        <strong className="text-[#7d2e2e] font-bold">Facebook leads go cold in under 5 minutes</strong>, but humans follow up in hours.
                      </p>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <span className="text-[#7d2e2e] font-bold text-lg sm:text-xl flex-shrink-0 mt-0.5">•</span>
                      <p className="text-sm sm:text-base lg:text-lg text-gray-800 [font-family:'Inter',Helvetica] leading-relaxed">
                        <strong className="text-[#7d2e2e] font-bold">VAs juggle tasks</strong> — they miss calls, forget messages, or reply late.
                      </p>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <span className="text-[#7d2e2e] font-bold text-lg sm:text-xl flex-shrink-0 mt-0.5">•</span>
                      <p className="text-sm sm:text-base lg:text-lg text-gray-800 [font-family:'Inter',Helvetica] leading-relaxed">
                        <strong className="text-[#7d2e2e] font-bold">Manual outreach depends on mood, energy, and memory.</strong>
                      </p>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <span className="text-[#7d2e2e] font-bold text-lg sm:text-xl flex-shrink-0 mt-0.5">•</span>
                      <p className="text-sm sm:text-base lg:text-lg text-gray-800 [font-family:'Inter',Helvetica] leading-relaxed">
                        <strong className="text-[#7d2e2e] font-bold">72% of your ad spend gets wasted</strong> because no one responds instantly.
                      </p>
                    </li>
                  </ul>
                </div>

                {/* AGITATE Section */}
                <div className="border-t-2 border-red-300 pt-6 sm:pt-8">
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#7d2e2e] mb-4 sm:mb-6 [font-family:'Inter',Helvetica]">
                    Each Delay Costs Your Hard Earned Money.
                  </h4>
                  
                  <p className="text-sm sm:text-base lg:text-lg text-gray-800 font-semibold mb-3 sm:mb-4 [font-family:'Inter',Helvetica]">
                    Every minute you wait, your leads:
                  </p>
                  
                  <ul className="space-y-2 sm:space-y-3 mb-5 sm:mb-6">
                    {['talk to your competitor', 'forget who you are', 'lose interest', 'assume you don\'t care', 'move on'].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 sm:gap-3">
                        <span className="text-red-600 text-lg sm:text-xl">❌</span>
                        <span className="text-sm sm:text-base lg:text-lg text-gray-800 [font-family:'Inter',Helvetica]">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <p className="text-sm sm:text-base lg:text-lg text-gray-800 font-medium mb-5 sm:mb-6 [font-family:'Inter',Helvetica] leading-relaxed">
                    And when your VA misses even <strong className="text-[#7d2e2e]">ONE</strong> lead?<br />
                    That's a potential client gone forever.
                  </p>
                  
                  <div className="bg-[#7d2e2e] text-white p-4 sm:p-5 rounded-lg shadow-lg">
                    <p className="text-base sm:text-lg lg:text-xl font-bold [font-family:'Inter',Helvetica] text-center leading-relaxed">
                      <strong>You paid for the lead.</strong><br />
                      You just didn't claim it fast enough.
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE - SOLUTION */}
              <div className="bg-white p-6 sm:p-8 lg:p-10">
                <div className="text-center lg:text-left mb-6">
                  <div className="inline-block lg:hidden mb-3">
                    <span className="text-4xl">✅</span>
                  </div>
                  <div className="flex items-start gap-3 lg:mb-0">
                    
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-900 [font-family:'Inter',Helvetica] leading-tight">
                      Your AI Responds Immediately. Every Time. Without Failing.
                    </h3>
                  </div>
                </div>
                
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 font-semibold mb-5 sm:mb-6 [font-family:'Inter',Helvetica]">
                  The moment a lead comes in:
                </p>
                
                <ul className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
                  {[
                    { icon: '⚡', text: 'AI calls within 1–2 seconds' },
                    { icon: '💬', text: 'AI texts immediately' },
                    { icon: '🎯', text: 'AI handles objections' },
                    { icon: '📅', text: 'AI books appointments' },
                    { icon: '🔄', text: 'AI follows up for days automatically' },
                    { icon: '🌙', text: 'AI never sleeps, never forgets, never gets tired' }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 sm:gap-4">
                      <span className="text-xl sm:text-2xl flex-shrink-0">{item.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm sm:text-base lg:text-lg text-gray-800 font-semibold [font-family:'Inter',Helvetica] leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="bg-gradient-to-r from-green-50 to-blue-50 border-l-4 border-green-500 p-4 sm:p-5 lg:p-6 rounded-lg shadow-md">
                  <p className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 [font-family:'Inter',Helvetica] leading-relaxed">
                    Where humans drop the ball, <span className="text-green-600">AI performs perfectly.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Final Contrasting Block */}
            <div className="bg-gradient-to-r from-gray-900 to-black text-white p-6 sm:p-8 lg:p-12 rounded-2xl shadow-2xl text-center">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold [font-family:'Inter',Helvetica] leading-relaxed">
                <strong>Your follow-up decides whether you make money or lose money.</strong>
              </p>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold [font-family:'Inter',Helvetica] leading-relaxed mt-3 sm:mt-4 text-green-400">
                AI makes sure you never lose again.
              </p>
            </div>
          </div>

          {/* Testimonial-Only Pricing Section */}
          <div className="w-full max-w-5xl mt-16 sm:mt-24 px-4">
            {/* 1. Top Banner */}
            <div className="mb-8 sm:mb-12">
              <div className="relative inline-block w-full">
                <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white text-center py-2 sm:py-3 rounded-lg shadow-lg overflow-hidden">
                  <div className="relative z-10">
                    <p className="text-xs sm:text-sm font-bold tracking-widest uppercase [font-family:'Inter',Helvetica]">
                      Testimonial-Only Access
                    </p>
                  </div>
                  {/* Shimmer Effect */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                    style={{
                      animation: 'shimmer 3s infinite',
                      backgroundSize: '200% 100%',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 2. Hero Headline Block */}
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black mb-4 sm:mb-6 [font-family:'Inter',Helvetica] leading-tight">
                We Want Your Testimonial — So You Get a Ridiculous Discount.
              </h2>
              <p className="text-base sm:text-xl text-gray-600 [font-family:'Inter',Helvetica]">
                Get the full AI Outreach System for a price we will never offer again.
              </p>
            </div>

            {/* 3. Reveal Pricing Component */}
            <div className="flex justify-center mb-10 sm:mb-14">
              <div className="w-full max-w-md">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 sm:p-8 rounded-2xl shadow-2xl border-2 border-gray-200">
                  {!priceRevealed ? (
                    <>
                      {/* Before Reveal */}
                      <div className="text-center mb-6">
                        <div 
                          className="text-6xl sm:text-8xl font-extrabold text-gray-800 mb-4"
                          style={{
                            filter: 'blur(12px)',
                            userSelect: 'none',
                          }}
                        >
                          $200
                        </div>
                        <p className="text-sm sm:text-base text-gray-600 mb-6 [font-family:'Inter',Helvetica]">
                          Tap to reveal your testimonial-only discount
                        </p>
                      </div>
                      
                      <button
                        onClick={() => setPriceRevealed(true)}
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-base sm:text-lg py-3 sm:py-4 px-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 [font-family:'Inter',Helvetica]"
                      >
                        Reveal My Discount
                      </button>
                    </>
                  ) : (
                    <>
                      {/* After Reveal */}
                      <div 
                        className="text-center mb-6"
                        style={{
                          animation: 'bounceIn 0.6s ease-out',
                        }}
                      >
                        <div className="mb-3">
                          <span className="text-3xl sm:text-4xl font-bold text-gray-400 line-through [font-family:'Inter',Helvetica]">
                            $500
                          </span>
                        </div>
                        <div className="mb-4">
                          <span className="text-6xl sm:text-8xl font-extrabold text-green-600 [font-family:'Inter',Helvetica]">
                            $200
                          </span>
                          <p className="text-base sm:text-lg text-gray-700 font-semibold mt-2 [font-family:'Inter',Helvetica]">
                            Testimonial-Only Price
                          </p>
                        </div>
                        <div className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full">
                          <p className="text-xs sm:text-sm font-bold [font-family:'Inter',Helvetica]">
                            Limited to next 8 businesses
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* 5. Offer Stack Card */}
            <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl border border-gray-200 mb-10 sm:mb-14">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-black mb-6 sm:mb-8 text-center [font-family:'Inter',Helvetica]">
                What You Get Inside the AI Outreach System:
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  'AI Inbound Number (leads can call your AI agent)',
                  'AI Outbound Calling System',
                  'Automated Lead Outreach Workflows',
                  'Follow-Up Sequences',
                  'CRM Integration & Setup',
                  'Call Recording + Logging',
                  'Fully Done-For-You Configuration',
                  'Personalized Scripts & Outreach Logic',
                  'Lifetime Updates',
                  '1:1 Setup Call',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <span className="text-green-500 text-xl flex-shrink-0 mt-0.5">✓</span>
                    <p className="text-sm sm:text-base text-gray-800 [font-family:'Inter',Helvetica] leading-relaxed">
                      <strong>{item}</strong>
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-l-4 border-purple-500 p-4 sm:p-6 rounded-lg text-center">
                <p className="text-base sm:text-lg font-semibold text-gray-800 [font-family:'Inter',Helvetica] italic">
                  All we ask in return: a simple testimonial once you get results.
                </p>
              </div>
            </div>

            {/* 6. Primary CTA Stack */}
            <div className="text-center mb-10 sm:mb-14">
              <Link
                to="/contact"
                className="inline-block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg sm:text-xl py-4 sm:py-5 px-8 sm:px-12 rounded-xl shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 [font-family:'Inter',Helvetica]"
              >
                Get My AI Outreach System → $200
              </Link>
              <p className="text-sm sm:text-base text-gray-600 mt-4 [font-family:'Inter',Helvetica]">
                No contracts. No risk. Just results → then testimonial.
              </p>
            </div>

            {/* 8. Guarantee Section */}
            <div className="flex flex-col items-center mb-10 sm:mb-14">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 sm:p-8 rounded-2xl shadow-lg border-2 border-blue-200 text-center max-w-2xl">
                <div className="inline-block bg-blue-600 text-white rounded-full px-4 py-2 mb-4">
                  <p className="text-sm sm:text-base font-bold [font-family:'Inter',Helvetica]">
                    🛡️ 14-Day Lead-Proof Guarantee
                  </p>
                </div>
                <p className="text-base sm:text-lg text-gray-800 [font-family:'Inter',Helvetica]">
                  If your AI agent doesn't generate real engagement within 14 days, you owe nothing.
                </p>
              </div>
            </div>

            {/* 9. Final Scarcity Reminder */}
            <div className="text-center">
              <p className="text-base sm:text-lg font-bold text-gray-800 [font-family:'Inter',Helvetica]">
                This offer vanishes once we collect next{' '}
                <span 
                  className="text-red-600 inline-block"
                  style={{
                    animation: 'microBounce 2s infinite',
                  }}
                >
                  8 testimonials
                </span>
                .
              </p>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="w-full max-w-4xl mt-16 sm:mt-24 px-4">
            {/* Section Title */}
            <div className="text-center mb-10 sm:mb-14">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-black mb-4 [font-family:'Inter',Helvetica] leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-base sm:text-lg text-gray-600 [font-family:'Inter',Helvetica]">
                Everything you need to know about your AI Outreach System
              </p>
            </div>

            {/* FAQ Accordion */}
            <div className="space-y-4 mb-10 sm:mb-14">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  {/* Question Header - Clickable */}
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left transition-colors duration-200 hover:bg-gray-50"
                  >
                    <div className="flex items-start gap-3 sm:gap-4 flex-1">
                      <span className="text-2xl sm:text-3xl flex-shrink-0 mt-0.5">{faq.icon}</span>
                      <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 [font-family:'Inter',Helvetica] leading-snug">
                        {faq.question}
                      </h3>
                    </div>
                    <div className="flex-shrink-0">
                      <svg
                        className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-600 transition-transform duration-300 ${
                          openFaqIndex === index ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Answer Panel - Expandable */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      openFaqIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    } overflow-hidden`}
                  >
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2">
                      <div className="pl-10 sm:pl-14 border-l-4 border-green-500">
                        <div className="pl-4">
                          {/* Short Answer */}
                          <div className="mb-3 sm:mb-4">
                            <p className="text-sm sm:text-base font-semibold text-green-700 [font-family:'Inter',Helvetica] mb-1">
                              Quick Answer:
                            </p>
                            <p className="text-base sm:text-lg font-bold text-gray-900 [font-family:'Inter',Helvetica]">
                              {faq.shortAnswer}
                            </p>
                          </div>

                          {/* Full Answer */}
                          <div>
                            <p className="text-sm sm:text-base text-gray-700 [font-family:'Inter',Helvetica] leading-relaxed">
                              {faq.fullAnswer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA After FAQ */}
            <div className="text-center">
              <Link
                to="/contact"
                className="inline-block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg sm:text-xl py-4 sm:py-5 px-8 sm:px-12 rounded-xl shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 [font-family:'Inter',Helvetica]"
              >
                Get My AI Outreach System → $200
              </Link>
              <p className="text-sm sm:text-base text-gray-600 mt-4 [font-family:'Inter',Helvetica]">
                Still have questions? Book a call and we'll answer everything.
              </p>
            </div>
          </div>

          {/* Final CTA Section */}
          <div className="w-full max-w-6xl mt-16 sm:mt-24 px-4 mb-12 sm:mb-16">
            <div 
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #065f46 100%)',
              }}
            >
              {/* Subtle spotlight effect */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)',
                }}
              />
              
              <div className="relative z-10 px-6 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-20 text-center">
                {/* Headline */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 sm:mb-4 [font-family:'Inter',Helvetica] leading-tight">
                  Ready to Turn Every FB Lead Into a Booked Call?
                </h2>
                
                <p className="text-lg sm:text-xl md:text-2xl text-gray-300 font-semibold mb-6 sm:mb-8 [font-family:'Inter',Helvetica]">
                  Your competitors aren't using this… yet.
                </p>
                
                {/* Subtext */}
                <div className="max-w-2xl mx-auto mb-8 sm:mb-10">
                  <p className="text-base sm:text-lg text-gray-200 [font-family:'Inter',Helvetica] leading-relaxed mb-2">
                    You've seen what the AI can do.
                  </p>
                  <p className="text-base sm:text-lg text-gray-200 [font-family:'Inter',Helvetica] leading-relaxed mb-2">
                    Now experience it — instantly.
                  </p>
                  <p className="text-base sm:text-lg text-white font-semibold [font-family:'Inter',Helvetica] leading-relaxed">
                    Your personalized demo is already set up for <span className="text-green-400">{pageData.businessName}</span>.
                  </p>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col items-center gap-4 mb-10 sm:mb-12">
                  {/* Primary CTA */}
                  <Link
                    to="/contact"
                    className="w-full max-w-md bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg sm:text-xl py-5 sm:py-6 px-8 rounded-2xl shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105 [font-family:'Inter',Helvetica]"
                  >
                    Start My AI Demo
                  </Link>
                  
                  {/* Secondary CTA */}
                  <a
                    href="tel:+14706651434"
                    className="w-full max-w-md bg-transparent border-3 border-white hover:bg-white hover:text-gray-900 text-white font-bold text-base sm:text-lg py-4 sm:py-5 px-8 rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 [font-family:'Inter',Helvetica]"
                    style={{ borderWidth: '2px' }}
                  >
                    Let the AI Call Me
                  </a>
                </div>
                
                {/* Micro-Trust Boost */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto">
                  <div className="flex flex-col items-center">
                    <span className="text-3xl sm:text-4xl mb-2">⚡</span>
                    <p className="text-sm sm:text-base text-white font-semibold [font-family:'Inter',Helvetica]">
                      1.2-sec lead response
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <span className="text-3xl sm:text-4xl mb-2">📈</span>
                    <p className="text-sm sm:text-base text-white font-semibold [font-family:'Inter',Helvetica]">
                      Boost ROAS & bookings
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <span className="text-3xl sm:text-4xl mb-2">🛠️</span>
                    <p className="text-sm sm:text-base text-white font-semibold [font-family:'Inter',Helvetica]">
                      No setup required
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Keyframe Animations */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3) translateY(-20px);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.95);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes microBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </div>
  );
};

