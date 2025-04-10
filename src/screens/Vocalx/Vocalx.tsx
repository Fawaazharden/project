import { CheckIcon, MenuIcon, XIcon } from "lucide-react"; // Added MenuIcon, XIcon
import React, { useState } from "react"; // Added useState
import { Link } from "react-router-dom"; // Import Link
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";

export const Vocalx = (): JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  // Navigation items - Removed width, will use spacing utilities
  const navItems = [
    { title: "Features", href: "#features" }, // Added href
    { title: "Use Cases", href: "#use-cases" }, // Added href
    { title: "Testimonials", href: "#testimonials" }, // Added href
    { title: "Pricing", href: "#pricing" }, // Added href
    { title: "Contact Us", href: "/contact" }, // Keep route for Contact Us
  ];

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: "Robin Ayala Doe",
      text: "Why truly, I've found the JOY of AI. It's the point at which my better half does it. There is no sincerer love than the adoration for sustenance.",
      image: "/image.png",
      groupImage: "/group-2.png",
    },
    {
      id: 2,
      name: "John De marli",
      text: "any individuals have eaten in this kitchen and have proceeded to lead typical, solid lives. The route to a man's heart is through his stomach.",
      image: "/rectangle-1.svg",
      groupImage: "/group-1.png",
    },
    {
      id: 3,
      name: "Rowhan Smith",
      text: "You don't need to cook extravagant or muddled perfect works of art, simply great sustenance from new fixings.",
      image: "/rectangle.svg",
      groupImage: "/group.png",
    },
  ];

  // Updated Pricing plan features for a single comprehensive plan
  const pricingFeatures = [
    "Advanced AI Voice Generation",
    "Multiple Languages & Accents",
    "Custom Voice Cloning (Add-on)",
    "API Access",
    "Priority Support",
    "Generous Usage Limits",
    "Team Collaboration Tools",
  ];

  // Updated Pricing plans data to a single plan
  const pricingPlans = [
    {
      id: 1,
      name: "Standard Plan", // Renamed to clarify it's the base plan
      price: "$499", // Updated price
      pricePeriod: "/month", // Added period
      description: "Starting from", // Added description for price
      features: pricingFeatures,
      highlighted: true, // Keep it highlighted
      buttonText: "Get Started", // Updated button text
    },
  ];

  // Use case cards data
  const useCaseCards = [
    {
      id: 1,
      title: "Real Estate",
      description:
        "Lorem Ipsum is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text Ever Since The 1500s, When An Unknown Printer Took A Galley Of Type And Scrambled It To Make A Type Specimen Book.",
      image: "/ranim.mp4", // Changed to video path
      textColor: "text-white" // Position data removed
      // position: "top-[25px] left-[34px]",
      // descPosition: "top-[78px] left-[34px]",
    },
    {
      id: 2,
      title: "Help Desk",
      description:
        "Lorem Ipsum is Simply Dummy Text Of The Printing And Typesetting Industry.",
      image: "/help.mp4", // Changed to video path
      textColor: "text-[#954ad2]" // Position data removed
      // position: "top-[26px] left-[704px]",
      // descPosition: "top-[78px] left-[704px]",
    },
    {
      id: 3,
      title: "Consulting",
      description:
        "Lorem Ipsum is Simply Dummy Text Of The Printing And Typesetting Industry. Lorem Ipsum Has Been The Industry's Standard Dummy Text",
      image: "/consul.mp4", // Changed to video path
      textColor: "text-[#26509c]" // Position data removed
      // position: "top-[668px] left-[34px]",
      // descPosition: "top-[723px] left-[34px]",
    },
    {
      id: 4,
      title: "Mineral Acquisition",
      description: "",
      image: "/miner.mp4", // Changed image to video path
      textColor: "text-white" // Position data removed
      // position: "top-[669px] left-[656px]",
      // descPosition: "",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center relative bg-white overflow-x-hidden"> {/* Added overflow-x-hidden */}
      {/* Header Section - Updated based on Figma visual */}
      <header className="w-full flex flex-col items-center bg-white px-4 sm:px-6 lg:px-0"> {/* Removed lg horizontal padding */}
        {/* Navigation */}
        <nav className="w-full max-w-7xl mx-auto lg:max-w-none lg:mx-0 lg:px-8 flex items-center justify-between py-6"> {/* Explicitly remove max-width/mx-auto for lg, add padding */}
          {/* Logo */}
          {/* Logo */}
          <div className="flex items-center"> {/* Removed mr-auto, handled by justify-between */}
            <img
              src="/screenshot-2025-03-26-224229-1.png" // Assuming this is the correct logo path
              alt="Vocalx Labs Logo"
              className="h-8 sm:h-10" // Responsive height
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
              Team wasting time on bad leads?
            </span>
          </div>
          {/* Main Heading */}
          <h1 className="text-[2.19rem] sm:text-5xl md:text-6xl font-extrabold text-black leading-tight mb-5 [font-family:'Inter',Helvetica]"> {/* Custom size between 3xl and 4xl for mobile */}
            Let AI <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
              Qualify Leads
            </span> <br />
            So You Don't Have To
          </h1>
          {/* Subheading */}
          <p className="text-xl text-gray-800 max-w-3xl [font-family:'Inter',Helvetica] font-medium"> {/* Original Subheading styles */}
          We deploy AI voice and SMS to screen prospects automatically, sending only the best leads your way via CRM sync          </p>
        </div>

        {/* CTA Button After Hero Text */}
        <div className="w-full flex justify-center pt-8 pb-10 sm:pb-12"> {/* Added padding top */}
          <Link
            to="/contact"
            className="bg-[#717fe8] hover:bg-[#5a67d8] text-white font-semibold text-lg py-3 px-8 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Contact Us
          </Link>
        </div>

        {/* Spline Animation with Logo Overlay */}
        <div className="relative w-full h-[300px]"> {/* Original Spline container styles */}
          <iframe
            src='https://my.spline.design/flowingribbon-51a5926b204e17cccf87e2380edcd402/'
            frameBorder='0'
            width='100%'
            height='100%'
            title="Flowing Ribbon Spline Animation"
            className="absolute inset-0" // Make iframe fill the container
          ></iframe>
          {/* Overlay to hide Spline logo */}
          <div className="absolute bottom-0 right-0 w-48 h-16 bg-white"></div> {/* Increased height further to cover logo */}
        </div>
      </header>

      {/* Removed CTA Button from here (moved above) */}

      {/* Features Section */}
      <section id="features" className="flex w-full items-center justify-center px-4 sm:px-8 md:px-16 lg:px-[70px] py-8 sm:py-12 md:py-16 relative"> {/* Added id="features", responsive padding */}
        {/* Desktop version - visible on md screens and above */}
        <div className="hidden md:flex w-full max-w-[1300px] items-center justify-center relative opacity-80"> {/* Added justify-center, hidden on mobile */}
          <img
            className="w-full h-auto object-cover"
            alt="Features"
            src="/features.png"
          />
        </div>
        
        {/* Mobile version - visible only on screens smaller than md */}
        <div className="flex md:hidden w-full flex-col max-w-[1300px]">
          <h2 className="text-center text-3xl font-bold mb-8">Our Features</h2>
          
          {/* Feature 1 */}
          <div className="mb-8 bg-blue-50 rounded-lg p-4 shadow-sm">
            <div className="flex items-start">
              <div className="w-1/4 mr-4 flex-shrink-0">
                <img src="/3.png" alt="Qualify leads" className="w-full h-auto rounded" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Too Many Bad Leads?</h3>
                <p className="text-sm text-gray-700">We filter out the unqualified ones so your team speaks only talks to the right people.</p>
              </div>
            </div>
          </div>
          
          {/* Feature 2 */}
          <div className="mb-8 bg-purple-50 rounded-lg p-4 shadow-sm">
            <div className="flex items-start flex-row-reverse">
              <div className="w-1/4 ml-4 flex-shrink-0">
                <img src="/4.png" alt="Automated campaigns" className="w-full h-auto rounded" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Leads Stop Responding?</h3>
                <p className="text-sm text-gray-700">We run smart 6-month SMS follow-ups, so leads hear from you often and don’t forget who you are</p>
              </div>
            </div>
          </div>
          
          {/* Feature 3 */}
          <div className="mb-8 bg-green-50 rounded-lg p-4 shadow-sm">
            <div className="flex items-start">
              <div className="w-1/4 mr-4 flex-shrink-0">
                <img src="/5.png" alt="Reduce costs" className="w-full h-auto rounded" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Team Can’t Handle Volume?</h3>
                <p className="text-sm text-gray-700">Your team can take one call at a time, our AI takes 15+, giving you more chances to close deals fast</p>
              </div>
            </div>
          </div>
          
          {/* Feature 4 */}
          <div className="mb-8 bg-blue-50 rounded-lg p-4 shadow-sm">
            <div className="flex items-start flex-row-reverse">
              <div className="w-1/4 ml-4 flex-shrink-0">
                <img src="/6.png" alt="Concurrent calls" className="w-full h-auto rounded" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Hiring Too Expensive?</h3>
                <p className="text-sm text-gray-700">Skip the cost of building a big team. Our AI works 24/7, handles more leads, and costs much less</p>
              </div>
            </div>
          </div>
          
          {/* Feature 5 */}
          <div className="mb-4 bg-purple-50 rounded-lg p-4 shadow-sm">
            <div className="flex items-start">
              <div className="w-1/4 mr-4 flex-shrink-0">
                <img src="/7.png" alt="Fast responses" className="w-full h-auto rounded" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Too Slow to Reply?</h3>
                <p className="text-sm text-gray-700">Speed matters. Our AI calls or texts every new lead within 2 minutes, so they don’t go cold</p>
              </div>
            </div>
          </div>
          
          {/* Feature 6 */}
          <div className="bg-green-50 rounded-lg p-4 shadow-sm">
            <div className="flex items-start flex-row-reverse">
              <div className="w-1/4 ml-4 flex-shrink-0">
                <img src="/8.png" alt="Peak hour performance" className="w-full h-auto rounded" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">Overwhelmed During Busy Hours?</h3>
                <p className="text-sm text-gray-700">AI handles 8,000–12,000 messages daily. It qualifies leads and sends only the best to your team</p>
              </div>
            </div>
          </div>
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

      {/* Use Cases Section */}
      <section id="use-cases" className="w-full max-w-7xl mx-auto items-center justify-center gap-8 px-4 sm:px-8 lg:px-[61px] py-12 sm:py-16 flex flex-col relative"> {/* Added id="use-cases", responsive padding, max-width */}
        {/* Section Header */}
        <div className="w-full max-w-3xl mx-auto text-center mb-8 sm:mb-10 md:mb-12"> {/* Responsive margin */}
          <h2 className="[font-family:'Inter',Helvetica] font-extrabold text-black text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4"> {/* Responsive size, margin */}
            Bring Your Words to Life with AI Voices
          </h2>
          <p className="[font-family:'Inter',Helvetica] font-medium text-gray-600 text-base sm:text-lg leading-relaxed"> {/* Responsive size */}
            Create lifelike speech in any tone, language, or style. Our advanced AI voice technology captures human emotions, inflections, and context, delivering natural and expressive audio for any project.
          </p>
        </div>

        {/* Use Case Cards Grid */}
        <div className="w-full max-w-[1245px] relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-[35px]"> {/* Use grid for responsiveness, adjust gaps */}
            {useCaseCards.map((card) => (
              // Card Container - Moved comments outside the returned JSX element
              <div key={card.id} className="relative w-full aspect-square rounded-lg overflow-hidden shadow-md">
                {/* Conditionally render video or image */}
                {card.image.endsWith('.mp4') ? (
                  <video
                    className="absolute inset-0 w-full h-full object-cover" // Video as background
                    src={card.image}
                    autoPlay
                    loop
                    muted
                    playsInline // Important for mobile playback
                  />
                ) : (
                  <img
                    className="absolute inset-0 w-full h-full object-cover" // Image as background
                    alt={card.title} // Use title for alt text
                    src={card.image}
                  />
                )}
                {/* Text Content Overlay */}
                <div className="absolute inset-0 z-10 p-6 sm:p-8 flex flex-col justify-start bg-gradient-to-t from-black/50 to-transparent"> {/* Added overlay gradient and adjusted padding */}
                  <h3
                    className={`[font-family:'Inter',Helvetica] font-extrabold ${card.textColor} text-2xl sm:text-3xl mb-2 sm:mb-3`} // Responsive size, margin
                  >
                    {card.title}
                  </h3>
                  {card.description && (
                    <p
                      className={`[font-family:'Inter',Helvetica] font-medium ${card.textColor} text-sm sm:text-base leading-relaxed max-w-md opacity-90`} // Responsive size, added opacity
                    >
                      {card.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
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

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center relative py-12 sm:py-16 px-4 sm:px-8"> {/* Added id="testimonials", responsive padding, max-width */}
        <div className="w-full max-w-3xl text-center mb-10 md:mb-12"> {/* Adjusted max-width */}
          <h2 className="[font-family:'Inter',Helvetica] font-extrabold text-[#272727] text-4xl sm:text-5xl md:text-[64px] text-center tracking-[0] leading-tight sm:leading-[70px]"> {/* Responsive size */}
            What Our Happy Client Say
          </h2>
          <p className="text-center [font-family:'Inter',Helvetica] font-medium text-[#272727] text-base sm:text-lg tracking-[0] leading-relaxed sm:leading-[30px] mt-4 sm:mt-6"> {/* Responsive size, leading, margin */}
            Things&nbsp;&nbsp;That Make It The Best Place To Start Trading
          </p>
        </div>

        <Carousel className="w-full max-w-xs sm:max-w-xl md:max-w-4xl lg:max-w-[1330px]"> {/* Responsive max-width */}
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="pl-4 sm:basis-1/2 lg:basis-1/3" // Added pl-4 for spacing
              >
                <Card className="h-auto sm:h-[270px] mt-[30px] rounded-3xl"> {/* Responsive height */}
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <div className="relative">
                      <img
                        className="w-[50px] h-[50px] sm:w-[60px] sm:h-[60px] absolute -top-[50px] sm:-top-[60px] left-1/2 transform -translate-x-1/2" // Responsive size/position
                        alt={testimonial.name}
                        src={testimonial.image}
                      />
                    </div>
                    <div className="flex items-center justify-center mt-4 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <img
                            key={i}
                            className="w-[22px] h-[22px]"
                            alt="Star"
                            src="/star.svg"
                          />
                        ))}
                      </div>
                    </div>
                    <img
                      className="w-[84px] h-[58px] mb-2"
                      alt="Group"
                      src={testimonial.groupImage}
                    />
                    <h3 className="[font-family:'Cabinet_Grotesk-Extrabold',Helvetica] font-normal text-[#060606] text-lg sm:text-xl text-center"> {/* Responsive size */}
                      {testimonial.name}
                    </h3>
                    <p className="[font-family:'Manrope',Helvetica] font-normal text-[#898989] text-base sm:text-lg text-center leading-relaxed sm:leading-[30px] mt-3 sm:mt-4"> {/* Responsive size, leading, margin */}
                      {testimonial.text}
                    </p>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center mt-8 gap-4">
            <CarouselPrevious className="relative static bg-white transform-none rounded-full" />
            <CarouselNext className="relative static bg-[#8479e4] transform-none rounded-full" />
          </div>
        </Carousel>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full max-w-[1440px] py-16"> {/* Original Pricing Section styles */}
        <div className="flex flex-col items-center justify-center gap-8 px-[60px]"> {/* Original Pricing container styles */}
          {/* Updated Pricing Header */}
          <div className="text-center mb-12">
            {/* Updated Pricing Header Copywriting */}
            <h2 className="[font-family:'Inter',Helvetica] font-black text-[#272727] text-4xl sm:text-5xl md:text-[64px] text-center tracking-[0] leading-tight sm:leading-[70px]">
              Find the Right Plan
            </h2>
            <p className="[font-family:'Inter',Helvetica] font-medium text-gray-600 text-lg sm:text-xl mt-4">
              Start with our standard features and explore options for your specific needs.
            </p>
          </div>

          {/* Updated Single Pricing Card Layout */}
          <div className="flex justify-center"> {/* Center the single card */}
            {pricingPlans.map((plan) => ( // Will now only map over one plan
              <Card
                key={plan.id}
                // Use highlighted styles directly as it's the only plan
                className="w-full max-w-md sm:max-w-lg rounded-3xl bg-[#717fe8] text-white shadow-xl"
              >
                <CardContent className="p-8 sm:p-12 md:p-16"> {/* Responsive padding */}
                  <h3
                    className="[font-family:'Inter',Helvetica] font-black text-3xl sm:text-4xl leading-tight mb-4" // Adjusted size, margin
                  >
                    {plan.name}
                  </h3>

                  {/* Updated Price Display */}
                  <div className="mb-8">
                     <p className="text-lg opacity-90">{plan.description}</p>
                     <div className="flex items-baseline gap-x-2 mt-1">
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

                  {/* Updated Button */}
                  <Button
                    className="mt-8 w-full sm:w-auto bg-white text-[#717fe8] hover:bg-gray-100 text-lg font-semibold py-3 px-8 rounded-lg" // Adjusted styles, size, padding
                  >
                    {plan.buttonText}
                  </Button>
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
      <footer className="w-full bg-gray-900 text-gray-300 py-8 sm:py-12 px-4 sm:px-8 mt-12 sm:mt-16"> {/* Responsive padding/margin */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6 md:gap-0"> {/* Added gap, text alignment */}
          {/* Logo and Copyright */}
          <div className="mb-6 md:mb-0"> {/* Removed text alignment here, handled above */}
            <img
              src="/screenshot-2025-03-26-224229-1.png" // Assuming this is the correct logo path
              alt="Vocalx Labs Logo"
              className="h-7 sm:h-8 mb-3 sm:mb-4 mx-auto md:mx-0" // Responsive height/margin
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
          </nav>
        </div>
      </footer>
    </div>
  );
};
