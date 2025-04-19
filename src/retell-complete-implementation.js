/**
 * Retell Web Call Integration - Complete Implementation
 * 
 * This file provides a complete implementation of the Retell Web Call integration,
 * combining all steps from the PRD into a single file for easier understanding.
 * 
 * Steps implemented:
 * 1. Understand the Approach
 * 2. Set Up the Frontend Environment
 * 3. Translate cURL to JavaScript Fetch
 * 4. Add Call Logic to the "Talk to AI" Button
 * 5. Add Visual Feedback (Animations) to the "Talk to AI" Button
 *
 * Note: Step 6 (Testing) is not included as it's a manual process.
 * Note: Step 7 (Security Considerations) has been removed as requested.
 */

import { RetellWebClient } from 'retell-client-js-sdk';

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

/**
 * Step 3: Translate cURL to JavaScript Fetch
 *
 * This function fetches the access token using the Retell API directly.
 *
 * @returns {Promise<string>} The access token needed to start the call
 */
async function getAccessToken() {
  const response = await fetch('https://api.retellai.com/v2/create-web-call', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer key_6e64edcd7eec2e306be261afe75b',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      agent_id: 'agent_78fb02dd6166b3c1ae0fccbcb5',
    }),
  });
  const data = await response.json();
  return data.access_token;
}

/**
 * Steps 4 & 5: Add Call Logic and Visual Feedback to the "Talk to AI" Button
 * 
 * This function handles starting and ending the call, as well as
 * managing the button state and visual feedback.
 */
async function startCall() {
  const talkButton = document.getElementById('retell-ai-button');
  if (!talkButton) {
    console.error('Talk to AI button not found');
    return;
  }

  // Disable the button and update its text
  talkButton.disabled = true;
  const buttonText = document.getElementById('button-text');
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
  // Find the "Talk to AI" button by ID
  const talkButton = document.getElementById('retell-ai-button');
  
  if (talkButton) {
    // Attach the initial click event to "Talk to AI"
    talkButton.onclick = startCall;
    console.log('Call button initialized successfully');
  } else {
    console.error('Talk to AI button not found');
  }
}

// Initialize the button when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCallButton);

// Export functions for potential use in other files
export {
  getAccessToken,
  startCall,
  initializeCallButton
};