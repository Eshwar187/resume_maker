import { NextRequest, NextResponse } from 'next/server';

interface AnalyzeRequest {
  resumeText: string;
  jobDescription?: string;
  analysisType: 'general' | 'job-specific';
}

interface AnalysisResult {
  score: number;
  atsCompatibility: number;
  keywords: string[];
  missingKeywords: string[];
  feedback: {
    type: 'success' | 'warning' | 'error' | 'info';
    message: string;
    category: string;
    correction?: string;
    priority: 'high' | 'medium' | 'low';
  }[];
  detailedAnalysis: {
    sections: {
      name: string;
      score: number;
      feedback: string;
      suggestions: string[];
    }[];
    formatting: {
      score: number;
      issues: string[];
      recommendations: string[];
    };
    content: {
      score: number;
      strengths: string[];
      improvements: string[];
    };
  };
}

// ATS keywords database
const ATS_KEYWORDS = {
  technical: [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Java', 'C++', 'SQL',
    'MongoDB', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'Git',
    'API', 'REST', 'GraphQL', 'Machine Learning', 'Data Analysis', 'Agile', 'Scrum'
  ],
  soft: [
    'Leadership', 'Communication', 'Team Management', 'Problem Solving',
    'Project Management', 'Collaboration', 'Analytical Thinking', 'Adaptability',
    'Time Management', 'Strategic Planning', 'Mentoring', 'Decision Making'
  ],
  industry: [
    'Software Development', 'Data Science', 'DevOps', 'Product Management',
    'Digital Marketing', 'Business Analysis', 'Quality Assurance', 'UI/UX Design',
    'System Administration', 'Cybersecurity', 'Cloud Computing', 'Mobile Development'
  ]
};

function extractKeywords(text: string): string[] {
  const allKeywords = [...ATS_KEYWORDS.technical, ...ATS_KEYWORDS.soft, ...ATS_KEYWORDS.industry];
  const foundKeywords: string[] = [];
  
  const textLower = text.toLowerCase();
  allKeywords.forEach(keyword => {
    if (textLower.includes(keyword.toLowerCase())) {
      foundKeywords.push(keyword);
    }
  });
  
  return foundKeywords;
}

function extractJobKeywords(jobDescription: string): string[] {
  const keywords: string[] = [];
  const lines = jobDescription.toLowerCase().split('\n');
  
  // Look for requirement sections
  const requirementSections = lines.filter(line => 
    line.includes('requirement') || 
    line.includes('qualifications') || 
    line.includes('skills') ||
    line.includes('experience')
  );
  
  // Extract keywords from requirement sections
  requirementSections.forEach(section => {
    Object.values(ATS_KEYWORDS).flat().forEach(keyword => {
      if (section.includes(keyword.toLowerCase())) {
        keywords.push(keyword);
      }
    });
  });
  
  return [...new Set(keywords)]; // Remove duplicates
}

function analyzeResumeContent(resumeText: string): AnalysisResult['detailedAnalysis'] {
  const sections = [
    {
      name: 'Professional Summary',
      score: resumeText.toLowerCase().includes('summary') ? 85 : 60,
      feedback: resumeText.toLowerCase().includes('summary') 
        ? 'Good professional summary section found'
        : 'Consider adding a professional summary section',
      suggestions: [
        'Include quantifiable achievements',
        'Highlight relevant skills and experience',
        'Keep it concise (3-4 lines)'
      ]
    },
    {
      name: 'Work Experience',
      score: resumeText.toLowerCase().includes('experience') ? 90 : 70,
      feedback: 'Work experience section detected',
      suggestions: [
        'Use action verbs to start bullet points',
        'Include specific metrics and results',
        'Focus on achievements, not just responsibilities'
      ]
    },
    {
      name: 'Skills',
      score: resumeText.toLowerCase().includes('skills') ? 80 : 50,
      feedback: resumeText.toLowerCase().includes('skills')
        ? 'Skills section found'
        : 'Skills section missing or unclear',
      suggestions: [
        'Organize skills by category (Technical, Soft Skills)',
        'Include proficiency levels',
        'Match skills to job requirements'
      ]
    },
    {
      name: 'Education',
      score: resumeText.toLowerCase().includes('education') || resumeText.toLowerCase().includes('degree') ? 85 : 60,
      feedback: 'Education information present',
      suggestions: [
        'Include relevant coursework if recent graduate',
        'Add certifications and professional development',
        'Include GPA if 3.5 or higher'
      ]
    }
  ];

  const formatting = {
    score: 75,
    issues: [
      'Ensure consistent formatting throughout',
      'Use standard fonts (Arial, Calibri, Times New Roman)',
      'Maintain proper spacing and margins'
    ],
    recommendations: [
      'Use bullet points for easy scanning',
      'Keep consistent date formats',
      'Ensure contact information is prominently placed'
    ]
  };

  const content = {
    score: 82,
    strengths: [
      'Clear structure and organization',
      'Relevant work experience',
      'Professional presentation'
    ],
    improvements: [
      'Add more quantifiable achievements',
      'Include relevant keywords for ATS',
      'Optimize for specific job requirements'
    ]
  };

  return { sections, formatting, content };
}

function calculateOverallScore(resumeText: string, foundKeywords: string[], missingKeywords: string[]): number {
  let score = 50; // Base score
  
  // Add points for found keywords
  score += Math.min(foundKeywords.length * 2, 30);
  
  // Deduct points for missing critical keywords
  score -= Math.min(missingKeywords.length * 1, 20);
  
  // Add points for resume sections
  const sections = ['summary', 'experience', 'skills', 'education'];
  sections.forEach(section => {
    if (resumeText.toLowerCase().includes(section)) {
      score += 5;
    }
  });
  
  // Add points for quantifiable achievements (numbers in text)
  const numberMatches = resumeText.match(/\d+/g);
  if (numberMatches && numberMatches.length > 5) {
    score += 10;
  }
  
  return Math.min(Math.max(score, 0), 100);
}

function generateFeedback(
  resumeText: string, 
  foundKeywords: string[], 
  missingKeywords: string[],
  analysisType: string
): AnalysisResult['feedback'] {
  const feedback: AnalysisResult['feedback'] = [];
  
  // Keyword feedback
  if (foundKeywords.length > 10) {
    feedback.push({
      type: 'success',
      message: `Excellent keyword optimization with ${foundKeywords.length} relevant keywords found`,
      category: 'Keywords',
      priority: 'low'
    });
  } else if (foundKeywords.length > 5) {
    feedback.push({
      type: 'info',
      message: `Good keyword presence with ${foundKeywords.length} relevant keywords`,
      category: 'Keywords',
      priority: 'medium'
    });
  } else {
    feedback.push({
      type: 'warning',
      message: 'Limited relevant keywords found - consider adding more industry-specific terms',
      category: 'Keywords',
      correction: 'Add relevant technical skills, soft skills, and industry terms mentioned in job postings',
      priority: 'high'
    });
  }
  
  // Missing keywords feedback
  if (missingKeywords.length > 0) {
    feedback.push({
      type: 'error',
      message: `Missing ${missingKeywords.length} important keywords that could improve ATS compatibility`,
      category: 'ATS Optimization',
      correction: `Consider adding these keywords: ${missingKeywords.slice(0, 5).join(', ')}`,
      priority: 'high'
    });
  }
  
  // Structure feedback
  if (!resumeText.toLowerCase().includes('summary')) {
    feedback.push({
      type: 'warning',
      message: 'No professional summary detected',
      category: 'Structure',
      correction: 'Add a 3-4 line professional summary highlighting your key qualifications',
      priority: 'medium'
    });
  }
  
  // Length feedback
  const wordCount = resumeText.split(' ').length;
  if (wordCount < 200) {
    feedback.push({
      type: 'warning',
      message: 'Resume appears too short - may lack sufficient detail',
      category: 'Content',
      correction: 'Expand on your experience with specific achievements and responsibilities',
      priority: 'medium'
    });
  } else if (wordCount > 800) {
    feedback.push({
      type: 'info',
      message: 'Resume is quite detailed - ensure it stays focused and relevant',
      category: 'Content',
      priority: 'low'
    });
  }
  
  return feedback;
}

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json();
    const { resumeText, jobDescription, analysisType } = body;
    
    if (!resumeText) {
      return NextResponse.json(
        { error: 'Resume text is required' },
        { status: 400 }
      );
    }
    
    // Extract keywords from resume
    const foundKeywords = extractKeywords(resumeText);
    
    // Determine missing keywords based on analysis type
    let missingKeywords: string[] = [];
    if (analysisType === 'job-specific' && jobDescription) {
      const jobKeywords = extractJobKeywords(jobDescription);
      missingKeywords = jobKeywords.filter(keyword => 
        !foundKeywords.some(found => found.toLowerCase() === keyword.toLowerCase())
      );
    } else {
      // General analysis - check for common ATS keywords
      const commonKeywords = [
        ...ATS_KEYWORDS.technical.slice(0, 10),
        ...ATS_KEYWORDS.soft.slice(0, 5)
      ];
      missingKeywords = commonKeywords.filter(keyword => 
        !foundKeywords.some(found => found.toLowerCase() === keyword.toLowerCase())
      );
    }
    
    // Calculate scores
    const score = calculateOverallScore(resumeText, foundKeywords, missingKeywords);
    const atsCompatibility = Math.min(score + 10, 100); // ATS typically scores slightly higher
    
    // Generate feedback
    const feedback = generateFeedback(resumeText, foundKeywords, missingKeywords, analysisType);
    
    // Detailed analysis
    const detailedAnalysis = analyzeResumeContent(resumeText);
    
    const result: AnalysisResult = {
      score,
      atsCompatibility,
      keywords: foundKeywords,
      missingKeywords: missingKeywords.slice(0, 10), // Limit to top 10
      feedback,
      detailedAnalysis
    };
    
    return NextResponse.json(result);
    
  } catch (error) {
    console.error('Resume analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Resume Analysis API',
    endpoints: {
      POST: 'Analyze resume text against job requirements',
      parameters: {
        resumeText: 'string (required)',
        jobDescription: 'string (optional)',
        analysisType: 'general | job-specific'
      }
    }
  });
}
