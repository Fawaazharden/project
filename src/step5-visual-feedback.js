/**
 * Step 5: Add Visual Feedback (Animations) to the "Talk to AI" Button
 * 
 * This file extends the call logic from Step 4 to include visual feedback
 * for the "Talk to AI" button based on the call state.
 */

import { RetellWebClient } from 'retell-client-js-sdk';
import { getAccessToken } from './step3-fetch-token.js';

// Initialize Retell Web Client with logging configuration
const retellWebClient = new RetellWebClient({
  // Common logging configuration options that might be supported
  logLevel: 'error', // Only show errors, not info or debug messages
  debug: false,      // Disable debug mode
  verbose: false,    // Disable verbose logging
  silent: true,      // Silence non-critical logs
  logging: false     // Disable logging altogether
});

// Suppress all console output from the SDK
(function() {
  // Save original console methods
  const originalMethods = {
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
    debug: console.debug
  };

  // Function to check if a log should be filtered
  const shouldFilter = (args) => {
    const logString = args.map(arg =>
      typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
    ).join(' ');
    
    return (
      logString.includes('retell-client') ||
      logString.includes('silence detected') ||
      logString.includes('publishing track') ||
      logString.includes('web_call_') ||
      logString.includes('disconnect from room') ||
      logString.includes('roomID') ||
      logString.includes('participant: \'client\'')
    );
  };

  // Override all console methods
  for (const method in originalMethods) {
    console[method] = function(...args) {
      if (!shouldFilter(args)) {
        originalMethods[method].apply(console, args);
      }
    };
  }
})();

// Get the "Talk to AI" button
let talkButton;

/**
 * Define the start call function with visual feedback
 * This function is called when the "Talk to AI" button is clicked
 */
async function startCall() {
  if (!talkButton) {
    console.error('Talk to AI button not found');
    return;
  }

  // Disable the button and update its text
  talkButton.disabled = true;
  const buttonText = talkButton.querySelector('span');
  if (buttonText) {
    buttonText.textContent = 'Starting...';
  }
  
  // Add the 'starting' class for visual feedback
  talkButton.classList.add('starting');

  try {
    // Fetch the access token
    const accessToken = await getAccessToken();

    if (accessToken) {
      // Start the call
      await retellWebClient.startCall({ accessToken });
      
      // Update button text and state
      if (buttonText) {
        buttonText.textContent = 'End Call';
      }
      
      // Remove 'starting' class and add 'ongoing' class for visual feedback
      talkButton.classList.remove('starting');
      talkButton.classList.add('ongoing');
      talkButton.disabled = false;

      // Switch "Talk to AI" button to end call
      talkButton.onclick = () => {
        // Stop the call
        retellWebClient.stopCall();
        
        // Reset button text and click handler
        if (buttonText) {
          buttonText.textContent = 'Talk to AI';
        }
        
        // Remove 'ongoing' class for visual feedback
        talkButton.classList.remove('ongoing');
        talkButton.onclick = startCall;
      };
    } else {
      throw new Error('No access token received');
    }
  } catch (error) {
    console.error('Error starting call:', error);
    
    // Update button to show error state
    if (buttonText) {
      buttonText.textContent = 'Error - Try Again';
    }
    
    // Remove 'starting' class and add 'error' class for visual feedback
    talkButton.classList.remove('starting');
    talkButton.classList.add('error');
    talkButton.disabled = false;
    
    // Set a timeout to remove the error class after 3 seconds
    setTimeout(() => {
      talkButton.classList.remove('error');
    }, 3000);
    
    talkButton.onclick = startCall; // Reset to start call
  }
}

/**
 * Initialize the button click event
 * This function should be called when the DOM is loaded
 */
function initializeCallButton() {
  // Find the "Talk to AI" button
  talkButton = document.querySelector('.ai-button');
  
  if (talkButton) {
    // Attach the initial click event to "Talk to AI"
    talkButton.onclick = startCall;
    console.log('Call button with visual feedback initialized successfully');
  } else {
    console.error('Talk to AI button not found');
  }
}

// Initialize the button when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCallButton);

// Export functions for potential use in other files
export { startCall, initializeCallButton };