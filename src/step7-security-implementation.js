/**
 * Step 7: Security Considerations Implementation
 * 
 * This file provides a complete implementation for addressing the security concerns
 * related to exposing the API key in client-side JavaScript. It includes:
 * 
 * 1. A Node.js Express server implementation for token retrieval
 * 2. Updated client-side code that calls this backend server
 * 3. Instructions for setting up and using this secure approach
 */

/**
 * PART 1: BACKEND SERVER IMPLEMENTATION
 * 
 * Save this code to a file named 'server.js' in a separate directory (e.g., 'retell-backend')
 * and run it with Node.js.
 * 
 * Prerequisites:
 * - Node.js installed
 * - Run 'npm init -y' to create a package.json file
 * - Run 'npm install express node-fetch cors' to install dependencies
 */

/*
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for client-side requests
app.use(cors());
app.use(express.json());

// API endpoint for creating a web call and returning the access token
app.post('/api/create-web-call', async (req, res) => {
  try {
    // Make request to Retell API
    const response = await fetch('https://api.retellai.com/v2/create-web-call', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer key_6e64edcd7eec2e306be261afe75b',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ agent_id: 'agent_7d5988ea942f6cd79ab355a7e0' }),
    });
    
    // Parse response
    const data = await response.json();
    
    // Check if we got an access token
    if (data.access_token) {
      res.json({ access_token: data.access_token });
    } else {
      console.error('No access token in response:', data);
      res.status(500).json({ error: 'Failed to get access token from Retell API' });
    }
  } catch (error) {
    console.error('Error calling Retell API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Secure token server running on http://localhost:${PORT}`);
  console.log(`Use /api/create-web-call endpoint to get access tokens securely`);
});
*/

/**
 * PART 2: UPDATED CLIENT-SIDE CODE
 * 
 * This is an updated version of the getAccessToken function that calls the backend
 * server instead of directly calling the Retell API.
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
 * Get access token from the backend server
 * This function calls our secure backend instead of directly calling the Retell API
 * 
 * @returns {Promise<string>} The access token needed to start the call
 */
async function getAccessToken() {
  try {
    const response = await fetch('http://localhost:3000/api/create-web-call', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      // You can add additional parameters here if needed
      // body: JSON.stringify({ /* any additional params */ }),
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
 * Start a call using the secure token retrieval method
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
    // Fetch the access token from our secure backend
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
 */
function initializeCallButton() {
  // Find the "Talk to AI" button
  const talkButton = document.querySelector('.ai-button');
  
  if (talkButton) {
    // Attach the initial click event to "Talk to AI"
    talkButton.onclick = startCall;
    console.log('Call button initialized successfully with secure token retrieval');
  } else {
    console.error('Talk to AI button not found');
  }
}

// Initialize the button when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeCallButton);

/**
 * PART 3: SETUP INSTRUCTIONS
 * 
 * To use this secure implementation:
 * 
 * 1. Create a new directory for the backend server:
 *    mkdir retell-backend
 *    cd retell-backend
 * 
 * 2. Initialize a new Node.js project:
 *    npm init -y
 * 
 * 3. Install required dependencies:
 *    npm install express node-fetch cors
 * 
 * 4. Create a server.js file with the backend code from PART 1
 *    (uncomment the code and save it to retell-backend/server.js)
 * 
 * 5. Start the backend server:
 *    node server.js
 * 
 * 6. Update your frontend code to use the secure getAccessToken function from PART 2
 * 
 * 7. Test the implementation by clicking the "Talk to AI" button
 * 
 * Note: For production, you should:
 * - Host the backend on a secure server with HTTPS
 * - Use environment variables for API keys
 * - Implement proper error handling and logging
 * - Add authentication to protect your backend API
 */

// Export functions for potential use in other files
export { getAccessToken, startCall, initializeCallButton };