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
 * 7. Security Considerations
 * 
 * Note: Step 6 (Testing) is not included as it's a manual process.
 */

import { RetellWebClient } from 'retell-client-js-sdk';

// Initialize Retell Web Client
const retellWebClient = new RetellWebClient();

/**
 * Step 3: Translate cURL to JavaScript Fetch
 * 
 * This function fetches the access token using the Retell API directly.
 * Note: This approach exposes the API key in client-side JavaScript,
 * which is not recommended for production. See the secure implementation below.
 * 
 * @returns {Promise<string>} The access token needed to start the call
 */
async function getAccessTokenDirect() {
  const response = await fetch('https://api.retellai.com/v2/create-web-call', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer key_6e64edcd7eec2e306be261afe75b',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      agent_id: 'agent_7d5988ea942f6cd79ab355a7e0',
    }),
  });
  const data = await response.json();
  return data.access_token;
}

/**
 * Step 7: Security Considerations
 * 
 * This function fetches the access token from a secure backend server
 * instead of directly calling the Retell API. This keeps the API key
 * secure on the server side.
 * 
 * @returns {Promise<string>} The access token needed to start the call
 */
async function getAccessTokenSecure() {
  try {
    const response = await fetch('http://localhost:3000/api/create-web-call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (!response.ok) {
      throw new Error(`Server responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.access_token) {
      throw new Error('No access token received from server');
    }
    
    return data.access_token;
  } catch (error) {
    console.error('Error getting access token from backend:', error);
    throw error;
  }
}

/**
 * Use the secure implementation by default
 * Set this to false to use the direct implementation for testing
 */
const USE_SECURE_IMPLEMENTATION = true;

/**
 * Get access token using either the secure or direct implementation
 */
async function getAccessToken() {
  if (USE_SECURE_IMPLEMENTATION) {
    return getAccessTokenSecure();
  } else {
    return getAccessTokenDirect();
  }
}

/**
 * Steps 4 & 5: Add Call Logic and Visual Feedback to the "Talk to AI" Button
 * 
 * This function handles starting and ending the call, as well as
 * managing the button state and visual feedback.
 */
async function startCall() {
  const talkButton = document.querySelector('.ai-button');
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
  const talkButton = document.querySelector('.ai-button');
  
  if (talkButton) {
    // Attach the initial click event to "Talk to AI"
    talkButton.onclick = startCall;
    console.log('Call button initialized successfully');
    
    // Log which implementation is being used
    if (USE_SECURE_IMPLEMENTATION) {
      console.log('Using secure implementation (backend server)');
    } else {
      console.log('Using direct implementation (not recommended for production)');
    }
  } else {
    console.error('Talk to AI button not found');
  }
}

// Initialize the button when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCallButton);

// Export functions for potential use in other files
export {
  getAccessToken,
  getAccessTokenDirect,
  getAccessTokenSecure,
  startCall,
  initializeCallButton
};