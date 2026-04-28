#!/usr/bin/env python3
"""
Test script for VeraShield AI Gemini API connection
"""

import os
import sys
from api.gemini_client import GeminiClient

def test_gemini_connection():
    """Test the Gemini API connection with sample content"""
    
    print("🔍 VeraShield AI - Testing Gemini API Connection")
    print("=" * 50)
    
    try:
        # Initialize the Gemini client
        client = GeminiClient()
        print("✅ Gemini client initialized successfully")
        
        # Test cases
        test_cases = [
            {
                "content": "Breaking: Scientists discover cure for all cancers using common household ingredient!",
                "type": "text",
                "description": "Fake news test"
            },
            {
                "content": "https://google.com",
                "type": "url", 
                "description": "Legitimate URL test"
            },
            {
                "content": "Click here to claim your $1,000,000 prize - you have 24 hours only!",
                "type": "text",
                "description": "Phishing test"
            }
        ]
        
        for i, test_case in enumerate(test_cases, 1):
            print(f"\n📝 Test {i}: {test_case['description']}")
            print(f"Content: {test_case['content'][:50]}...")
            
            result = client.analyze_content(test_case['content'], test_case['type'])
            
            print(f"🎯 Trust Score: {result['trust_score']}/100")
            print(f"✅ Reliable: {result['is_reliable']}")
            print(f"🏷️  Category: {result['category']}")
            print(f"📊 Confidence: {result['confidence']:.2f}")
            print(f"🔍 Reasoning: {', '.join(result['reasoning'][:2])}")
            print(f"🏷️  Evidence Tags: {', '.join(result['evidence_tags'][:3])}")
            
            # Color coding
            if result['trust_score'] <= 30:
                color = "🔴 RED (High Risk)"
            elif result['trust_score'] <= 70:
                color = "🟡 YELLOW (Medium Risk)"
            else:
                color = "🟢 GREEN (Low Risk)"
            print(f"🎨 Risk Level: {color}")
            
        print("\n🎉 All tests completed successfully!")
        return True
        
    except Exception as e:
        print(f"❌ Error during testing: {str(e)}")
        return False

if __name__ == "__main__":
    success = test_gemini_connection()
    sys.exit(0 if success else 1)
