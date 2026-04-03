# Glassic - AI Voice Agent Platform

A React-based AI voice agent platform with Anthropic Claude integration and ElevenLabs text-to-speech.

## Setup Instructions

### 1. Frontend Setup
```bash
npm install
npm run dev
```

### 2. Backend Setup
```bash
cd backend
npm install
```

### 3. Environment Variables
Create a `.env` file in the `backend` directory:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
PORT=3001
```

### 4. Running the Application
1. Start the backend server:
```bash
cd backend
npm start
```

2. In a separate terminal, start the frontend:
```bash
npm run dev
```

3. Open http://localhost:5173 in your browser

### API Keys
- **Anthropic API Key**: Get from https://console.anthropic.com/
- **ElevenLabs API Key**: Get from https://elevenlabs.io/

## Architecture
- **Frontend**: React with Vite
- **Backend**: Express.js proxy server
- **AI**: Anthropic Claude for conversations
- **TTS**: ElevenLabs for voice synthesis

## CORS Fix
The backend proxy server resolves CORS issues by handling API calls server-side instead of directly from the browser.