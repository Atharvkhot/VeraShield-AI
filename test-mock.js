require('dotenv').config();
const MockGeminiService = require('./server/services/mockGeminiService');

async function testMockService() {
  console.log('🧪 Testing Mock Gemini Service...');
  
  try {
    const mockService = new MockGeminiService();
    
    // Test cases
    const testCases = [
      { content: "Free winner click here urgent", type: "text" },
      { content: "Please login to verify your account", type: "text" },
      { content: "Breaking shocking conspiracy secret revealed", type: "text" },
      { content: "https://bit.ly/suspicious-link", type: "url" },
      { content: "This is normal content", type: "text" }
    ];
    
    for (const testCase of testCases) {
      console.log(`\n📝 Testing: ${testCase.content}`);
      const result = await mockService.analyzeContent(testCase.content, testCase.type);
      
      console.log(`🎯 Trust Score: ${result.trust_score}/100`);
      console.log(`✅ Reliable: ${result.is_reliable}`);
      console.log(`🏷️ Category: ${result.category}`);
      console.log(`🔍 Reasoning: ${result.reasoning.join(', ')}`);
      
      // Color coding
      if (result.trust_score <= 30) {
        console.log(`🎨 Risk Level: 🔴 HIGH RISK`);
      } else if (result.trust_score <= 70) {
        console.log(`🎨 Risk Level: 🟡 MEDIUM RISK`);
      } else {
        console.log(`🎨 Risk Level: 🟢 LOW RISK`);
      }
    }
    
    console.log('\n✅ Mock service test completed successfully!');
    
  } catch (error) {
    console.error('❌ Mock service test failed:', error);
  }
}

testMockService();
