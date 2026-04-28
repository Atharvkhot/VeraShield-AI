require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function checkAvailableModels() {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    
    console.log('🔍 Checking available models for API key...');
    
    // Try different model variations
    const models = [
      'gemini-1.5-flash',
      'gemini-1.5-pro', 
      'gemini-pro',
      'gemini-pro-latest',
      'gemini-1.5-flash-latest',
      'text-bison-001',
      'chat-bison-001'
    ];
    
    for (const modelName of models) {
      try {
        console.log(`\n🧪 Testing model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent('Hello');
        const response = await result.response;
        console.log(`✅ ${modelName} WORKS! Response: ${response.text().slice(0, 50)}...`);
        return modelName; // Return the first working model
      } catch (error) {
        console.log(`❌ ${modelName} failed: ${error.message.split(',')[0]}`);
      }
    }
    
    console.log('\n❌ No working models found. API key may have issues.');
    
  } catch (error) {
    console.error('❌ Error checking models:', error.message);
  }
}

checkAvailableModels();
