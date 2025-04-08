/**
 * Step 4: Add Call Logic to the "Talk to AI" Button
 * 
 * This file implements the call logic for the "Talk to AI" button.
 * It handles starting and ending the call, as well as managing the button state.
 */

import { RetellWebClient } from 'retell-client-js-sdk';
import { getAccessToken } from './step3-fetch-token.js';

// Initialize Retell Web Client
const retellWebClient = new RetellWebClient();

// Get the "Talk to AI" button
let talkButton;

/**
 * Define the start call function
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
      talkButton.disabled = false;

      // Switch "Talk to AI" button to end call
      talkButton.onclick = () => {
        // Stop the call
        retellWebClient.stopCall();
        
        // Reset button text and click handler
        if (buttonText) {
          buttonText.textContent = 'Talk to AI';
        }
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
    talkButton.disabled = false;
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
    console.log('Call button initialized successfully');
  } else {
    console.error('Talk to AI button not found');
  }
}

// Initialize the button when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCallButton);

// Export functions for potential use in other files
export { startCall, initializeCallButton };