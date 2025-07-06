# Resume Analyzer & Maker

A modern, AI-powered resume builder and analyzer built with Next.js, Python FastAPI, and MongoDB. This application helps users create professional resumes and provides detailed analysis with actionable feedback to improve their job application success.

## 🚀 Features

### Resume Analyzer
- 📄 Upload resumes in PDF, DOCX, or text formats
- 🤖 AI-powered analysis using NLP techniques
- 📊 Detailed feedback on content, formatting, and structure
- 🎯 ATS (Applicant Tracking System) compatibility scoring
- 🔍 Keyword extraction and optimization suggestions
- 💼 Industry-specific recommendations

### Resume Builder
- ✨ User-friendly interface with real-time preview
- 🎨 Professional templates with modern design
- 📝 Customizable sections (Personal Info, Summary, Experience, Education, Skills)
- 👀 Live editing with instant preview updates
- 📄 PDF export functionality
- 📱 Mobile-responsive design

### Key Highlights
- **💯 100% Free** - No premium tiers or paywalls
- **🎨 Modern UI** - Beautiful gradients, smooth animations, and responsive design
- **🤖 AI-Powered** - Advanced analysis using spaCy and NLTK
- **📱 Progressive Web App** - Offline capabilities and mobile optimization
- **🔒 Secure** - Data encryption and secure file handling

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library

### Backend
- **Python FastAPI** - High-performance API framework
- **spaCy & NLTK** - Natural Language Processing
- **PyPDF2** - PDF processing

### Database
- **MongoDB Atlas** - Cloud-hosted NoSQL database
- **Mongoose** - ODM for MongoDB

## 📁 Project Structure

```
resume-analyzer/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── analyze/           # Resume analysis page
│   │   ├── create/            # Resume builder page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Reusable components
│   │   ├── common/           # Shared components
│   │   ├── analyzer/         # Analysis-specific components
│   │   └── maker/            # Builder-specific components
│   ├── lib/                  # Utility libraries
│   ├── models/               # Database models
│   └── types/                # TypeScript definitions
├── python-backend/           # FastAPI backend
│   ├── main.py              # Main FastAPI application
│   └── requirements.txt     # Python dependencies
├── public/                  # Static assets
└── README.md               # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+ (for backend analysis)
- MongoDB Atlas account

### Installation

1. **Clone and Install Frontend Dependencies**
   ```bash
   git clone <repository-url>
   cd resume-analyzer
   npm install
   ```

2. **Set up Environment Variables**
   ```bash
   # Copy and edit .env.local with your configuration
   cp .env.local.example .env.local
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

4. **Access the Application**
   Open [http://localhost:3000](http://localhost:3000) in your browser

### Optional: Python Backend Setup

For full resume analysis functionality:

```bash
cd python-backend
pip install -r requirements.txt
python -m spacy download en_core_web_sm
python main.py
```

## 🎯 Usage

### Analyzing a Resume
1. Navigate to the "Analyze" page
2. Upload your resume (PDF, DOCX, or TXT)
3. Wait for the AI analysis to complete
4. Review the detailed feedback and suggestions

### Building a Resume
1. Go to the "Create" page
2. Fill in your information section by section
3. Watch the live preview update in real-time
4. Download your professional resume as PDF

## 🚧 Current Status

✅ **Completed:**
- Modern, responsive UI with animations
- Landing page with feature showcase
- Resume analyzer page with file upload
- Mock analysis results with scoring
- Basic resume builder structure
- Database models and API routes
- Python backend foundation

🔄 **In Progress:**
- Full resume builder functionality
- Real-time PDF generation
- Enhanced analysis algorithms
- Template customization

📋 **Planned Features:**
- [ ] Advanced template customization
- [ ] Multi-language support
- [ ] Job-specific resume optimization
- [ ] Cover letter generator
- [ ] LinkedIn profile sync

## 🛡️ Security & Performance

- **Input Validation** - Comprehensive input sanitization
- **File Upload Security** - Type validation and size limits
- **Code Splitting** - Automatic optimization with Next.js
- **Responsive Design** - Mobile-first approach
- **Progressive Loading** - Optimized user experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your own purposes.

---

**Built with ❤️ for job seekers worldwide**
