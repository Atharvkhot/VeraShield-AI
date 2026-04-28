require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testSimpleGemini() {
  try {
    console.log('🔑 Testing simple Gemini API connection...');
    
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    
    // Try the most basic model approach
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    
    const result = await model.generateContent('Hello, please respond with "API working"');
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ Gemini API Response:', text);
    console.log('🎉 Real Gemini API is working!');
    
  } catch (error) {
    console.error('❌ Gemini API Error:', error.message);
    
    if (error.message.includes('quota')) {
      console.log('💡 Solution: Enable billing in Google Cloud Console');
    } else if (error.message.includes('404')) {
      console.log('💡 Solution: Try different model name or check API version');
    }
  }
}

testSimpleGemini();
