// Simple Gemini wrapper
let client;
let model;

const init = () => {
  try {
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const apiKey = process.env.GEMINI_API_KEY;
    const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-pro';
    if (!apiKey) return;
    client = new GoogleGenerativeAI(apiKey);
    model = client.getGenerativeModel({ model: modelName });
  } catch (e) {
    // SDK not installed or other init issue; we'll fall back gracefully
  }
};

init();

// messages: array of { role: 'system'|'user'|'assistant', text: string }
async function generateAIResponse(messages) {
  // Fallback if SDK missing or key not set
  if (!model) {
    return 'AI is unavailable right now, please try later.';
  }

  // Convert to the format Gemini expects
  const history = messages.map(m => ({ role: m.role === 'assistant' ? 'model' : m.role, parts: [{ text: m.text.slice(0, 300) }] }));
  try {
    const response = await model.generateContent({ contents: history });
    const text = response?.response?.text?.() || response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || 'I could not generate a response at this moment.';
  } catch (err) {
    return 'AI is unavailable right now, please try later.';
  }
}

module.exports = { generateAIResponse };


