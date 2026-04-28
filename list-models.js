require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    
    // Get the default model - this should work
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    console.log('Testing with gemini-1.5-flash...');
    const result = await model.generateContent('Hello, just say "API working"');
    const response = await result.response;
    console.log('Response:', response.text());
    
  } catch (error) {
    console.error('Error details:', error.message);
    
    // Try alternative model names
    const models = [
      'gemini-1.5-pro',
      'gemini-1.5-flash',
      'gemini-pro',
      'gemini-pro-latest'
    ];
    
    for (const modelName of models) {
      try {
        console.log(`\nTrying model: ${modelName}`);
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Test');
        console.log(`✅ ${modelName} works!`);
        break;
      } catch (e) {
        console.log(`❌ ${modelName} failed: ${e.message}`);
      }
    }
  }
}

listModels();
