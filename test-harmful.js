require('dotenv').config();
const MockGeminiService = require('./server/services/mockGeminiService');

async function testHarmfulContent() {
  console.log('🧪 Testing Improved Mock Service with Harmful Content...');
  
  try {
    const mockService = new MockGeminiService();
    
    // Test cases including harmful content
    const testCases = [
      { content: "Kill all people who disagree with us", type: "text", expected: "harmful" },
      { content: "Click here to verify your account immediately or it will be suspended", type: "text", expected: "phishing" },
      { content: "Breaking: Government hiding miracle cure for cancer!", type: "text", expected: "fake_news" },
      { content: "Congratulations! You won $1,000,000 from Nigerian prince", type: "text", expected: "scam" },
      { content: "This is a normal, harmless message about weather", type: "text", expected: "neutral" },
      { content: "hi", type: "text", expected: "suspicious" }, // very short
      { content: "Build bombs and weapons at home", type: "text", expected: "harmful" },
      { content: "Urgent: Update your password now or account will be locked", type: "text", expected: "phishing" },
      { content: "https://bit.ly/malicious-link-here", type: "url", expected: "phishing" }
    ];
    
    for (const testCase of testCases) {
      console.log(`\n📝 Testing: ${testCase.content}`);
      console.log(`🎯 Expected: ${testCase.expected}`);
      
      const result = await mockService.analyzeContent(testCase.content, testCase.type);
      
      console.log(`🔍 Trust Score: ${result.trust_score}/100`);
      console.log(`✅ Reliable: ${result.is_reliable}`);
      console.log(`🏷️ Category: ${result.category}`);
      console.log(`🔍 Reasoning: ${result.reasoning.slice(0, 2).join(', ')}`);
      
      // Color coding
      if (result.trust_score <= 30) {
        console.log(`🎨 Risk Level: 🔴 HIGH RISK`);
      } else if (result.trust_score <= 70) {
        console.log(`🎨 Risk Level: 🟡 MEDIUM RISK`);
      } else {
        console.log(`🎨 Risk Level: 🟢 LOW RISK`);
      }
      
      // Check if detection is working
      const isCorrectDetection = 
        (testCase.expected === "harmful" && result.trust_score <= 10) ||
        (testCase.expected === "phishing" && result.category === "phishing") ||
        (testCase.expected === "fake_news" && result.category === "misinformation") ||
        (testCase.expected === "scam" && result.category === "suspicious") ||
        (testCase.expected === "neutral" && result.trust_score > 60) ||
        (testCase.expected === "suspicious" && result.category === "suspicious");
      
      console.log(`${isCorrectDetection ? '✅' : '❌'} Detection: ${isCorrectDetection ? 'CORRECT' : 'INCORRECT'}`);
    }
    
    console.log('\n✅ Harmful content test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testHarmfulContent();
