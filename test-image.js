require('dotenv').config();
const MockGeminiService = require('./server/services/mockGeminiService');

async function testImageAnalysis() {
  console.log('🖼️ Testing Image Analysis Functionality...');
  
  try {
    const mockService = new MockGeminiService();
    
    // Mock base64 image data (simulating different sizes)
    const testCases = [
      {
        name: 'Small Image',
        base64: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==', // Very small PNG
        expected: 'small'
      },
      {
        name: 'Medium Image', 
        base64: 'data:image/jpeg;base64,' + 'A'.repeat(50000), // Medium size
        expected: 'medium'
      },
      {
        name: 'Large Image',
        base64: 'data:image/jpeg;base64,' + 'A'.repeat(150000), // Large size
        expected: 'large'
      }
    ];
    
    for (const testCase of testCases) {
      console.log(`\n📸 Testing: ${testCase.name}`);
      console.log(`🎯 Expected: ${testCase.expected}`);
      
      const result = await mockService.analyzeImage(testCase.base64);
      
      console.log(`🔍 Trust Score: ${result.trust_score}/100`);
      console.log(`✅ Reliable: ${result.is_reliable}`);
      console.log(`🏷️ Category: ${result.category}`);
      console.log(`🔍 Reasoning: ${result.reasoning.slice(0, 3).join(', ')}`);
      console.log(`🏷️ Evidence Tags: ${result.evidence_tags.join(', ')}`);
      
      // Color coding
      if (result.trust_score <= 30) {
        console.log(`🎨 Risk Level: 🔴 HIGH RISK`);
      } else if (result.trust_score <= 70) {
        console.log(`🎨 Risk Level: 🟡 MEDIUM RISK`);
      } else {
        console.log(`🎨 Risk Level: 🟢 LOW RISK`);
      }
      
      // Check if detection makes sense
      const isLogical = 
        (testCase.expected === 'small' && result.trust_score <= 40) ||
        (testCase.expected === 'medium' && result.trust_score >= 40) ||
        (testCase.expected === 'large' && result.trust_score <= 30);
      
      console.log(`${isLogical ? '✅' : '❌'} Analysis: ${isLogical ? 'LOGICAL' : 'UNEXPECTED'}`);
    }
    
    console.log('\n✅ Image analysis test completed!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testImageAnalysis();
