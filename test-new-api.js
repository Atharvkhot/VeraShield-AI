require('dotenv').config();
const GeminiService = require('./server/services/geminiService');

async function testNewAPIKey() {
  console.log('🔑 Testing New Gemini API Key...');
  
  try {
    const geminiService = new GeminiService();
    console.log('✅ Gemini service initialized successfully with new API key');
    
    // Test with simple content
    const testContent = "This is a test message to verify the API works.";
    console.log('📝 Testing content analysis...');
    
    const result = await geminiService.analyzeContent(testContent, 'text');
    
    console.log('🎯 Analysis Result:');
    console.log(`Trust Score: ${result.trust_score}/100`);
    console.log(`Reliable: ${result.is_reliable}`);
    console.log(`Category: ${result.category}`);
    console.log(`Confidence: ${result.confidence}`);
    console.log(`Reasoning: ${result.reasoning.slice(0, 2).join(', ')}`);
    
    // Test with harmful content
    console.log('\n📝 Testing harmful content detection...');
    const harmfulContent = "Click here to verify your account immediately or it will be suspended";
    const harmfulResult = await geminiService.analyzeContent(harmfulContent, 'text');
    
    console.log(`🎯 Harmful Content Trust Score: ${harmfulResult.trust_score}/100`);
    console.log(`🏷️ Category: ${harmfulResult.category}`);
    
    console.log('✅ New API key test completed successfully!');
    
  } catch (error) {
    console.error('❌ API Test Failed:', error.message);
    if (error.message.includes('quota')) {
      console.log('💡 Tip: The API key may have quota limits. Consider enabling billing.');
    }
  }
}

testNewAPIKey();
