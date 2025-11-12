import { MenuIcon, XIcon, CheckIcon } from "lucide-react"; // CheckIcon used in pricing list
import { useState, useEffect } from "react"; // Added useRef
import { Link } from "react-router-dom"; // Import Link
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const Vocalx = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu
  const [showPopup, setShowPopup] = useState(false); // State for popup modal

  // Show popup after 7 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 7000); // 7 seconds

    return () => clearTimeout(timer);
  }, []);

  

  // Navigation items - Removed width, will use spacing utilities
  const navItems = [
    { title: "Features", href: "#features" }, // Added href
    { title: "Use Cases", href: "#use-cases" }, // Added href
    { title: "Testimonials", href: "#testimonials" }, // Added href
    { title: "Pricing", href: "#pricing" }, // Added href
    { title: "FAQ", href: "#faq" },
    { title: "Contact Us", href: "/contact" }, // Keep route for Contact Us
  ];

  // Testimonials replaced by video embeds; keeping placeholder for potential future use

  

  // One-time setup deliverables (emphasizes value indirectly)
  const setupFeatures = [
    "Connect lead sources, CRM, and calendar — end-to-end",
    "Custom call flows and SMS/email scripts for your brand",
    "Qualification criteria tuned to your sales process",
    "Routing, handoff, and booking logic configured",
    "Compliance, caller ID, recordings, and QA settings",
    "Analytics, dashboards, and review loop enabled",
    "Go‑live playbook and team handoff",
    "Two rounds of revisions included",
  ];

  // Updated Pricing plans data to a single plan
  const pricingPlans = [
    {
      id: 1,
      name: "Done‑For‑You Setup",
      price: "$499",
      pricePeriod: "per month",
      description: "Implementation, integrations, scripts — 2 revisions included",
      features: setupFeatures,
      highlighted: true,
      buttonText: "Launch My Setup",
      badge: "Fastest Start",
    },
  ];

  // FAQ items (industry‑agnostic)
  const faqs = [
    {
      q: "How fast do you contact new leads?",
      a: "We call or text new leads within 2 minutes, 24/7.",
    },
    {
      q: "What questions does the AI ask to qualify?",
      a: "Intent, timeline, budget, role, and next steps—fully customized to your scripts.",
    },
    {
      q: "Can it book meetings or route calls?",
      a: "Yes. We live‑transfer hot leads or book directly on your calendar.",
    },
    {
      q: "Does it sync with our tools?",
      a: "We push notes, dispositions, and transcripts to your CRM and calendar.",
    },
    {
      q: "Will this replace my team?",
      a: "It handles first‑touch and long‑term follow‑up so your team focuses on high‑value conversations.",
    },
  ];

  // Use case cards data (industry-agnostic scenarios)
  const useCaseCards = [
    {
      id: 1,
      title: "New Leads",
      description:
        "Instantly contact, qualify, and route new inbound leads from any source.",
      image: "/ranim.mp4", // Changed to video path
      textColor: "text-white"
      // position: "top-[25px] left-[34px]",
      // descPosition: "top-[78px] left-[34px]",
    },
    {
      id: 2,
      title: "Demo & Consultation Requests",
      description:
        "Screen intent and fit, then schedule with the right rep automatically.",
      image: "/help.mp4", // Changed to video path
      textColor: "text-white" // Changed to white for better contrast
      // position: "top-[26px] left-[704px]",
      // descPosition: "top-[78px] left-[704px]",
    },
    {
      id: 3,
      title: "Reactivation & Win‑Back",
      description:
        "Automated outreach that re‑opens conversations and recovers dormant pipeline.",
      image: "/consul.mp4", // Changed to video path
      textColor: "text-[#26509c]" // Position data removed
      // position: "top-[668px] left-[34px]",
      // descPosition: "top-[723px] left-[34px]",
    },
    {
      id: 4,
      title: "Database Reactivation",
      description: "Revive cold leads and past customers with long‑term drips and smart follow‑ups.",
      image: "/miner.mp4", // Changed image to video path
      textColor: "text-white" // Position data removed
      // position: "top-[669px] left-[656px]",
      // descPosition: "",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center relative bg-white overflow-x-hidden"> {/* Added overflow-x-hidden */}


      

      {/* Header Section */}
      <header className={`w-full flex flex-col items-center bg-white px-4 sm:px-6 lg:px-0`}> {/* Adjusted padding top */}
        {/* Navigation */}
        <nav className="w-full max-w-7xl mx-auto lg:max-w-none lg:mx-0 lg:px-8 flex items-center justify-between py-6"> {/* Explicitly remove max-width/mx-auto for lg, add padding */}
          {/* Logo */}
          <div className="flex-1 md:flex-none flex items-center"> {/* Let logo container grow on mobile, but not on md+ */}
            <img
              src="/screenshot-2025-03-26-224229-1.png"
              alt="Vocalx Labs Logo"
              className="h-10 sm:h-10"
              width="160"
              height="40"
              decoding="async"
              loading="eager"
            />
          </div>
          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-10"> {/* Hide on mobile, adjust spacing */}
            {navItems.map((item) => (
              item.href.startsWith('/') ? ( // Check if it's a route link
                <Link
                  key={item.title}
                  to={item.href} // Use href from data
                  className="text-base lg:text-lg font-semibold text-black hover:text-gray-700 [font-family:'Inter',Helvetica]" // Responsive text size
                >
                  {item.title}
                </Link>
              ) : ( // Otherwise, it's an internal page link
                <a
                  key={item.title}
                  href={item.href} // Use href from data
                  className="text-base lg:text-lg font-semibold text-black hover:text-gray-700 [font-family:'Inter',Helvetica]" // Responsive text size
                >
                  {item.title}
                </a>
              )
            ))}
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex-1 flex justify-end"> {/* Let button container grow and push content to the end */}
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
                    onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                  >
                    {item.title}
                  </Link>
                ) : (
                  <a
                    key={item.title}
                    href={item.href}
                    className="text-lg font-semibold text-black hover:text-gray-700 [font-family:'Inter',Helvetica]"
                    onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                  >
                    {item.title}
                  </a>
                )
              ))}
            </div>
          </div>
        )}

        {/* Hero Content */}
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center pt-16 px-4"> {/* Original Hero Content styles */}
          {/* Chip Button */}
          <div className="mb-4 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 shadow-sm inline-flex items-center text-sm">
            <span className="text-white font-semibold">
              Wasting time on repetitive outreach?
            </span>
          </div>
          {/* Main Heading */}
          <h1 className="text-[2.19rem] sm:text-5xl md:text-6xl font-extrabold text-black leading-tight mb-5 tracking-tight [font-family:'Inter',Helvetica]">
            AI That <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">Qualifies Leads</span><br />
            <span className="bg-gradient-to-r from-gray-900 via-gray-900 to-gray-700 bg-clip-text text-transparent">And Books Appointments For You</span>
          </h1>
          {/* Subheading */}
          <p className="text-xl text-gray-900 max-w-3xl [font-family:'Inter',Helvetica] font-medium [text-wrap:balance]">
            Instantly call/text new leads and qualify intent, timeline, and budget.
            <br className="hidden sm:block" />
            Live‑transfer or book — auto‑synced to your CRM.
          </p>
        </div>

        {/* CTA Button After Hero Text */}
        <div className="w-full flex justify-center pt-8 pb-10 sm:pb-12"> {/* Added padding top */}
          <Link
            to="/contact"
            className="bg-[#717fe8] hover:bg-[#5a67d8] text-white font-semibold text-lg py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Book a 15‑min Demo
          </Link>
        </div>

        {/* Trust/metrics bar */}
        <div className="w-full mt-4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 text-center px-4">
            <div className="rounded-xl border border-gray-200 bg-white py-3 px-4 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-gray-500">Average first touch</p>
              <p className="text-2xl sm:text-3xl font-black text-gray-900">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">under 2 minutes</span>
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white py-3 px-4 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-gray-500">Availability</p>
              <p className="text-2xl sm:text-3xl font-black text-gray-900">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">24/7/365</span>
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white py-3 px-4 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-gray-500">CRM updates</p>
              <p className="text-2xl sm:text-3xl font-black text-gray-900">
                <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">notes + transcripts</span>
              </p>
            </div>
          </div>
        </div>

        {/* Spline Animation with Logo Overlay */}
        <div className="relative w-full h-[300px]"> {/* Original Spline container styles */}
          <iframe
            src='https://my.spline.design/flowingribboncopy-pbztJStlEiiN827dLOxwPd1N/'
            frameBorder='0'
            width='100%'
            height='100%'
            title="Flowing Ribbon Spline Animation"
            className="absolute inset-0"
            loading="lazy"
          ></iframe>
          {/* Overlay to hide Spline logo */}
          <div className="absolute bottom-0 right-0 w-48 h-16 bg-white"></div> {/* Increased height further to cover logo */}
        </div>
      </header>

      {/* Removed CTA Button from here (moved above) */}

      {/* Features Section - content first for all breakpoints */}
      <section id="features" className="w-full px-4 sm:px-8 md:px-16 lg:px-[70px] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold [font-family:'Inter',Helvetica]">
              <span className="text-xs sm:text-sm uppercase tracking-widest text-[#717fe8] block mb-2">Why teams switch</span>
              Built For Modern Teams
            </h2>
            <p className="mt-3 text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
              Replace first‑touch and long‑term follow‑up with an AI system that
              responds in minutes, qualifies rigorously, and only routes real
              opportunities to your agents.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: 'Instant First Touch',
                desc:
                  'Every new form, chat, and ad lead gets a call or text in under 2 minutes.',
              },
              {
                title: 'Serious Qualification',
                desc:
                  'Intent, timeline, budget, role, and key context captured.',
              },
              {
                title: 'Live Transfer & Booking',
                desc:
                  'Hot prospects are live‑transferred or booked directly to your calendar.',
              },
              {
                title: 'Nurture That Wins Back Deals',
                desc:
                  'Multi‑month SMS + email drips re‑engage old and unresponsive leads.',
              },
              {
                title: 'CRM Sync',
                desc:
                  'Notes, dispositions and transcripts logged to your CRM so your pipeline stays clean.',
              },
              {
                title: 'Recording & Coaching',
                desc:
                  'Call recordings and transcripts help train teams and improve scripts.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="group relative rounded-3xl p-[1px] bg-gradient-to-r from-[#717fe8] to-[#954ad2] shadow-[0_10px_30px_rgba(113,127,232,0.12)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative rounded-3xl bg-white p-6 h-full overflow-hidden">
                  <div className="pointer-events-none absolute -top-8 -right-6 w-32 h-32 rounded-full bg-gradient-to-br from-[#717fe8]/15 to-transparent blur-2xl"></div>
                  <div className="relative z-10">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#717fe8] bg-[#717fe8]/10 inline-block px-2 py-1 rounded-full">0{idx + 1}</div>
                    <h3 className="font-semibold text-xl text-gray-900 mt-2 tracking-tight">{item.title}</h3>
                    <p className="text-gray-700 mt-1 text-sm sm:text-base">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex justify-center pt-10">
            <Link
              to="/contact"
              className="bg-[#717fe8] hover:bg-[#5a67d8] text-white font-semibold text-lg py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Book a 15‑min Demo
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold [font-family:'Inter',Helvetica]">
            <span className="text-xs sm:text-sm uppercase tracking-widest text-[#717fe8] block mb-2">Onboarding</span>
            How It Works
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Simple setup. Results in days, not months.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              step: '1',
              title: 'Connect Sources',
              desc: 'We connect your lead forms, portals and ads plus your CRM/calendar.',
            },
            {
              step: '2',
              title: 'AI Engages & Qualifies',
              desc: 'Calls or texts instantly, asks your script, and captures key details.',
            },
            {
              step: '3',
              title: 'Book & Sync',
              desc: 'Live‑transfer or book appointments, then log everything to the CRM.',
            },
          ].map((i) => (
            <div key={i.step} className="rounded-2xl border border-gray-200 p-6 bg-white shadow-sm text-center">
              <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-gradient-to-r from-[#717fe8] to-[#954ad2] text-white flex items-center justify-center font-extrabold text-lg shadow">
                {i.step}
              </div>
              <h3 className="font-semibold text-lg text-gray-900">{i.title}</h3>
              <p className="text-gray-700 mt-1 text-sm sm:text-base">{i.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Button After Features */}
      <div className="w-full flex justify-center py-10 sm:py-12">
        <Link
          to="/contact"
          className="bg-[#717fe8] hover:bg-[#5a67d8] text-white font-semibold text-lg py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Contact Us
        </Link>
      </div>

      {/* Use Cases Section (text-only) */}
      <section id="use-cases" className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-[61px] py-12 sm:py-16">
        <div className="w-full max-w-3xl mx-auto text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="[font-family:'Inter',Helvetica] font-extrabold text-black text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">
            AI Automation Use Cases That Drive Revenue
          </h2>
          <p className="[font-family:'Inter',Helvetica] font-medium text-gray-700 text-base sm:text-lg leading-relaxed">
            Your competitors are already responding in minutes, nurturing for months, and logging everything to the CRM—so they close while others chase.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-[35px] max-w-[1245px] mx-auto">
          {useCaseCards.map((card, idx) => (
            <div
              key={card.id}
              className="group relative rounded-3xl p-[1px] bg-gradient-to-r from-[#717fe8] to-[#954ad2] shadow-[0_10px_30px_rgba(113,127,232,0.12)] transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative rounded-3xl bg-white p-6 h-full overflow-hidden">
                <div className="pointer-events-none absolute -top-8 -right-6 w-32 h-32 rounded-full bg-gradient-to-br from-[#717fe8]/15 to-transparent blur-2xl"></div>
                <div className="relative z-10">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-[#717fe8] bg-[#717fe8]/10 inline-block px-2 py-1 rounded-full">0{idx + 1}</div>
                  <h3 className="[font-family:'Inter',Helvetica] font-extrabold text-gray-900 text-2xl sm:text-3xl mt-2 tracking-tight">
                    {card.title}
                  </h3>
                  {card.description && (
                    <p className="[font-family:'Inter',Helvetica] font-medium text-gray-700 text-sm sm:text-base leading-relaxed mt-2">
                      {card.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Button After Use Cases */}
      <div className="w-full flex justify-center py-10 sm:py-12">
        <Link
          to="/contact"
          className="bg-[#717fe8] hover:bg-[#5a67d8] text-white font-semibold text-lg py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Contact Us
        </Link>
      </div>

      {/* Testimonials Section - Video embed */}
      <section id="testimonials" className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center relative py-12 sm:py-16 px-4 sm:px-8">
        <div className="w-full max-w-3xl text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="[font-family:'Inter',Helvetica] font-extrabold text-[#272727] text-4xl sm:text-5xl md:text-[56px] tracking-[0] leading-tight">
            Testimonials
          </h2>
          <p className="text-center [font-family:'Inter',Helvetica] font-medium text-[#272727] text-base sm:text-lg leading-relaxed mt-4">
            Real teams sharing real outcomes.
          </p>
        </div>

        <div className="w-full max-w-6xl mx-auto space-y-12">
          {/* Row 1: Video left, description right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/uAwBPvVf-IY"
                  title="Vocalx Labs testimonial video 1"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-semibold text-gray-900 [font-family:'Inter',Helvetica]">Dr. Ron Jones</h3>
                <img
                  src="/top-agent-zillow.png"
                  alt="Top Agent on Zillow badge"
                  className="h-6 sm:h-7 w-auto"
                  loading="lazy"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
              <p className="mt-3 text-gray-700 leading-relaxed">
              Dr. Ron Jones is a top agent in Zillow with Keller Williams in Twin Falls, known for his outstanding service, deep local expertise, and a proven track record helping clients buy and sell homes throughout the Magic Valley region.
              </p>
            </div>
          </div>

          {/* Row 2: Zig‑zag (text left, video right) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-none md:order-1">
              <h3 className="text-2xl font-semibold text-gray-900 [font-family:'Inter',Helvetica]">Michael Reynolds</h3>
              <p className="mt-3 text-gray-700 leading-relaxed">
              Michael Reynolds is a premier real estate agent in Los Angeles, celebrated for his exceptional client dedication, unparalleled knowledge of the city's dynamic neighborhoods, and a stellar history of guiding buyers and sellers through seamless transactions across the vibrant Greater Los Angeles area.
              </p>
            </div>
            <div className="order-none md:order-2 rounded-2xl overflow-hidden shadow-xl">
              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/IHCZarbiUj0"
                  title="Vocalx Labs testimonial video 2"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <a
          href="https://www.youtube.com/channel/UCP4bnLnLPsoR_g4NkUPP1Uw"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-[#717fe8] hover:underline"
        >
          Watch more on our YouTube channel
        </a>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full max-w-[1440px] py-16"> {/* Original Pricing Section styles */}
        <div className="flex flex-col items-center justify-center gap-8 px-[60px]"> {/* Original Pricing container styles */}
          {/* Updated Pricing Header */}
          <div className="text-center mb-12">
            {/* Updated Pricing Header Copywriting */}
            <h2 className="[font-family:'Inter',Helvetica] font-black text-[#272727] text-4xl sm:text-5xl md:text-[64px] text-center tracking-[0] leading-tight sm:leading-[70px]">
            Your Last Missed Lead Could've Paid for This <span className="shiny-sweep lifetime-gradient">lifetime</span>
            </h2>
            <p className="[font-family:'Inter',Helvetica] font-medium text-gray-600 text-lg sm:text-xl mt-4">
            One extra deal typically covers your setup — then it keeps paying dividends.
            </p>
          </div>

          {/* Single Pricing Card Layout */}
          <div className="flex justify-center"> {/* Center the single card */}
            {pricingPlans.map((plan) => (
              <Card
                key={plan.id}
                className="w-full max-w-md sm:max-w-lg rounded-3xl bg-[#717fe8] text-white shadow-xl"
              >
                <CardContent className="p-8 sm:p-12 md:p-16"> {/* Responsive padding */}
                  {/* Optional badge */}
                  {plan.badge && (
                    <div className={"bg-white/15 text-white inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3"}>
                      {plan.badge}
                    </div>
                  )}
                  <h3 className="[font-family:'Inter',Helvetica] font-black text-3xl sm:text-4xl leading-tight mb-4"> {/* Adjusted size, margin */}
                    {plan.name}
                  </h3>

                  {/* Price Display */}
                  <div className="mb-8">
                     <p className="text-lg opacity-90">{plan.description}</p>
                     <div className="flex items-baseline gap-x-2 mt-4">
                        <span className="[font-family:'Cabinet_Grotesk-Extrabold',Helvetica] font-normal text-5xl sm:text-6xl">
                          {plan.price}
                        </span>
                        <span className="text-xl opacity-90">{plan.pricePeriod}</span>
                     </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-4 mb-10"> {/* Adjusted spacing */}
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3"> {/* Increased gap */}
                        <CheckIcon className="w-5 h-5 flex-shrink-0" /> {/* Adjusted size */}
                        <span
                          className="[font-family:'Manrope',Helvetica] font-medium text-base sm:text-lg" // Responsive size
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Updated Button - Centered and linked to Contact Us */}
                  <div className="flex justify-center">
                    <Link to="/contact">
                      <Button
                        className="mt-8 w-full sm:w-auto bg-white text-[#717fe8] hover:bg-gray-100 text-lg font-semibold py-3 px-8 rounded-lg" // Adjusted styles, size, padding
                      >
                        {plan.buttonText}
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Add note about custom plans */}
          <p className="text-center text-gray-500 mt-8 text-sm">
            Need more? <Link to="/contact" className="text-blue-600 hover:underline">Contact us</Link> for enterprise solutions and custom plans.
          </p>
        </div>
      </section>

      {/* Footer Section */}
      {/* FAQ Section */}
      <section id="faq" className="w-full max-w-7xl mx-auto py-12 sm:py-16 px-4 sm:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="[font-family:'Inter',Helvetica] font-extrabold text-[#272727] text-3xl sm:text-4xl">Frequently Asked Questions</h2>
          <p className="text-gray-600 mt-3">Built for modern teams—quick answers below.</p>
        </div>
        <div className="max-w-3xl mx-auto divide-y divide-gray-200">
          {faqs.map((item, idx) => (
            <details key={idx} className="py-4 group">
              <summary className="cursor-pointer flex items-start justify-between gap-4">
                <span className="font-semibold text-left text-lg text-gray-900">{item.q}</span>
                <span className="text-[#717fe8] font-bold">+</span>
              </summary>
              <p className="mt-2 text-gray-700 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="w-full bg-gray-900 text-gray-300 py-8 sm:py-12 px-4 sm:px-8 mt-12 sm:mt-16"> {/* Responsive padding/margin */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6 md:gap-0"> {/* Added gap, text alignment */}
          {/* Logo and Copyright */}
          <div className="mb-6 md:mb-0"> {/* Removed text alignment here, handled above */}
            <img
              src="/screenshot-2025-03-26-224229-1.png"
              alt="Vocalx Labs Logo"
              className="h-7 sm:h-8 mb-3 sm:mb-4 mx-auto md:mx-0"
              width="160"
              height="40"
              decoding="async"
              loading="lazy"
            />
            <p className="text-xs sm:text-sm">&copy; {new Date().getFullYear()} Vocalx Labs. All rights reserved.</p> {/* Responsive size */}
            {/* Add Email Link */}
            <a href="mailto:team@vocalxlabs.com" className="block mt-2 text-xs sm:text-sm text-gray-400 hover:text-white hover:underline">
              team@vocalxlabs.com
            </a>
          </div>

          {/* Footer Navigation */}
          <nav className="flex flex-wrap justify-center md:justify-end gap-x-4 sm:gap-x-6 gap-y-2"> {/* Use nav tag, adjust gap */}
            {navItems.map((item) => (
              item.href.startsWith('/') ? ( // Check if it's a route link
                <Link
                  key={item.title}
                  to={item.href}
                  className="text-xs sm:text-sm hover:text-white" // Responsive size
                >
                  {item.title}
                </Link>
              ) : ( // Otherwise, it's an internal page link
                <a
                  key={item.title}
                  href={item.href}
                  className="text-xs sm:text-sm hover:text-white" // Responsive size
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
      
      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10000] p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full relative transform transition-all duration-300 animate-in">
            {/* Close button */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
              aria-label="Close popup"
            >
              <XIcon className="w-4 h-4 text-gray-600" />
            </button>
            
            {/* Modal content */}
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-[#717fe8] to-[#954ad2] rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2 [font-family:'Inter',Helvetica]">
                  Talk to Our AI Assistant
                </h2>
                <p className="text-gray-600 text-sm">
                  Real-time demo. No wait.
                </p>
              </div>
              
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const formData = new FormData(form);
                  const fullname = formData.get('fullname') as string;
                  const phone = formData.get('phone') as string;
                  const countryCode = formData.get('countryCode') as string;
                  
                  if (!fullname.trim() || !phone.trim()) {
                    const messageBox = document.getElementById('popup-message');
                    if (messageBox) {
                      messageBox.textContent = "Please fill in all fields.";
                      messageBox.className = "text-red-600 mt-4 text-center text-sm";
                    }
                    return;
                  }

                  const payload = { fullname: fullname.trim(), phone: countryCode + phone.trim() };

                  try {
                    const res = await fetch('https://services.leadconnectorhq.com/hooks/qmXJdLQTCzANbI5LCD8t/webhook-trigger/940b8d1f-df28-4e85-a4c4-2d1b011fdb2a', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload)
                    });

                    const messageBox = document.getElementById('popup-message');
                    if (res.ok) {
                      if (messageBox) {
                        messageBox.textContent = "✅ Form submitted successfully!";
                        messageBox.className = "text-green-600 mt-4 text-center text-sm";
                      }
                      form.reset();
                      // Close popup after successful submission
                      setTimeout(() => setShowPopup(false), 2000);
                    } else {
                      if (messageBox) {
                        messageBox.textContent = "❌ Something went wrong. Please try again.";
                        messageBox.className = "text-red-600 mt-4 text-center text-sm";
                      }
                    }
                  } catch (err) {
                    const messageBox = document.getElementById('popup-message');
                    if (messageBox) {
                      messageBox.textContent = "❌ Submission error. Check your connection.";
                      messageBox.className = "text-red-600 mt-4 text-center text-sm";
                    }
                    console.error(err);
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="popup-fullname" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="popup-fullname"
                    name="fullname"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#717fe8] focus:border-[#717fe8] outline-none transition-colors"
                    placeholder="So we know how to greet you"
                  />
                </div>

                <div>
                  <label htmlFor="popup-phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="flex items-center">
                    <select 
                      name="countryCode"
                      id="popup-countryCode"
                      className="h-full px-3 py-3 border border-r-0 border-gray-300 rounded-l-xl focus:ring-2 focus:ring-[#717fe8] focus:border-[#717fe8] outline-none transition-colors bg-gray-50 text-sm"
                      defaultValue="+1"
                    >
                      <option value="+1">+1 (US)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+61">+61 (AU)</option>
                      <option value="+91">+91 (IN)</option>
                      <option value="+1_CA">+1 (CA)</option> {/* Differentiate Canadian +1 */}
                      {/* Add more common country codes as needed */}
                    </select>
                    <input
                      type="tel"
                      id="popup-phone"
                      name="phone"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-r-xl focus:ring-2 focus:ring-[#717fe8] focus:border-[#717fe8] outline-none transition-colors"
                      placeholder="We'll call this number in seconds"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#717fe8] to-[#954ad2] text-white font-semibold py-3 px-4 rounded-xl hover:from-[#6270e5] hover:to-[#8a44c9] transition-all transform hover:scale-[1.02] shadow-lg"
                >
                  Start Demo Call
                </button>
              </form>

              <div id="popup-message" className="text-center mt-4 text-sm"></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Schema.org structured data for SEO */}
      <script type="application/ld+json">
        {JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Vocalxlabs",
            "url": "https://www.vocalxlabs.com",
            "logo": "https://www.vocalxlabs.com/screenshot-2025-03-26-224229-1.png",
            "description": "Vocalxlabs provides AI-powered voice agents and automated SMS to qualify leads, book meetings, and sync with your CRM across industries.",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Sales Inquiry",
              "email": "team@vocalxlabs.com"
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "AI Lead Qualification & SMS Automation",
            "provider": {
              "@type": "Organization",
              "name": "Vocalxlabs"
            },
            "name": "AI Voice Agent & Automated SMS Automation",
            "description": "AI voice and SMS instantly engage new leads, qualify for intent, timeline and budget, then book meetings with CRM sync.",
            "audience": {
              "@type": "Audience",
              "audienceType": ["Revenue Teams", "Support Teams", "Marketing Teams", "Operations"]
            }
          }
        ])}
      </script>
    </div>
  );
};
