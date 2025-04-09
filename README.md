# Retell Web Call Integration

This project implements the Retell Web Call functionality for the "Talk to AI" button on the landing page. When the button is clicked, it initiates a web call using the Retell API, with visual feedback for the user.

## Implementation Overview

The implementation follows the step-by-step guide from the PRD:

1. **Understand the Approach**: The "Talk to AI" button triggers a direct API call to Retell's API to get an access token, which is then used to start a web call.

2. **Set Up the Frontend Environment**: Added the Retell Client SDK and verified the "Talk to AI" button.

3. **Translate cURL to JavaScript Fetch**: Implemented the JavaScript equivalent of the cURL command to fetch the access token.

4. **Add Call Logic to the "Talk to AI" Button**: Implemented the logic to start and end calls when the button is clicked.

5. **Add Visual Feedback**: Added CSS classes and animations to show different button states.

Note: Step 7 (Security Considerations) has been removed as requested.

## Project Structure
- **src/**: Contains the frontend implementation
  - **src/step3-fetch-token.js**: Token retrieval implementation
  - **src/step4-call-logic.js**: Call logic implementation
  - **src/step5-visual-feedback.js**: Visual feedback implementation
  - **src/retell-complete-implementation.js**: Combined implementation of Steps 1-5
  - **retell-backend/README.md**: Backend documentation

## Running the Project

1. Install dependencies:
   ```
   npm install
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. Open the landing page in your browser and click the "Talk to AI" button.

## Implementation Notes

- The project uses a direct implementation that calls the Retell API from the client-side
- This approach is suitable for development and testing
- The console logging from the Retell SDK has been reduced using configuration options and filtering

## Security Considerations

- Note: Step 7 (Security Considerations) has been removed as requested
- The current implementation exposes the API key in client-side JavaScript, which is not recommended for production
- For a production environment, consider implementing a backend server to handle token retrieval securely

## Additional Resources

- [Retell API Documentation](https://docs.retellai.com/)
- [Retell Client SDK Documentation](https://www.npmjs.com/package/retell-client-js-sdk)