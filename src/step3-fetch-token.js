/**
 * Step 3: Translate cURL to JavaScript Fetch
 * 
 * This file demonstrates how to translate the provided cURL command to JavaScript fetch
 * for retrieving an access token from the Retell API.
 */

/**
 * Function to fetch the access token from Retell API
 * 
 * This is the JavaScript equivalent of the following cURL command:
 * 
 * curl --request POST \
 *   --url https://api.retellai.com/v2/create-web-call \
 *   --header 'Authorization: Bearer key_6e64edcd7eec2e306be261afe75b' \
 *   --header 'Content-Type: application/json' \
 *   --data '{
 *   "agent_id": "agent_7d5988ea942f6cd79ab355a7e0"
 * }'
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

// Example usage:
// getAccessToken().then(token => {
//   console.log('Access token:', token);
//   // Use the token to start a call with the Retell Web Client
// }).catch(error => {
//   console.error('Error getting access token:', error);
// });

export { getAccessToken };