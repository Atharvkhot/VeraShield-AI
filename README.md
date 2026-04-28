# VeraShield AI - MERN Stack Implementation

A multi-modal 'Immunity Layer' for digital truth and student safety that detects Fake News, Deepfakes, and Phishing Links with Explainable AI trust scores.

## 🛡️ Features

- **Multi-Modal Analysis**: Text, URL, and Image content verification
- **AI-Powered Detection**: Google Gemini API integration for intelligent analysis
- **Trust Scoring**: 0-100% trust scores with color-coded risk levels
- **Explainable AI**: Detailed reasoning and evidence tags
- **Disclaimer System**: Built-in accuracy warnings and human verification prompts
- **Real-time Analysis**: Fast processing with confidence intervals
- **Responsive UI**: Modern React frontend with Tailwind CSS

## 🚀 Tech Stack

### Frontend (React)
- React 18
- Tailwind CSS for styling
- Heroicons for UI icons
- Axios for API communication

### Backend (Node.js/Express)
- Express.js server
- MongoDB with Mongoose ODM
- Google Gemini AI API
- Security middleware (Helmet, Rate Limiting)

### Database
- MongoDB for storing analysis results
- TTL indexes for automatic data cleanup
- Optimized queries for performance

## 📦 Installation

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)
- Google Gemini API Key

### Setup Steps

1. **Clone and Install Dependencies**
```bash
cd VeraShild
npm install
cd client && npm install
```

2. **Environment Configuration**
Update `.env` file with your credentials:
```env
GOOGLE_API_KEY=your_gemini_api_key_here
MONGODB_URI=mongodb://localhost:27017/verashield
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

3. **Start MongoDB**
```bash
# For local MongoDB
mongod

# Or use MongoDB Atlas and update MONGODB_URI
```

4. **Run the Application**
```bash
# Start both frontend and backend
npm run dev

# Or start separately:
npm run server  # Backend on port 5000
npm run client  # Frontend on port 3000
```

## 🎯 Usage

### Analyzing Content

1. **Select Content Type**: Choose between Text, URL, or Image
2. **Input Content**: 
   - Text: Paste or type content to analyze
   - URL: Enter suspicious links for phishing detection
   - Image: Upload images (coming soon)
3. **Click "Scan Content"**: Get AI-powered analysis results

### Understanding Results

- **🔴 High Risk (0-30)**: Likely fake, malicious, or highly unreliable
- **🟡 Medium Risk (31-70)**: Suspicious, requires human verification
- **🟢 Low Risk (71-100)**: Generally reliable, but still verify important claims

### API Endpoints

#### POST `/api/analysis/analyze`
```json
{
  "content": "Text or URL to analyze",
  "contentType": "text|url|image"
}
```

#### GET `/api/analysis/history`
Get analysis history with pagination

#### GET `/api/analysis/stats`
Get analysis statistics and category breakdown

## 🧠 AI Analysis Logic

The system uses Google Gemini API with structured prompts to ensure consistent JSON responses:

```json
{
  "is_reliable": boolean,
  "trust_score": integer (0-100),
  "reasoning": ["explanation 1", "explanation 2"],
  "category": "deepfake|phishing|misinformation|reliable|suspicious",
  "confidence": float (0.0-1.0),
  "evidence_tags": ["tag1", "tag2"]
}
```

## 🔒 Security Features

- Rate limiting (100 requests per 15 minutes)
- Helmet.js for security headers
- Input validation and sanitization
- CORS protection
- Automatic data expiration (30 days)

## 📊 Database Schema

### Analysis Collection
```javascript
{
  content: String,
  contentType: String,
  result: {
    is_reliable: Boolean,
    trust_score: Number,
    reasoning: [String],
    category: String,
    confidence: Number,
    evidence_tags: [String]
  },
  metadata: {
    ipAddress: String,
    userAgent: String,
    processingTime: Number,
    apiVersion: String
  },
  createdAt: Date,
  expiresAt: Date
}
```

## 🎨 UI Components

- **ContentAnalyzer**: Main scanning interface
- **ResultDisplay**: Color-coded results with trust scores
- **Disclaimer**: Important accuracy warnings
- **Header**: Navigation and branding

## 🔄 Development Scripts

```bash
npm run dev          # Start both servers
npm run server       # Start backend only
npm run client       # Start frontend only
npm run build        # Build for production
npm run install-all  # Install all dependencies
```

## 🚀 Deployment

### Production Setup
1. Set `NODE_ENV=production`
2. Update `CLIENT_URL` to your domain
3. Use MongoDB Atlas for production database
4. Deploy to platforms like Vercel, Netlify, or AWS

### Environment Variables for Production
```env
GOOGLE_API_KEY=your_production_key
MONGODB_URI=mongodb+srv://...
PORT=5000
NODE_ENV=production
CLIENT_URL=https://yourdomain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

MIT License - see LICENSE file for details

## 🆘 Support

For issues and questions:
- Check the GitHub Issues
- Review the API documentation
- Contact the development team

---

**⚠️ Important**: VeraShield AI is a tool to assist judgment, not replace it. Always verify important information with reliable sources.
