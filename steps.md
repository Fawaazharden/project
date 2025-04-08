

**Document Purpose:**  
This PRD provides a step-by-step guide for a junior developer to integrate Retell Web Call functionality into an existing landing page. When the "Talk to AI" button is clicked, it will initiate a web call using the provided cURL command to fetch the access token directly from the Retell API, with visual feedback for the user.

---

### Overview
- **Feature Name:** Retell Web Call Integration with Direct API Token Retrieval  
- **Objective:** Enable users to start an AI-powered web call by clicking the "Talk to AI" button on the landing page, fetching the access token via the Retell API.  
- **Target Audience:** Landing page visitors interacting with the AI agent.  
- **Current State:** The landing page has a "Talk to AI" button with no call functionality.

---

### Requirements
1. **Functional Requirements:**
   - On clicking the "Talk to AI" button, fetch the access token using the Retell API (`https://api.retellai.com/v2/create-web-call`).
   - Use the token to start a web call with the `retell-client-js-sdk`.
   - Update the "Talk to AI" button’s text and style to reflect call states (e.g., starting, ongoing, ended).
   - Allow ending the call and handle errors gracefully.

2. **Non-Functional Requirements:**
 
   - Ensure compatibility with the existing landing page.
   - Call initiation should occur within 2-3 seconds under normal conditions.

3. **Assumptions:**
   - The junior developer knows basic JavaScript, HTML, and CSS.
   - The landing page uses plain HTML/JavaScript or a framework like React.
   - The provided API key (`key_6e64edcd7eec2e306be261afe75b`) and agent ID (`agent_7d5988ea942f6cd79ab355a7e0`) are valid.

---

### Step-by-Step Implementation Guide

#### Step 1: Understand the Approach
- **What’s Happening:**
  - The "Talk to AI" button triggers a direct API call to `https://api.retellai.com/v2/create-web-call` using the provided cURL command’s equivalent in JavaScript.
  - The `retell-client-js-sdk` starts the call in the browser.
- **Why This Way?**
  - Simplifies setup by avoiding a custom backend, though it exposes the API key client-side (not ideal for production—see Step 7).

#### Step 2: Set Up the Frontend Environment
- **Goal:** Prepare the landing page to use the Retell client SDK with the "Talk to AI" button.
- **Tools Needed:** `retell-client-js-sdk`, existing landing page code.
- **Instructions:**
  1. **Add the Retell Client SDK:**
     - For plain HTML, add this in the `<head>`:
       ```html
       <script src="https://unpkg.com/retell-client-js-sdk@latest/dist/retell-client-js-sdk.umd.js"></script>
       ```
     - For npm-based projects (e.g., React):
       - Run: `npm install retell-client-js-sdk`.
       - Import it: `import { RetellWebClient } from 'retell-client-js-sdk';`.
  2. **Verify the "Talk to AI" Button:**
     - Ensure your HTML has the button, e.g., `<button id="talk-to-ai">Talk to AI</button>`.

#### Step 3: Translate cURL to JavaScript Fetch
- **Goal:** Fetch the access token using the Retell API when the "Talk to AI" button is clicked.
- **Instructions:**
  - The provided cURL command:
    ```bash
    curl --request POST \
      --url https://api.retellai.com/v2/create-web-call \
      --header 'Authorization: Bearer key_6e64edcd7eec2e306be261afe75b' \
      --header 'Content-Type: application/json' \
      --data '{
      "agent_id": "agent_7d5988ea942f6cd79ab355a7e0"
    }'
    ```
  - Equivalent JavaScript `fetch`:
    ```javascript
    async function getAccessToken() {
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
    ```
- **Notes:**
  - This returns the `access_token` needed to start the call.

#### Step 4: Add Call Logic to the "Talk to AI" Button
- **Goal:** Start the web call when the "Talk to AI" button is clicked and manage its state.
- **Instructions:**
  - Add this code in a `<script>` tag (for plain HTML) or your JS file:
    ```javascript
    // Initialize Retell Web Client
    const retellWebClient = new RetellWebClient();

    // Get the "Talk to AI" button
    const talkButton = document.getElementById('talk-to-ai');

    // Define the start call function
    async function startCall() {
      talkButton.disabled = true;
      talkButton.textContent = 'Starting...';

      try {
        // Fetch the access token
        const accessToken = await getAccessToken();

        if (accessToken) {
          // Start the call
          await retellWebClient.startCall({ accessToken });
          talkButton.textContent = 'End Call';
          talkButton.disabled = false;

          // Switch "Talk to AI" button to end call
          talkButton.onclick = () => {
            retellWebClient.stopCall();
            talkButton.textContent = 'Talk to AI';
            talkButton.onclick = startCall; // Reset to start call
          };
        } else {
          throw new Error('No access token received');
        }
      } catch (error) {
        console.error('Error starting call:', error);
        talkButton.textContent = 'Error - Try Again';
        talkButton.disabled = false;
        talkButton.onclick = startCall; // Reset to start call
      }
    }

    // Attach the initial click event to "Talk to AI"
    talkButton.onclick = startCall;

    // Function to fetch the access token (from Step 3)
    async function getAccessToken() {
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
    ```

#### Step 5: Add Visual Feedback (Animations) to the "Talk to AI" Button
- **Goal:** Show call states visually using CSS on the "Talk to AI" button.
- **Instructions:**
  1. **Add CSS:**
     - In your CSS file or `<style>` tag:
       ```css
       #talk-to-ai.starting {
         opacity: 0.7;
         transition: opacity 0.5s;
       }
       #talk-to-ai.ongoing {
         background-color: #28a745; /* Green */
         color: white;
       }
       #talk-to-ai.error {
         background-color: #dc3545; /* Red */
         color: white;
       }
       ```
  2. **Update JavaScript with Classes:**
     - Modify the `startCall` function:
       ```javascript
       async function startCall() {
         talkButton.disabled = true;
         talkButton.textContent = 'Starting...';
         talkButton.classList.add('starting');

         try {
           const accessToken = await getAccessToken();

           if (accessToken) {
             await retellWebClient.startCall({ accessToken });
             talkButton.textContent = 'End Call';
             talkButton.classList.remove('starting');
             talkButton.classList.add('ongoing');
             talkButton.disabled = false;

             talkButton.onclick = () => {
               retellWebClient.stopCall();
               talkButton.textContent = 'Talk to AI';
               talkButton.classList.remove('ongoing');
               talkButton.onclick = startCall;
             };
           } else {
             throw new Error('No access token');
           }
         } catch (error) {
           console.error('Error:', error);
           talkButton.textContent = 'Error - Try Again';
           talkButton.classList.remove('starting');
           talkButton.classList.add('error');
           talkButton.disabled = false;
           talkButton.onclick = startCall;
         }
       }
       ```

#### Step 6: Test the "Talk to AI" Button
- **Instructions:**
  1. Open your landing page in a browser.
  2. Click the "Talk to AI" button:
     - It should change to "Starting...", then "End Call" when the call starts.
     - Click "End Call" to stop and revert to "Talk to AI".
     - If it fails, it should show "Error - Try Again".
  3. **Debugging:**
     - Open the browser console (F12) to check for errors (e.g., network issues, invalid API key).
     - Verify the API key and agent ID are correct.

#### Step 7: Security Considerations (Important!)
- **Issue:** The API key (`key_6e64edcd7eec2e306be261afe75b`) is exposed in the client-side JavaScript, which is insecure for production.
- **Recommendation:**
  - Move the token retrieval to a backend server (e.g., Node.js with Express):
    ```javascript
    const express = require('express');
    const fetch = require('node-fetch'); // Install with `npm install node-fetch`

    const app = express();
    app.use(express.json());

    app.post('/api/create-web-call', async (req, res) => {
      const response = await fetch('https://api.retellai.com/v2/create-web-call', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer key_6e64edcd7eec2e306be261afe75b',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ agent_id: 'agent_7d5988ea942f6cd79ab355a7e0' }),
      });
      const data = await response.json();
      res.json({ access_token: data.access_token });
    });

    app.listen(3000, () => console.log('Server on http://localhost:3000'));
    ```
  - Update `getAccessToken` to call the backend:
    ```javascript
    async function getAccessToken() {
      const response = await fetch('http://localhost:3000/api/create-web-call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      return data.access_token;
    }
    ```
  - Use the client-side approach for testing, but switch to a backend for production.


### Success Criteria
- Clicking the "Talk to AI" button starts the web call with visual feedback.
- The call can be ended, and the "Talk to AI" button resets.
- Errors are displayed without breaking the page.
