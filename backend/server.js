const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  const hasApiKey = !!process.env.GROQ_API_KEY;
  res.json({ 
    status: 'ok', 
    apiKeyConfigured: hasApiKey,
    timestamp: new Date().toISOString()
  });
});

// Groq API proxy endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, system, model = 'mixtral-8x7b-32768', max_tokens = 200 } = req.body;

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ error: 'GROQ_API_KEY not configured' });
    }

    const fetch = (await import('node-fetch')).default;

    console.log('[Groq API Request]', {
      model,
      messagesCount: messages?.length,
      hasSystem: !!system,
      apiKeyPrefix: process.env.GROQ_API_KEY?.substring(0, 8) + '...'
    });

    // Add system message to messages array if provided
    let groqMessages = messages;
    if (system) {
      groqMessages = [{ role: 'system', content: system }, ...messages];
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model,
        max_tokens,
        messages: groqMessages
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('[Groq Error]', {
        status: response.status,
        statusText: response.statusText,
        error: data
      });
      return res.status(response.status).json({ 
        error: 'Failed to process request',
        details: data?.error?.message || data?.error?.type || 'Unknown error'
      });
    }

    console.log('[Groq Success]', {
      status: response.status,
      responseLength: data.choices?.[0]?.message?.content?.length
    });

    // Convert Groq response format to Anthropic-like format for frontend compatibility
    const anthropicFormat = {
      content: [{
        type: 'text',
        text: data.choices?.[0]?.message?.content || ''
      }]
    };

    res.json(anthropicFormat);
  } catch (error) {
    console.error('[Backend Error]', error);
    res.status(500).json({ error: 'Failed to process request', details: error.message });
  }
});

// ElevenLabs TTS proxy endpoint
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voice_id = '21m00Tcm4TlvDq8ikWAM' } = req.body;

    if (!process.env.ELEVENLABS_API_KEY) {
      return res.status(500).json({ error: 'ELEVENLABS_API_KEY not configured' });
    }

    const fetch = (await import('node-fetch')).default;

    console.log('[TTS Request]', { textLength: text?.length, voice_id });

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': process.env.ELEVENLABS_API_KEY
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75
        }
      })
    });

    if (!response.ok) {
      const data = await response.json();
      console.error('[ElevenLabs Error]', {
        status: response.status,
        error: data
      });
      return res.status(response.status).json({ 
        error: 'Failed to generate speech',
        details: data?.detail || 'Unknown error'
      });
    }

    const audioBuffer = await response.arrayBuffer();
    console.log('[TTS Success]', { audioSize: audioBuffer.byteLength });
    
    res.set('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(audioBuffer));
  } catch (error) {
    console.error('[TTS Error]', error);
    res.status(500).json({ error: 'Failed to generate speech', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🎙️  Backend Server Started           ║
║   http://localhost:${PORT}                  ║
║   Using: Groq API                      ║
╚════════════════════════════════════════╝
  `);
  console.log('✓ Groq API Key:', process.env.GROQ_API_KEY ? '✓ Configured' : '✗ Missing');
  console.log('✓ ElevenLabs API Key:', process.env.ELEVENLABS_API_KEY ? '✓ Configured' : '✗ Missing');
  console.log('\nAvailable endpoints:');
  console.log('  POST /api/chat - Chat with AI');
  console.log('  POST /api/tts  - Text-to-speech');
  console.log('  GET  /health  - Health check');
});