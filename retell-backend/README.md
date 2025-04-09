# Retell Backend Server

This is a secure backend server for the Retell Web Call integration. It handles token retrieval from the Retell API without exposing the API key in client-side JavaScript.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Start the server:
   ```
   npm start
   ```

   For development with auto-restart:
   ```
   npm run dev
   ```

## API Endpoints

### POST /api/create-web-call

Creates a web call and returns an access token.

**Request:**
```json
{}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "ok"
}
```

## Security Considerations

This server addresses the security concern of exposing the API key in client-side JavaScript by:

1. Keeping the API key on the server side
2. Providing a secure endpoint for the client to request access tokens
3. Implementing proper error handling and logging

## Production Deployment

For production deployment, consider:

1. Using environment variables for API keys:
   ```javascript
   const API_KEY = process.env.RETELL_API_KEY;
   const AGENT_ID = process.env.RETELL_AGENT_ID;
   ```

2. Adding authentication to protect your API:
   ```javascript
   // Example using API key authentication
   app.use((req, res, next) => {
     const apiKey = req.headers['x-api-key'];
     if (!apiKey || apiKey !== process.env.CLIENT_API_KEY) {
       return res.status(401).json({ error: 'Unauthorized' });
     }
     next();
   });
   ```

3. Setting up proper CORS configuration:
   ```javascript
   app.use(cors({
     origin: 'https://your-production-domain.com'
   }));
   ```

4. Implementing rate limiting to prevent abuse
5. Using HTTPS for all communications
6. Setting up proper logging and monitoring