require('dotenv').config();
const GeminiService = require('./server/services/geminiService');

async function testGeminiAPI() {
  console.log('🔍 Testing Gemini API Connection...');
  
  try {
    const geminiService = new GeminiService();
    console.log('✅ Gemini service initialized successfully');
    
    // Test with simple text
    const testContent = "This is a test message for verification.";
    console.log('📝 Testing content analysis...');
    
    const result = await geminiService.analyzeContent(testContent, 'text');
    
    console.log('🎯 Analysis Result:');
    console.log(`Trust Score: ${result.trust_score}/100`);
    console.log(`Reliable: ${result.is_reliable}`);
    console.log(`Category: ${result.category}`);
    console.log(`Confidence: ${result.confidence}`);
    console.log(`Reasoning: ${result.reasoning.slice(0, 2).join(', ')}`);
    
    console.log('✅ API test completed successfully!');
    
  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
    console.error('Full error:', error);
  }
}

testGeminiAPI();
