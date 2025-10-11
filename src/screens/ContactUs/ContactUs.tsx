import { useState, useEffect, useRef, type ReactNode } from 'react';

import { Link } from "react-router-dom";
import { MenuIcon, XIcon, CheckIcon } from "lucide-react";
import { Button } from "../../components/ui/button";

type AnimatedStepProps = { children: ReactNode; direction: 'right' | 'left' };
const AnimatedStep = ({ children, direction }: AnimatedStepProps) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(false);
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [direction, children]);
  const hiddenTransform = direction === 'right' ? 'translate-x-6 sm:translate-x-10' : '-translate-x-6 sm:-translate-x-10';
  return (
    <div
      className={`transform will-change-transform transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        visible ? 'opacity-100 translate-x-0' : `opacity-0 ${hiddenTransform}`
      }`}
    >
      {children}
    </div>
  );
};

type Question = {
  id: string;
  title: string;
  prompt: string;
  options: string[];
};

// (Icons for first question are referenced inline where used)

const questions: Question[] = [
  {
    id: "leadSource",
    title: "Lead source",
    prompt: "How Are You Currently Getting Leads?",
    options: [
      "Running Ads",
      "Buying A List",
      "Affiliate Partners",
      "None",
    ],
  },
  {
    id: "improvement",
    title: "Improve areas",
    prompt: "What Areas Are You Most Interested In Improving?",
    options: [
      "Improving My Follow Up",
      "Booking More Appointments",
      "Driving More Phone calls",
      "Simplifying My Team Workflow",
      "All The Above",
    ],
  },
  {
    id: "urgency",
    title: "Timeline",
    prompt: "How Soon Are You Looking To Fix This?",
    options: [
      "Immediately",
      "In The Next Week",
      "This Month",
      "In The Next 6-Months",
    ],
  },
  {
    id: "role",
    title: "Role",
    prompt: "What’s Your Role In Your Company?",
    options: [
      "Owner",
      "VP",
      "Director",
      "Manager",
      "Employee",
    ],
  },
  {
    id: "revenue",
    title: "Monthly revenue",
    prompt: "What's Your Current Monthly Revenue?",
    options: [
      "$0 - $5,000",
      "$5,000 - $10,000",
      "$10,000 - $20,000",
      "$20,000 - $30,000",
      "$30,000 - $40,000",
      "$50,000+",
    ],
  },
];

// Calendly booking URL
const CALENDLY_URL = 'https://calendly.com/danielgrayson087/15mins';

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

  const totalSteps = questions.length + 1; // +1 for contact details step
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [details, setDetails] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);
  const [animDirection, setAnimDirection] = useState<'right' | 'left'>('right');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showCalendly, setShowCalendly] = useState(false);
  const [isCalendlyLoading, setIsCalendlyLoading] = useState(false);
  const calendlyContainerRef = useRef<HTMLDivElement | null>(null);

  const currentQuestion = questions[stepIndex];

  const handleOptionSelect = (qid: string, option: string) => {
    setAnswers((prev) => ({ ...prev, [qid]: option }));
  };

  const handleOptionClick = (qid: string, option: string) => {
    // Select and advance to next step automatically (for question steps)
    handleOptionSelect(qid, option);
    if (stepIndex < totalSteps - 1) {
      setAnimDirection('right');
      // brief delay so the selection state is visible
      setTimeout(() => setStepIndex((s) => Math.min(s + 1, totalSteps - 1)), 180);
    }
  };

  const canGoNext = () => {
    if (stepIndex < questions.length) {
      const q = questions[stepIndex];
      return Boolean(answers[q.id]);
    }
    return (
      details.name.trim().length > 1 &&
      /.+@.+\..+/.test(details.email.trim()) &&
      details.phone.trim().length >= 7
    );
  };

  // advance handled by option click; no explicit Next button

  const handleBack = () => {
    if (stepIndex > 0) {
      setAnimDirection('left');
      setStepIndex((s) => s - 1);
    }
  };

  const saveToLocalStorage = () => {
    try {
      const existingData = localStorage.getItem('contactSubmissions');
      const submissions = existingData ? JSON.parse(existingData) : [];
      submissions.push({ ...details, answers, timestamp: new Date().toISOString() });
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
    } catch (err) {
      console.error('localStorage save failed', err);
    }
  };

  const handleSubmit = async () => {
    if (!canGoNext() || isSubmitting) return;
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = { 
      name: details.name.trim(),
      email: details.email.trim(),
      phone: details.phone.trim(),
      answers,
      source: 'website-contact-wizard',
    };

    try {
      const res = await fetch('https://services.leadconnectorhq.com/hooks/qmXJdLQTCzANbI5LCD8t/webhook-trigger/133b0fc1-cf8f-47b8-8fa2-862eb8910288', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        saveToLocalStorage();
        setSubmitted(true);
        setShowCalendly(true);
        setIsCalendlyLoading(true);
      } else {
        setSubmitError('There was an error submitting the form. Please try again.');
      }
    } catch (err) {
      console.error('Submission error', err);
      setSubmitError('There was an error submitting the form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Load Calendly assets and initialize inline widget when overlay opens
  useEffect(() => {
    if (!showCalendly) return;
    setIsCalendlyLoading(true);

    // Ensure Calendly stylesheet is present
    const cssId = 'calendly-widget-styles';
    if (!document.getElementById(cssId)) {
      const link = document.createElement('link');
      link.id = cssId;
      link.rel = 'stylesheet';
      link.href = 'https://assets.calendly.com/assets/external/widget.css';
      document.head.appendChild(link);
    }

    const scriptId = 'calendly-widget-script';
    const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

    const initCalendly = () => {
      const calendly = (window as any).Calendly;
      if (!calendly || !calendlyContainerRef.current) {
        // Retry shortly until Calendly attaches
        setTimeout(initCalendly, 200);
        return;
      }
      // Clear any previous content before initializing
      calendlyContainerRef.current.innerHTML = '';
      try {
        calendly.initInlineWidget({
          url: CALENDLY_URL,
          parentElement: calendlyContainerRef.current,
        });
      } finally {
        setIsCalendlyLoading(false);
      }
    };

    if (existingScript) {
      initCalendly();
    } else {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = initCalendly;
      document.body.appendChild(script);
    }

    return () => {
      // keep script/css for reuse; just remove stray badges/popups
      const badges = document.querySelectorAll('.calendly-badge-widget');
      badges.forEach((b) => b.remove());
      const popups = document.querySelectorAll('.calendly-popup-content');
      popups.forEach((p) => p.remove());
    };
  }, [showCalendly]);

  const progressPercent = Math.round((stepIndex / (totalSteps - 1)) * 100);

  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
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
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center p-8 flex-1">
        {!submitted ? (
          <>
            {/* Progress */}
            <div className="w-full mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-700 [font-family:'Inter',Helvetica]">
                  Step {Math.min(stepIndex + 1, totalSteps)} of {totalSteps}
                </span>
                <span className="text-sm text-gray-600">{progressPercent}%</span>
              </div>
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-gradient-to-r from-[#717fe8] to-[#954ad2] transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Full-page style (no box) */}
            <div className="w-full">
              <AnimatedStep key={stepIndex} direction={animDirection}>
                {stepIndex < questions.length ? (
                  <>
                  <div className="mb-6">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold mb-3">
                      {currentQuestion.title}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-black [font-family:'Inter',Helvetica]">
                      {currentQuestion.prompt}
                      <span className="text-rose-600 pl-1">*</span>
                    </h2>
                  </div>

                  {currentQuestion.id === 'leadSource' ? (
                    <div role="radiogroup" className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10 place-items-center">
                      {currentQuestion.options.map((opt) => {
                        const selected = answers[currentQuestion.id] === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => handleOptionClick(currentQuestion.id, opt)}
                            className="group flex flex-col items-center text-center"
                          >
                            {/* Replace src with your actual icon paths */}
                            <div
                              className={`relative flex items-center justify-center h-40 w-40 rounded-full border-2 transition-all ${
                                selected
                                  ? 'border-[#717fe8] ring-4 ring-[#717fe8]/20 shadow-md'
                                  : 'border-[#717fe8] hover:shadow-md'
                              } bg-white`}
                            >
                              <img
                                src={
                                  opt === 'Affiliate Partners' ? '/partners.png'
                                  : opt === 'None' ? '/none.png'
                                  : opt === 'Buying A List' ? '/List.png'
                                  : '/ads.png'
                                }
                                alt=""
                                className="h-16 w-16 object-contain"
                              />
                              <span
                                className={`absolute -bottom-3 z-10 h-7 w-7 rounded-full bg-white border-2 flex items-center justify-center ${
                                  selected ? 'border-[#717fe8]' : 'border-gray-200'
                                }`}
                              >
                                <span
                                  className={`h-3.5 w-3.5 rounded-full transition-colors ${
                                    selected ? 'bg-[#717fe8]' : 'bg-gray-200'
                                  }`}
                                />
                              </span>
                            </div>
                            <span className="mt-4 font-semibold text-gray-900 [font-family:'Inter',Helvetica]">
                              {opt}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  ) : (
                    <div role="radiogroup" className="flex flex-col gap-4 mb-8">
                      {currentQuestion.options.map((opt) => {
                        const selected = answers[currentQuestion.id] === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => handleOptionClick(currentQuestion.id, opt)}
                            className={`w-full flex items-center gap-4 rounded-xl border px-5 py-4 text-left transition-all ${
                              selected
                                ? 'bg-white border-[#717fe8] ring-2 ring-[#717fe8] shadow-md'
                                : 'bg-white border-gray-200 hover:border-[#717fe8] hover:shadow-md'
                            }`}
                          >
                            <span
                              aria-hidden
                              className={`flex items-center justify-center h-5 w-5 rounded-full border-2 ${
                                selected ? 'border-[#717fe8]' : 'border-[#717fe8]'
                              }`}
                            >
                              <span className={`h-2.5 w-2.5 rounded-full ${selected ? 'bg-[#717fe8]' : 'bg-transparent'}`} />
                            </span>
                            <span className="font-semibold text-gray-900 [font-family:'Inter',Helvetica]">
                              {opt}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleBack}
                      disabled={stepIndex === 0}
                    >
                      Back
                    </Button>
                    {/* Auto-advance on selection; keep space minimal */}
                    <div />
                  </div>
                  </>
                ) : (
                  <>
                  <div className="mb-6">
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-semibold mb-3">
                      Contact details
                    </div>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-black [font-family:'Inter',Helvetica]">
                      Where can we reach you?
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div>
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2 [font-family:'Inter',Helvetica]">Name</label>
              <input
                        id="name"
                type="text"
                        value={details.name}
                        onChange={(e) => setDetails((d) => ({ ...d, name: e.target.value }))}
                placeholder="Enter your full name"
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#717fe8] focus:border-transparent transition duration-200"
              />
            </div>
                    <div>
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2 [font-family:'Inter',Helvetica]">Email</label>
              <input
                        id="email"
                type="email"
                        value={details.email}
                        onChange={(e) => setDetails((d) => ({ ...d, email: e.target.value }))}
                placeholder="your.email@example.com"
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#717fe8] focus:border-transparent transition duration-200"
              />
            </div>
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2 [font-family:'Inter',Helvetica]">Phone (with country code)</label>
              <input
                        id="phone"
                type="tel"
                        value={details.phone}
                        onChange={(e) => setDetails((d) => ({ ...d, phone: e.target.value }))}
                        placeholder="+1 555 123 4567"
                className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-[#717fe8] focus:border-transparent transition duration-200"
              />
            </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!canGoNext() || isSubmitting}
                      className="bg-gradient-to-r from-[#717fe8] to-[#954ad2] text-white hover:from-[#5a67d8] hover:to-[#7e3eb3]"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </Button>
                  </div>
                  {submitError && (
                    <p className="mt-3 text-sm text-red-600 [font-family:'Inter',Helvetica]">{submitError}</p>
                  )}
                  </>
                )}
              </AnimatedStep>
            </div>
        </>
      ) : (
        <>
            <div className="w-full text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-to-r from-[#717fe8] to-[#954ad2] flex items-center justify-center text-white">
                <CheckIcon className="h-6 w-6" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-black mb-2 [font-family:'Inter',Helvetica]">Thank you!</h2>
              <p className="text-gray-700 mb-6 [font-family:'Inter',Helvetica]">Book a meeting anytime to get a live demo.</p>
            </div>

            {/* Calendly Inline (embedded inside the page) */}
            {showCalendly && (
              <div className="w-full mt-8">
                <div className="relative">
                  <div
                    ref={calendlyContainerRef}
                    className="calendly-inline-widget w-full rounded-2xl overflow-hidden shadow-xl"
                    style={{ minWidth: '320px', height: '700px' }}
                  />
                  {isCalendlyLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/70">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#717fe8]"></div>
                    </div>
                  )}
                </div>
              </div>
            )}
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