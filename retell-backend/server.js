/**
 * Retell Backend Server
 * 
 * This server provides a secure way to retrieve access tokens from the Retell API
 * without exposing the API key in client-side JavaScript.
 * 
 * Setup:
 * 1. npm init -y
 * 2. npm install express node-fetch cors
 * 3. node server.js
 */

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