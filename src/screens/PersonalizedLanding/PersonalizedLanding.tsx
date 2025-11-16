import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPersonalizedPageBySlug, extractYouTubeVideoId, urlFor } from "../../lib/sanity";
import { Highlighter } from "../../components/ui/highlighter";
import { ShineBorder } from "../../components/ui/shine-border";
import { Marquee } from "../../components/ui/marquee";
import { Phone, ArrowRight, Sparkles } from "lucide-react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import confetti from "canvas-confetti";

interface FAQ {
  question: string;
  shortAnswer: string;
  fullAnswer: string;
  icon: string;
}

// Slide to Call Button Component
const SlideToCallButton = ({ phoneNumber }: { phoneNumber: string }) => {
  const x = useMotionValue(0);
  const background = useTransform(x, [0, 300], ["#16a34a", "#15803d"]);
  const sliderWidth = 280; // Adjust based on container width
  
  const handleDragEnd = (_event: any, info: PanInfo) => {
    if (info.offset.x > sliderWidth * 0.85) {
      setTimeout(() => {
        window.location.href = `tel:${phoneNumber}`;
      }, 200);
    } else {
      x.set(0);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Instruction text above slider */}
      <div className="text-center mb-3">
        <p className="text-sm font-semibold text-foreground flex items-center justify-center gap-2">
          <Sparkles className="w-4 h-4 text-green-600 animate-pulse" />
          <span>Slide the phone icon to start the call →</span>
        </p>
      </div>
      
      {/* Slider Track */}
      <motion.div 
        style={{ background }}
        className="relative h-20 rounded-full shadow-2xl overflow-hidden border-2 border-green-700"
      >
        {/* Background animated text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div 
            className="flex items-center gap-3 text-white font-bold text-base sm:text-lg"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="hidden sm:inline">Slide to Call Your AI Agent</span>
            <span className="sm:hidden">Slide to Call</span>
            <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </motion.div>
        </div>
        
        {/* Draggable Phone Icon Button */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: sliderWidth }}
          dragElastic={0.1}
          style={{ x }}
          onDragEnd={handleDragEnd}
          className="absolute left-2 top-2 bottom-2 w-16 bg-white rounded-full shadow-xl cursor-grab active:cursor-grabbing flex items-center justify-center z-10"
          whileTap={{ scale: 1.1 }}
        >
          {/* Vibrating Phone Icon */}
          <motion.div
            animate={{ 
              rotate: [-5, 5, -5, 5, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ 
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 1.5
            }}
          >
            <Phone className="w-8 h-8 text-green-600" />
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Fallback text below slider */}
      <div className="text-center mt-3">
        <p className="text-xs sm:text-sm text-muted-foreground">
          Or tap directly: <a href={`tel:${phoneNumber}`} className="font-semibold text-green-600 hover:underline">+1 (470) 665-1434</a>
        </p>
      </div>
    </div>
  );
};

// Testimonial Card Component
interface TestimonialCardProps {
  name: string;
  business: string;
  text: string;
}

const TestimonialCard = ({ name, business, text }: TestimonialCardProps) => {
  return (
    <div className="relative flex w-80 flex-col gap-4 overflow-hidden rounded-xl border border-border bg-card p-6 shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-lg">
          {name.charAt(0)}
        </div>
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground">{business}</p>
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed italic">"{text}"</p>
    </div>
  );
};

export const PersonalizedLanding = (): JSX.Element => {
  const { businessName } = useParams<{ businessName: string }>();
  const navigate = useNavigate();
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [videoId, setVideoId] = useState<string>("");
  const [priceRevealed, setPriceRevealed] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  const handleRevealPrice = () => {
    setPriceRevealed(true);
    
    // Trigger confetti
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
  };

  const faqs: FAQ[] = [
    {
      question: "Does the AI actually sound human?",
      shortAnswer: "Yes — it sounds like a normal conversational agent, not robotic.",
      fullAnswer: "Our AI uses natural conversational modeling, tone-matching, and memory. It pauses, laughs, asks questions, understands accents, and reacts to context. 90% of leads cannot tell it's an AI—until you tell them.",
      icon: ""
    },
    {
      question: "Will it work with my existing Facebook ad leads?",
      shortAnswer: "Yes — it plugs directly into your lead forms or CRM.",
      fullAnswer: "We automatically sync your Facebook leads, Google leads, website leads, or CRM entries. Every new lead gets called and texted instantly within 3 seconds.",
      icon: ""
    },
    {
      question: "Is this replacing my VA or my sales team?",
      shortAnswer: "It replaces the repetitive tasks, not the closer.",
      fullAnswer: "Your AI handles: first call, qualification, follow-up, and appointment booking. Your closer handles the sale. You get the best of both worlds — without the salary, training, or unreliability.",
      icon: ""
    },
    {
      question: "Can the AI really call me or my leads instantly?",
      shortAnswer: "Yes — try it on this page.",
      fullAnswer: "Enter your number in the form above and you'll receive a call in seconds. The exact same behavior happens for your real leads.",
      icon: ""
    },
    {
      question: "What if a lead asks complex questions?",
      shortAnswer: "AI handles 95% of real-world objections.",
      fullAnswer: "Your AI is trained on your offers, your scripts, your FAQs, and your tone. It can answer pricing, availability, scheduling, and product questions without hesitation. If something is too complex, it transfers to a human instantly.",
      icon: ""
    },
    {
      question: "How accurate is the qualification process?",
      shortAnswer: "Very accurate — over 87% match with human qualifiers.",
      fullAnswer: "Your AI listens to tone, intent, emotional signals, and keywords. It tags leads, scores them, and pushes only qualified ones to your calendar. Unqualified leads are filtered automatically.",
      icon: ""
    },
    {
      question: "Is this allowed by Facebook and Google policies?",
      shortAnswer: "Yes — fully compliant.",
      fullAnswer: "Our system only calls leads who opted-in. We follow all TCPA, DNC, and required compliance guidelines. You're 100% protected.",
      icon: ""
    },
    {
      question: "How long does setup take?",
      shortAnswer: "10–15 minutes.",
      fullAnswer: "We customize your AI voice, script, lead flow, and integrations. Most businesses are live within the same day.",
      icon: ""
    },
    {
      question: "Do I need to record anything?",
      shortAnswer: "No.",
      fullAnswer: "Your AI learns from text input. No recording, no voice acting, no lengthy training required.",
      icon: ""
    },
    {
      question: "How does pricing work?",
      shortAnswer: "Simple usage-based model.",
      fullAnswer: "You only pay for the calls/texts your AI actually sends. No hidden fees. No long-term contracts.",
      icon: ""
    },
    {
      question: "What if the AI says something wrong?",
      shortAnswer: "It won't — everything is predefined.",
      fullAnswer: "Your AI only speaks from the scripts, knowledge, and rules you give it. It cannot go off-track or invent information. This ensures perfect consistency — every single time.",
      icon: ""
    },
    {
      question: "Is this personalized page actually made for my business?",
      shortAnswer: "Yes — 100% personalized using your data.",
      fullAnswer: `This page is built exclusively for ${pageData?.businessName || 'your business'}: personalized headline, custom demo, custom AI script, and custom call experience. It shows exactly how your business would use the system.`,
      icon: ""
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
    <div className="flex flex-col items-center justify-center relative bg-background overflow-x-hidden">
      {/* Header - Partnership Logos */}
      <header className="w-full flex flex-col items-center bg-background px-4 sm:px-6 lg:px-0">
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
                <span className="text-xl sm:text-3xl font-bold text-muted-foreground">&</span>
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
          <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-5xl mb-6">
            {pageData.businessName}, your follow-up is<span className="hidden sm:inline"><br /></span> <span className="text-red-600">costing you clients</span>.
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mb-2 hidden sm:block">
            You spend money getting Facebook leads.
          </p>
          <p className="text-xl text-muted-foreground max-w-3xl mb-8">
            Our AI turns those leads into booked calls <strong className="font-semibold">instantly</strong> — before your competition does.
          </p>
          
          <div className="mt-4">
            <p className="text-lg font-semibold text-foreground mb-6">
              Watch how to close more deals without increasing ad spend
            </p>
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
            <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl bg-muted flex items-center justify-center" style={{ minHeight: '400px' }}>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                  <svg className="w-8 h-8 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
                <p className="text-muted-foreground">Video placeholder</p>
                <p className="text-sm text-muted-foreground/70 mt-2">Add a YouTube video ID to display the video</p>
              </div>
            </div>
          )}

          {/* Trusted By Section - Logo Scroll */}
          <div className="w-full max-w-5xl mt-12 sm:mt-16">
            <p className="text-center text-sm font-semibold text-muted-foreground mb-6 tracking-wider uppercase">
              Trusted by businesses nationwide
            </p>
            <div className="relative overflow-hidden">
              {/* Gradient overlays for fade effect */}
              <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />
              
              {/* Scrolling container */}
              <div className="flex logo-scroll">
                {/* First set of logos */}
                <div className="flex items-center gap-6 px-6">
                  <div className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <img src="/logos/jones.png" alt="Jones" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <img src="/logos/region-scoopers.png" alt="Region Scoopers" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <img src="/logos/atomic-air.png" alt="Atomic Air" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <img src="/logos/unique-auto.png" alt="Unique Auto" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <img src="/logos/sca-pontoon.png" alt="SCA Pontoon Rental" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <img src="/logos/hoosier-stump.png" alt="Hoosier Stump Remover" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <img src="/logos/peaks-pontoons.png" alt="Peak's Pontoons" className="max-w-full max-h-full object-contain" />
                  </div>
                </div>
                
                {/* Duplicate set for seamless loop */}
                <div className="flex items-center gap-6 px-6">
                  <div className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <img src="/logos/jones.png" alt="Jones" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <img src="/logos/region-scoopers.png" alt="Region Scoopers" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <img src="/logos/atomic-air.png" alt="Atomic Air" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <img src="/logos/unique-auto.png" alt="Unique Auto" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <img src="/logos/sca-pontoon.png" alt="SCA Pontoon Rental" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <img src="/logos/hoosier-stump.png" alt="Hoosier Stump Remover" className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-shrink-0 w-32 h-16 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                    <img src="/logos/peaks-pontoons.png" alt="Peak's Pontoons" className="max-w-full max-h-full object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call AI Agent Section */}
          <div className="w-full max-w-3xl mt-16 px-4">
            <div className="text-center">
              {/* Section Title */}
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-6">
                Your AI Agent Wants to Talk To You, Call Now?
              </h2>
              
              {/* Section Subtext */}
              <div className="mb-10">
                <p className="leading-7 text-muted-foreground mb-2">
                  Your AI assistant is live right now.
                </p>
                <p className="leading-7 text-muted-foreground">
                  It will greet you, answer questions, and show you exactly how it follows up with your leads 24/7.
                </p>
              </div>

              {/* Slide to Call Button */}
              <div className="mb-8">
                <SlideToCallButton phoneNumber="+14706651434" />
              </div>

              {/* Microproof */}
              <div className="text-center">
                <p className="text-sm text-muted-foreground italic">
                  Over 50,000+ AI-led conversations completed — experience how natural it sounds.
                </p>
              </div>
            </div>
          </div>

          {/* VA Replacement Section */}
          <div className="w-full max-w-6xl mt-24 px-4">
            {/* Section Title */}
            <div className="text-center mb-16">
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 mb-3">
                All you need is one killer closer.<br />Let AI replace the rest.
              </h2>
            </div>

            {/* Numbered Comparison Cards */}
            <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10">
              {/* Card 1 - Speed & Response */}
              <div className="relative bg-card rounded-xl shadow-lg border border-border p-6 sm:p-8 overflow-hidden">
                <ShineBorder 
                  shineColor={["#22c55e", "#16a34a", "#15803d"]} 
                  duration={10}
                  borderWidth={2}
                />
                <div className="flex items-start gap-4 sm:gap-6">
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3 text-foreground">
                      Instant response without human delays
                    </h3>
                    <p className="leading-7 text-muted-foreground mb-4">
                      Your VA juggles tasks, forgets leads, and calls back hours later. AI calls within <Highlighter action="circle" color="#22c55e" strokeWidth={2} isView={true}>3 seconds</Highlighter> — every single time.
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong className="font-semibold"><Highlighter action="highlight" color="#fbbf24" strokeWidth={2} isView={true}>72% of Facebook leads go cold in under 5 minutes.</Highlighter></strong> AI never misses that window.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Scale & Consistency */}
              <div className="relative bg-card rounded-xl shadow-lg border border-border p-6 sm:p-8 overflow-hidden">
                <ShineBorder 
                  shineColor={["#22c55e", "#16a34a", "#15803d"]} 
                  duration={12}
                  borderWidth={2}
                />
                <div className="flex items-start gap-4 sm:gap-6">
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3 text-foreground">
                      <Highlighter action="underline" color="#22c55e" strokeWidth={2} isView={true}>Perfect follow-up</Highlighter>, unlimited scale
                    </h3>
                    <p className="leading-7 text-muted-foreground mb-4">
                      VAs handle 20 leads per day and give up after 2–3 attempts. AI follows up 8–12 times automatically and calls 200+ leads simultaneously.
                    </p>
                    <div className="bg-muted p-4 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <strong className="font-semibold"><Highlighter action="box" color="#22c55e" strokeWidth={2} isView={true}>Works 24/7</Highlighter>.</strong> No sick days, no breaks, no salary — just qualified leads in your calendar.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Quality Control */}
              <div className="relative bg-card rounded-xl shadow-lg border border-border p-6 sm:p-8 overflow-hidden">
                <ShineBorder 
                  shineColor={["#22c55e", "#16a34a", "#15803d"]} 
                  duration={14}
                  borderWidth={2}
                />
                <div className="flex items-start gap-4 sm:gap-6">
                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                      Your closer only talks to <Highlighter action="highlight" color="#22c55e" isView={true}>qualified buyers</Highlighter>
                    </h3>
                    <p className="leading-7 text-muted-foreground mb-4">
                      AI qualifies leads in 30 seconds using tone, intent, and keywords. Only ready-to-buy leads reach your calendar.
                    </p>
                    <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-600">
                      <p className="text-sm text-foreground font-semibold">
                        <span className="text-green-600">No more chasing dead leads.</span> Your team closes, AI does everything else.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why Manual Follow-Up Fails Section */}
          <div className="w-full max-w-6xl mt-16 sm:mt-24 px-4">
            {/* Section Title */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight flex items-center justify-center gap-3">
                <span>Why Manual Follow-Up Fails Every Time</span>
              </h2>
              <p className="text-base sm:text-xl text-muted-foreground mt-4">
                And why <strong>{pageData.businessName}</strong> loses clients without even realizing it.
              </p>
            </div>

            {/* Problem/Agitate vs Solution Split Layout */}
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden shadow-2xl mb-12">
              <ShineBorder 
                shineColor={["#ef4444", "#dc2626", "#991b1b"]} 
                duration={16}
                borderWidth={3}
              />
              {/* LEFT SIDE - PROBLEM & AGITATE */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 sm:p-8 lg:p-10 lg:border-r-4 lg:border-red-200">
                {/* PROBLEM Section */}
                <div className="mb-8 sm:mb-10">
                  <div className="text-center lg:text-left mb-6">
                    <div className="flex items-start gap-3 lg:mb-0">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#7d2e2e] leading-tight">
                        Your Leads Don't Get Followed Up Fast Enough
                      </h3>
                    </div>
                  </div>
                  
                  <ul className="space-y-4 sm:space-y-5">
                    <li className="flex items-start gap-2 sm:gap-3">
                      <span className="text-[#7d2e2e] font-bold text-xl flex-shrink-0 mt-0.5">•</span>
                      <p className="text-base sm:text-lg lg:text-xl text-foreground leading-relaxed">
                        <strong className="text-[#7d2e2e] font-bold"><Highlighter action="strike-through" color="#ef4444" strokeWidth={2} isView={true}>Facebook leads go cold in under 5 minutes</Highlighter></strong>, but humans follow up in hours.
                      </p>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <span className="text-[#7d2e2e] font-bold text-xl flex-shrink-0 mt-0.5">•</span>
                      <p className="text-base sm:text-lg lg:text-xl text-foreground leading-relaxed">
                        <strong className="text-[#7d2e2e] font-bold">VAs juggle tasks</strong> — they miss calls, forget messages, or reply late.
                      </p>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <span className="text-[#7d2e2e] font-bold text-xl flex-shrink-0 mt-0.5">•</span>
                      <p className="text-base sm:text-lg lg:text-xl text-foreground leading-relaxed">
                        <strong className="text-[#7d2e2e] font-bold">Manual outreach depends on mood, energy, and memory.</strong>
                      </p>
                    </li>
                    <li className="flex items-start gap-2 sm:gap-3">
                      <span className="text-[#7d2e2e] font-bold text-xl flex-shrink-0 mt-0.5">•</span>
                      <p className="text-base sm:text-lg lg:text-xl text-foreground leading-relaxed">
                        <strong className="text-[#7d2e2e] font-bold"><Highlighter action="highlight" color="#fca5a5" strokeWidth={2} isView={true}>72% of your ad spend gets wasted</Highlighter></strong> because no one responds instantly.
                      </p>
                    </li>
                  </ul>
                </div>

                {/* AGITATE Section */}
                <div className="border-t-2 border-red-300 pt-6 sm:pt-8">
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#7d2e2e] mb-4 sm:mb-6">
                    Each Delay Costs Your Hard Earned Money.
                  </h4>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-foreground font-semibold mb-3 sm:mb-4">
                    Every minute you wait, your leads:
                  </p>
                  
                  <ul className="space-y-3 sm:space-y-4 mb-5 sm:mb-6">
                    {['talk to your competitor', 'forget who you are', 'lose interest', 'assume you don\'t care', 'move on'].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-3 sm:gap-4">
                        <span className="text-red-600 text-2xl font-bold">•</span>
                        <span className="text-lg sm:text-xl lg:text-2xl text-foreground font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <p className="text-base sm:text-lg lg:text-xl text-foreground font-medium mb-5 sm:mb-6 leading-relaxed">
                    And when your VA misses even <strong className="text-[#7d2e2e]">ONE</strong> lead?<br />
                    That's a potential client gone forever.
                  </p>
                  
                  <div className="bg-[#7d2e2e] text-white p-4 sm:p-5 rounded-lg shadow-lg">
                    <p className="text-base sm:text-lg lg:text-xl font-bold text-center leading-relaxed">
                      <strong>You paid for the lead.</strong><br />
                      You just didn't claim it fast enough.
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE - SOLUTION */}
              <div className="bg-card p-6 sm:p-8 lg:p-10 border border-border">
                <div className="text-center lg:text-left mb-6">
                  <div className="flex items-start gap-3 lg:mb-0">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-900 leading-tight">
                      Your AI Responds Immediately. Every Time. Without Failing.
                    </h3>
                  </div>
                </div>
                
                <p className="text-base sm:text-lg lg:text-xl text-foreground font-semibold mb-5 sm:mb-6">
                  The moment a lead comes in:
                </p>
                
                  <ul className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
                  {[
                    { text: 'AI calls within 1–2 seconds', highlight: true },
                    { text: 'AI texts immediately', highlight: false },
                    { text: 'AI handles objections', highlight: false },
                    { text: 'AI books appointments', highlight: false },
                    { text: 'AI follows up for days automatically', highlight: true },
                    { text: 'AI never sleeps, never forgets, never gets tired', highlight: true }
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 sm:gap-4">
                      <span className="text-green-600 text-xl flex-shrink-0 mt-1 font-bold">•</span>
                      <div className="flex-1">
                        <p className="text-base sm:text-lg lg:text-xl text-foreground font-semibold leading-relaxed">
                          {item.highlight ? (
                            <Highlighter action="highlight" color="#86efac" strokeWidth={1.5} isView={true}>
                              {item.text}
                            </Highlighter>
                          ) : (
                            item.text
                          )}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
                
                <div className="bg-green-50 border-l-4 border-green-600 p-4 sm:p-5 lg:p-6 rounded-lg shadow-md">
                  <p className="text-base sm:text-lg lg:text-xl font-bold text-foreground leading-relaxed">
                    Where humans drop the ball, <span className="text-green-600"><Highlighter action="box" color="#22c55e" strokeWidth={2} isView={true}>AI performs perfectly</Highlighter>.</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Final Contrasting Block */}
            <div className="bg-foreground text-primary-foreground p-6 sm:p-8 lg:p-12 rounded-2xl shadow-2xl text-center">
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold leading-relaxed">
                <strong>Your follow-up decides whether you make money or lose money.</strong>
              </p>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold leading-relaxed mt-3 sm:mt-4 text-green-400">
                <Highlighter action="underline" color="#4ade80" strokeWidth={3} isView={true}>AI makes sure you never lose again.</Highlighter>
              </p>
            </div>
          </div>

          {/* Testimonials Marquee Section */}
          <div className="w-full mt-16 sm:mt-24 px-4">
            {/* Section Title */}
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
                Real Businesses. Real Results.
              </h2>
              <p className="text-base sm:text-xl text-muted-foreground">
                See what happens when AI handles your follow-up
              </p>
            </div>

            {/* Testimonials Marquee - Single Row */}
            <div className="relative w-full max-w-7xl mx-auto">
              <Marquee pauseOnHover className="[--duration:120s] [--gap:1rem]">
                <TestimonialCard
                  name="Mike Johnson"
                  business="Jones"
                  text="We went from losing 60% of our leads to booking 4-5 calls daily. The AI never sleeps and never misses a lead."
                />
                <TestimonialCard
                  name="David Chen"
                  business="Atomic Air"
                  text="ROI in week one. The speed alone is worth it—leads get called in 2 seconds, not 2 hours."
                />
                <TestimonialCard
                  name="Lisa Thompson"
                  business="Peak's Pontoons"
                  text="I was skeptical until I called my own AI. It sounds completely natural. Customers can't tell it's not human."
                />
                <TestimonialCard
                  name="Robert Garcia"
                  business="Unique Auto"
                  text="Finally, consistent follow-up without hiring more staff. It qualifies, books, and follows up automatically."
                />
                <TestimonialCard
                  name="Amanda Wilson"
                  business="SCA Pontoon Rental"
                  text="We doubled our bookings without spending more on ads. The AI just converts better because it's instant."
                />
                <TestimonialCard
                  name="James Mitchell"
                  business="Region Scoopers"
                  text="Our close rate went up 40% in the first month. The AI pre-qualifies so well that my team only talks to serious buyers."
                />
                <TestimonialCard
                  name="Rachel Lee"
                  business="Hoosier Stump Removal"
                  text="I used to lose leads overnight. Now the AI calls them at 11 PM if they submit then. No more missed opportunities."
                />
              </Marquee>
            </div>
          </div>

          {/* Testimonial-Only Pricing Section */}
          <div className="w-full max-w-5xl mt-16 sm:mt-24 px-4">
            {/* 1. Top Banner */}
            <div className="mb-8 sm:mb-12">
              <div className="relative inline-block w-full">
                <div className="bg-gradient-to-r from-green-600 to-green-700 text-white text-center py-2 sm:py-3 rounded-lg shadow-lg overflow-hidden">
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground mb-4 sm:mb-6 leading-tight">
                We Want Your Testimonial — So You Get a <Highlighter action="highlight" color="#fde047" strokeWidth={2} isView={true}>Ridiculous Discount</Highlighter>.
              </h2>
              <p className="text-base sm:text-xl text-muted-foreground">
                Get the full AI Outreach System for a price we will never offer again.
              </p>
            </div>

            {/* 3. Reveal Pricing Component */}
            <div className="flex justify-center mb-10 sm:mb-14">
              <div className="w-full max-w-md">
                <div className="bg-gradient-to-br from-muted to-secondary p-6 sm:p-8 rounded-2xl shadow-2xl border-2 border-border">
                  {!priceRevealed ? (
                    <>
                      {/* Before Reveal */}
                      <div className="text-center mb-6">
                        <div 
                          className="text-6xl sm:text-8xl font-extrabold text-foreground mb-4"
                          style={{
                            filter: 'blur(12px)',
                            userSelect: 'none',
                          }}
                        >
                          $200
                        </div>
                        <p className="text-sm sm:text-base text-muted-foreground mb-6">
                          Tap to reveal your testimonial-only discount
                        </p>
                      </div>
                      
                      <button
                        onClick={handleRevealPrice}
                        className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold text-base sm:text-lg py-3 sm:py-4 px-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 [font-family:'Inter',Helvetica]"
                      >
                        Reveal My Discount
                      </button>
                    </>
                  ) : (
                    <>
                      {/* After Reveal */}
                      <div className="text-center mb-6">
                        {/* Old Price with Strike Animation */}
                        <div 
                          className="mb-3"
                          style={{
                            animation: 'strikeThrough 0.8s ease-out forwards',
                          }}
                        >
                          <span className="text-3xl sm:text-4xl font-bold text-muted-foreground relative inline-block price-strike">
                            $500
                          </span>
                        </div>
                        
                        {/* New Price with Bounce In Animation */}
                        <div 
                          className="mb-4"
                          style={{
                            animation: 'bounceIn 0.8s ease-out 0.4s backwards',
                          }}
                        >
                          <span className="text-6xl sm:text-8xl font-extrabold text-green-600">
                            <Highlighter action="circle" color="#22c55e" strokeWidth={4} isView={true}>$200</Highlighter>
                          </span>
                          <p 
                            className="text-base sm:text-lg text-foreground font-semibold mt-2"
                            style={{
                              animation: 'fadeInUp 0.6s ease-out 0.8s backwards',
                            }}
                          >
                            Testimonial-Only Price
                          </p>
                        </div>
                        
                        {/* Badge with Fade In */}
                        <div 
                          className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full"
                          style={{
                            animation: 'fadeInUp 0.6s ease-out 1s backwards',
                          }}
                        >
                          <p className="text-xs sm:text-sm font-bold">
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
            <div className="relative bg-card p-6 sm:p-8 lg:p-10 rounded-2xl shadow-2xl border border-border mb-10 sm:mb-14 overflow-hidden">
              <ShineBorder 
                shineColor={["#fbbf24", "#f59e0b", "#d97706"]} 
                duration={12}
                borderWidth={2}
              />
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-6 sm:mb-8 text-center">
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
                    <span className="text-green-600 text-xl flex-shrink-0 mt-0.5 font-bold">•</span>
                    <p className="text-base sm:text-lg text-foreground leading-relaxed">
                      <strong>{item}</strong>
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="bg-green-50 border-l-4 border-green-600 p-4 sm:p-6 rounded-lg text-center">
                <p className="text-base sm:text-lg font-semibold text-foreground italic">
                  All we ask in return: a simple testimonial once you get results.
                </p>
              </div>
            </div>

            {/* 6. Primary CTA Stack */}
            <div className="text-center mb-10 sm:mb-14">
              <Link
                to="/contact"
                className="inline-block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg sm:text-xl py-4 sm:py-5 px-8 sm:px-12 rounded-xl shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Get My AI Outreach System → $200
              </Link>
              <p className="text-sm sm:text-base text-muted-foreground mt-4">
                No contracts. No risk. Just results → then testimonial.
              </p>
            </div>

            {/* 8. Guarantee Section */}
            <div className="flex flex-col items-center mb-10 sm:mb-14">
              <div className="relative bg-muted p-6 sm:p-8 rounded-2xl shadow-lg border-2 border-border text-center max-w-2xl overflow-hidden">
                <ShineBorder 
                  shineColor={["#22c55e", "#16a34a", "#15803d"]} 
                  duration={10}
                  borderWidth={3}
                />
                <div className="inline-block bg-green-600 text-white rounded-full px-4 py-2 mb-4">
                  <p className="text-sm sm:text-base font-bold">
                    <Highlighter action="box" color="#ffffff" strokeWidth={2} isView={true}>14-Day Lead-Proof Guarantee</Highlighter>
                  </p>
                </div>
                <p className="text-base sm:text-lg text-foreground">
                  If your AI agent doesn't generate real engagement within 14 days, you owe nothing.
                </p>
              </div>
            </div>

            {/* 9. Final Scarcity Reminder */}
            <div className="text-center">
              <p className="text-base sm:text-lg font-bold text-foreground">
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
            <div className="mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Still have questions? We have answers.
              </h2>
            </div>

            {/* FAQ Accordion */}
            <div className="mb-10 sm:mb-14">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-t border-border"
                >
                  {/* Question Header - Clickable */}
                  <button
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="w-full flex items-center justify-between gap-4 py-6 text-left"
                  >
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-normal text-foreground leading-snug pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <svg
                          className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${
                            openFaqIndex === index ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </button>

                  {/* Answer Panel - Expandable */}
                  <div
                    className={`transition-all duration-200 ease-in-out ${
                      openFaqIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                    } overflow-hidden`}
                  >
                    <div className="pr-8">
                      {/* Short Answer */}
                      <div className="mb-3">
                        <p className="text-base sm:text-lg lg:text-xl font-semibold text-foreground">
                          {faq.shortAnswer}
                        </p>
                      </div>

                      {/* Full Answer */}
                      <div>
                        <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
                          {faq.fullAnswer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {/* Bottom Border */}
              <div className="border-t border-border"></div>
            </div>

            {/* CTA After FAQ */}
            <div className="text-center">
              <Link
                to="/contact"
                className="inline-block bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg sm:text-xl py-4 sm:py-5 px-8 sm:px-12 rounded-xl shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Get My AI Outreach System → $200
              </Link>
              <p className="text-sm sm:text-base text-muted-foreground mt-4">
                Still have questions? Book a call and we'll answer everything.
              </p>
            </div>
          </div>

          {/* Final CTA Section */}
          <div className="w-full max-w-6xl mt-16 sm:mt-24 px-4 mb-12 sm:mb-16">
            <div 
              className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-foreground to-foreground/90"
            >
              <ShineBorder 
                shineColor={["#4ade80", "#22c55e", "#16a34a"]} 
                duration={18}
                borderWidth={3}
              />
              {/* Subtle spotlight effect */}
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, transparent 70%)',
                }}
              />
              
              <div className="relative z-10 px-6 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-20 text-center">
                {/* Headline */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground mb-3 sm:mb-4 leading-tight">
                  Ready to Turn Every FB Lead Into a Booked Call?
                </h2>
                
                <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/80 font-semibold mb-6 sm:mb-8">
                  Your competitors aren't using this… yet.
                </p>
                
                {/* Subtext */}
                <div className="max-w-2xl mx-auto mb-8 sm:mb-10">
                  <p className="text-base sm:text-lg lg:text-xl text-primary-foreground/90 leading-relaxed mb-2">
                    You've seen what the AI can do.
                  </p>
                  <p className="text-base sm:text-lg lg:text-xl text-primary-foreground/90 leading-relaxed mb-2">
                    Now experience it — instantly.
                  </p>
                  <p className="text-base sm:text-lg lg:text-xl text-primary-foreground font-semibold leading-relaxed">
                    Your personalized demo is already set up for <span className="text-green-400">{pageData.businessName}</span>.
                  </p>
                </div>
                
                {/* CTA Buttons */}
                <div className="flex flex-col items-center gap-4 mb-10 sm:mb-12">
                  {/* Primary CTA */}
                  <Link
                    to="/contact"
                    className="w-full max-w-md bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold text-lg sm:text-xl py-5 sm:py-6 px-8 rounded-2xl shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    Start My AI Demo
                  </Link>
                  
                  {/* Secondary CTA */}
                  <a
                    href="tel:+14706651434"
                    className="w-full max-w-md bg-primary-foreground hover:bg-secondary text-foreground font-bold text-base sm:text-lg py-4 sm:py-5 px-8 rounded-2xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
                  >
                    Let the AI Call Me
                  </a>
                </div>
                
                {/* Micro-Trust Boost */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-3xl mx-auto">
                  <div className="flex flex-col items-center">
                    <p className="text-base sm:text-lg text-primary-foreground font-semibold">
                      1.2-sec lead response
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <p className="text-base sm:text-lg text-primary-foreground font-semibold">
                      Boost ROAS & bookings
                    </p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <p className="text-base sm:text-lg text-primary-foreground font-semibold">
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
        
        @keyframes strikeThrough {
          0% {
            opacity: 1;
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0.6;
            text-decoration: line-through;
          }
        }
        
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .price-strike::after {
          content: '';
          position: absolute;
          left: 0;
          top: 50%;
          width: 0;
          height: 3px;
          background: currentColor;
          animation: strikeLine 0.6s ease-out 0.2s forwards;
        }
        
        @keyframes strikeLine {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
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
        
        @keyframes logoScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .logo-scroll {
          animation: logoScroll 20s linear infinite;
        }
        
        .logo-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

