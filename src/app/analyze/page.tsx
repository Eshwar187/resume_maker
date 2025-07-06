'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, BarChart3, CheckCircle, AlertCircle, Info, Zap, Lock, Unlock, Star, X } from 'lucide-react';
import Header from '@/components/common/Header';
import AuthModal from '@/components/common/AuthModal';

interface AnalysisResult {
  score: number;
  feedback: {
    type: 'success' | 'warning' | 'error' | 'info';
    message: string;
    category: string;
    correction?: string;
    isLocked?: boolean;
  }[];
  keywords: string[];
  missingKeywords: string[];
  atsCompatibility: number;
  detailedCorrections: {
    section: string;
    issue: string;
    correction: string;
    impact: 'high' | 'medium' | 'low';
    isLocked: boolean;
  }[];
}

export default function AnalyzePage() {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDetailedCorrections, setShowDetailedCorrections] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const [scanType, setScanType] = useState<'general' | 'jobDescription'>('general');
  const [jobDescription, setJobDescription] = useState('');
  const [showScanOptions, setShowScanOptions] = useState(false);

  const analyzeResume = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis process with different results based on scan type
    setTimeout(() => {
      const baseAnalysis = {
        score: scanType === 'jobDescription' ? 85 : 78,
        atsCompatibility: scanType === 'jobDescription' ? 92 : 85,
        keywords: scanType === 'jobDescription' 
          ? ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Team Leadership', 'API Development']
          : ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Team Leadership'],
        missingKeywords: scanType === 'jobDescription'
          ? ['Microservices', 'CI/CD', 'Agile']
          : ['TypeScript', 'AWS', 'Docker', 'Machine Learning'],
        feedback: scanType === 'jobDescription' ? [
          {
            type: 'success',
            message: 'Excellent match with job requirements - strong technical skills alignment',
            category: 'Job Match'
          },
          {
            type: 'success',
            message: 'Keywords align well with job posting requirements',
            category: 'Keywords'
          },
          {
            type: 'warning',
            message: 'Consider highlighting experience with microservices architecture',
            category: 'Experience',
            correction: 'Add a bullet point: "Designed and implemented microservices architecture using Docker and Kubernetes"',
            isLocked: !isLoggedIn
          },
          {
            type: 'error',
            message: 'Add specific examples of API development projects mentioned in job description',
            category: 'Content',
            correction: 'Replace generic descriptions with: "Developed RESTful APIs serving 10K+ requests/day with 99.9% uptime"',
            isLocked: !isLoggedIn
          }
        ] : [
          {
            type: 'success',
            message: 'Strong technical skills section with relevant keywords',
            category: 'Skills'
          },
          {
            type: 'warning',
            message: 'Consider adding more quantifiable achievements',
            category: 'Experience',
            correction: 'Replace "Worked on team projects" with "Led a team of 5 developers, delivering 3 major projects on time"',
            isLocked: !isLoggedIn
          },
          {
            type: 'error',
            message: 'Missing contact information (LinkedIn profile)',
            category: 'Contact',
            correction: 'Add your LinkedIn profile URL after your email address',
            isLocked: !isLoggedIn
          },
          {
            type: 'info',
            message: 'Resume length is optimal (2 pages)',
            category: 'Format'
          }
        ],
        detailedCorrections: [
          {
            section: 'Professional Summary',
            issue: 'Generic summary lacks specific achievements',
            correction: 'Replace with: "Results-driven Software Developer with 5+ years experience building scalable web applications. Increased team productivity by 30% through process optimization and mentored 3 junior developers to successful project completion."',
            impact: 'high',
            isLocked: !isLoggedIn
          },
          {
            section: 'Work Experience',
            issue: 'Missing quantifiable metrics in job descriptions',
            correction: 'Add specific numbers: "Optimized database queries reducing load time by 45%" instead of "Improved database performance"',
            impact: 'high',
            isLocked: !isLoggedIn
          },
          {
            section: 'Skills Section',
            issue: 'Skills not organized by proficiency level',
            correction: 'Organize skills into: "Expert: JavaScript, React, Node.js" and "Proficient: Python, AWS, Docker"',
            impact: 'medium',
            isLocked: !isLoggedIn
          },
          {
            section: 'Contact Information',
            issue: 'Missing LinkedIn and GitHub profiles',
            correction: 'Add: "LinkedIn: linkedin.com/in/yourname" and "GitHub: github.com/yourusername"',
            impact: 'medium',
            isLocked: !isLoggedIn
          },
          {
            section: 'Education',
            issue: 'Missing relevant coursework or GPA (if strong)',
            correction: 'Add relevant coursework: "Relevant Coursework: Data Structures, Algorithms, Software Engineering"',
            impact: 'low',
            isLocked: !isLoggedIn
          }
        ]
      };
      
      setAnalysis(baseAnalysis);
      setIsAnalyzing(false);
      setShowScanOptions(false);
    }, 3000);
  };

  const handleFileUpload = () => {
    if (file) {
      setShowScanOptions(true);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-green-500 to-green-600';
    if (score >= 60) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const getFeedbackIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'info': return <Info className="w-5 h-5 text-blue-500" />;
      default: return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const handleAuthSuccess = () => {
    setIsLoggedIn(true);
    setShowAuthModal(false);
    // Re-analyze to unlock corrections
    if (analysis) {
      const updatedAnalysis = {
        ...analysis,
        feedback: analysis.feedback.map(item => ({ ...item, isLocked: false })),
        detailedCorrections: analysis.detailedCorrections.map(item => ({ ...item, isLocked: false }))
      };
      setAnalysis(updatedAnalysis);
    }
  };

  const handleUnlockCorrections = () => {
    setShowAuthModal(true);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
              Resume Analyzer
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upload your resume and get detailed AI-powered feedback to improve your chances of landing your dream job.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Upload className="w-6 h-6 mr-2 text-blue-600" />
                Upload Resume
              </h2>
              
              <div
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  dragActive 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-300 hover:border-blue-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Drag and drop your resume here
                </p>
                <p className="text-gray-500 mb-4">or</p>
                <label className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition-colors">
                  <span>Choose File</span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="text-sm text-gray-500 mt-4">
                  Supports PDF, DOC, DOCX, and TXT files (max 10MB)
                </p>
              </div>

              {file && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-green-600 mr-2" />
                    <span className="text-green-800 font-medium">{file.name}</span>
                  </div>
                  <p className="text-sm text-green-600 mt-1">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}

              <button
                onClick={handleFileUpload}
                disabled={!file || isAnalyzing}
                className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <BarChart3 className="w-5 h-5" />
                <span>Choose Analysis Type</span>
              </button>

              {/* Scan Options Modal */}
              {showScanOptions && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                      Choose Analysis Type
                    </h3>
                    
                    <div className="space-y-4 mb-6">
                      {/* General ATS Scan */}
                      <div
                        onClick={() => setScanType('general')}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          scanType === 'general'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-5 h-5 rounded-full border-2 mt-1 ${
                            scanType === 'general'
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                          }`}>
                            {scanType === 'general' && (
                              <div className="w-full h-full rounded-full bg-white scale-50" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">
                              General ATS Scan
                            </h4>
                            <p className="text-sm text-gray-600">
                              Comprehensive analysis of your resume for general ATS compatibility, 
                              formatting, and industry best practices.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Job Description Based Scan */}
                      <div
                        onClick={() => setScanType('jobDescription')}
                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all duration-300 ${
                          scanType === 'jobDescription'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`w-5 h-5 rounded-full border-2 mt-1 ${
                            scanType === 'jobDescription'
                              ? 'border-blue-500 bg-blue-500'
                              : 'border-gray-300'
                          }`}>
                            {scanType === 'jobDescription' && (
                              <div className="w-full h-full rounded-full bg-white scale-50" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">
                              Job Description Match
                            </h4>
                            <p className="text-sm text-gray-600">
                              Compare your resume against a specific job posting to see 
                              how well it matches the requirements.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Job Description Input */}
                    {scanType === 'jobDescription' && (
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Paste Job Description
                        </label>
                        <textarea
                          value={jobDescription}
                          onChange={(e) => setJobDescription(e.target.value)}
                          rows={6}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Paste the job description here to get personalized analysis and keyword matching..."
                        />
                      </div>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setShowScanOptions(false)}
                        className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={analyzeResume}
                        disabled={scanType === 'jobDescription' && !jobDescription.trim()}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Start Analysis
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2 text-blue-600" />
                Analysis Results
              </h2>

              {!analysis ? (
                <div className="text-center text-gray-500 py-12">
                  <Zap className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Upload a resume to see analysis results</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Scan Type Indicator */}
                  <div className="mb-4">
                    <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      <BarChart3 className="w-4 h-4" />
                      <span>{scanType === 'general' ? 'General ATS Analysis' : 'Job Match Analysis'}</span>
                    </div>
                  </div>
                  
                  {/* Overall Score */}
                  <div className="text-center">
                    <div className={`text-6xl font-bold ${getScoreColor(analysis.score)} mb-2`}>
                      {analysis.score}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <div 
                        className={`h-3 rounded-full bg-gradient-to-r ${getScoreGradient(analysis.score)}`}
                        style={{ width: `${analysis.score}%` }}
                      />
                    </div>
                    <p className="text-gray-600">
                      {scanType === 'general' ? 'Overall Resume Score' : 'Job Match Score'}
                    </p>
                  </div>

                  {/* ATS Compatibility */}
                  <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-700">ATS Compatibility</span>
                      <span className={`font-bold ${getScoreColor(analysis.atsCompatibility)}`}>
                        {analysis.atsCompatibility}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full bg-gradient-to-r ${getScoreGradient(analysis.atsCompatibility)}`}
                        style={{ width: `${analysis.atsCompatibility}%` }}
                      />
                    </div>
                  </div>

                  {/* Feedback */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-700">Detailed Feedback</h3>
                      {!isLoggedIn && (
                        <button
                          onClick={() => setShowDetailedCorrections(true)}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
                        >
                          <Lock className="w-4 h-4" />
                          <span>View All Corrections</span>
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      {analysis.feedback.map((item, index) => (
                        <div key={index} className="p-3 rounded-lg bg-gray-50 border">
                          <div className="flex items-start space-x-3">
                            {getFeedbackIcon(item.type)}
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-700">{item.category}</p>
                              <p className="text-sm text-gray-600 mb-2">{item.message}</p>
                              {item.correction && (
                                <div className="relative">
                                  {item.isLocked ? (
                                    <div className="bg-gray-100 p-3 rounded border border-gray-200 relative">
                                      <div className="absolute inset-0 bg-gray-900/10 rounded flex items-center justify-center">
                                        <div className="bg-white p-2 rounded-lg shadow-lg flex items-center space-x-2">
                                          <Lock className="w-4 h-4 text-gray-600" />
                                          <span className="text-sm text-gray-600 font-medium">Sign up to view correction</span>
                                        </div>
                                      </div>
                                      <p className="text-sm text-gray-500 blur-sm select-none">
                                        This is a detailed correction that explains exactly how to improve this section...
                                      </p>
                                    </div>
                                  ) : (
                                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                                      <div className="flex items-start space-x-2">
                                        <Unlock className="w-4 h-4 text-blue-600 mt-0.5" />
                                        <div>
                                          <p className="text-sm font-medium text-blue-900 mb-1">Suggested Correction:</p>
                                          <p className="text-sm text-blue-800">{item.correction}</p>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Keywords */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">Found Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {analysis.keywords.map((keyword, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700 mb-2">Missing Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {analysis.missingKeywords.map((keyword, index) => (
                          <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
          
          {/* Detailed Corrections Modal */}
          <AnimatePresence>
            {showDetailedCorrections && analysis && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={() => setShowDetailedCorrections(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[80vh] overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-6 border-b">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-bold text-gray-900">Detailed Resume Corrections</h3>
                      <button
                        onClick={() => setShowDetailedCorrections(false)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                    <p className="text-gray-600 mt-2">
                      Professional corrections to enhance your resume&apos;s impact and ATS compatibility.
                    </p>
                  </div>
                  
                  <div className="p-6 overflow-y-auto max-h-[60vh]">
                    <div className="space-y-4">
                      {analysis.detailedCorrections.map((correction, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h4 className="font-semibold text-gray-900">{correction.section}</h4>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(correction.impact)}`}>
                                  {correction.impact.toUpperCase()} IMPACT
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 mb-3">
                                <span className="font-medium">Issue:</span> {correction.issue}
                              </p>
                            </div>
                          </div>
                          
                          <div className="relative">
                            {correction.isLocked ? (
                              <div className="bg-gray-100 p-4 rounded border border-gray-200 relative">
                                <div className="absolute inset-0 bg-gray-900/10 rounded flex items-center justify-center">
                                  <div className="bg-white p-3 rounded-lg shadow-lg flex items-center space-x-2">
                                    <Lock className="w-5 h-5 text-gray-600" />
                                    <div className="text-center">
                                      <p className="text-sm text-gray-600 font-medium mb-1">Premium Correction</p>
                                      <button
                                        onClick={handleUnlockCorrections}
                                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                                      >
                                        Sign up to unlock
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <p className="text-sm text-gray-500 blur-sm select-none">
                                  This detailed correction provides specific, actionable advice to improve your resume section. 
                                  It includes exact wording suggestions, formatting tips, and best practices that will make 
                                  your resume stand out to both ATS systems and human recruiters.
                                </p>
                              </div>
                            ) : (
                              <div className="bg-green-50 p-4 rounded border border-green-200">
                                <div className="flex items-start space-x-2">
                                  <Unlock className="w-5 h-5 text-green-600 mt-0.5" />
                                  <div>
                                    <p className="text-sm font-medium text-green-900 mb-2">Recommended Correction:</p>
                                    <p className="text-sm text-green-800">{correction.correction}</p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {!isLoggedIn && (
                    <div className="p-6 border-t bg-gray-50">
                      <div className="text-center">
                        <div className="flex items-center justify-center space-x-2 mb-3">
                          <Star className="w-5 h-5 text-yellow-500" />
                          <span className="font-semibold text-gray-900">Unlock All Premium Corrections</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">
                          Get detailed, actionable feedback to improve your resume and increase your chances of landing interviews.
                        </p>
                        <button
                          onClick={handleUnlockCorrections}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                        >
                          Sign Up for Free
                        </button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Auth Modal */}
          <AuthModal 
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            onSuccess={handleAuthSuccess}
          />
        </div>
      </div>
    </>
  );
}
