import React, { useState, useEffect } from 'react';

export const ContactUs = (): JSX.Element => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCalendlyLoading, setIsCalendlyLoading] = useState(false);

  // Basic submit handler - prevents default and logs.
  // Add actual form submission logic here (e.g., API call).sss
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission
    console.log('Form submitted');
    // Placeholder for actual submission logic
    // alert('Form submitted! (Placeholder)'); // Simple feedback - replaced by showing Calendly
    setIsSubmitted(true);
    setIsCalendlyLoading(true);
  };

  // Effect to load Calendly script when the component mounts or isSubmitted changes
  // This ensures the script is loaded only when needed and re-initializes the widget if necessary.
  useEffect(() => {
    if (isSubmitted) {
      const scriptId = 'calendly-widget-script';
      // Check if script already exists
      if (document.getElementById(scriptId)) {
        // If script exists, potentially re-initialize Calendly if needed
        // (window as any).Calendly?.initInlineWidgets(); // Uncomment if re-initialization is necessary
        setIsCalendlyLoading(false);
        return;
      }

      const script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      
      // Add event listener to detect when Calendly is loaded
      script.onload = () => {
        // Give a small delay to allow Calendly to initialize
        setTimeout(() => {
          setIsCalendlyLoading(false);
        }, 1000);
      };
      
      document.body.appendChild(script);

      // Cleanup function to remove the script when the component unmounts
      // or if isSubmitted becomes false again
      return () => {
        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
          document.body.removeChild(existingScript);
        }
        // Also remove any Calendly badges that might persist
        const badges = document.querySelectorAll('.calendly-badge-widget');
        badges.forEach(badge => badge.remove());
        const popups = document.querySelectorAll('.calendly-popup-content');
        popups.forEach(popup => popup.remove());
      };
    }
  }, [isSubmitted]);

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mb-4"></div>
      <p className="text-gray-700 text-lg">Loading calendar...</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      {!isSubmitted ? (
        <>
          <h1 className="text-4xl font-bold mb-6">Contact Us</h1>
          <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
            We'd love to hear from you! Please reach out with any questions or inquiries.
          </p>
          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
              <input type="text" id="name" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input type="email" id="email" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">Message</label>
              <textarea id="message" rows={4} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"></textarea>
            </div>
            <div className="flex items-center justify-center">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                Send Message
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold mb-4">Thank You!</h2>
          <p className="text-lg text-gray-700 mb-8 text-center max-w-2xl">
            Your message has been sent. Please book a meeting with us below.
          </p>
          
          {/* Show loading spinner while Calendly is loading */}
          {isCalendlyLoading && <LoadingSpinner />}
          
          {/* Calendly inline widget begin */}
          {/* Added w-full and max-w-4xl for better responsiveness */}
          <div
            className={`calendly-inline-widget w-full max-w-4xl ${isCalendlyLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}
            data-url="https://calendly.com/danielgrayson087/30min?hide_event_type_details=1&hide_gdpr_banner=1"
            style={{ minWidth: '320px', height: '700px' }}
          ></div>
          {/* Script is now loaded via useEffect */}
          {/* Calendly inline widget end */}
        </>
      )}
    </div>
  );
};