import { NextRequest, NextResponse } from 'next/server';
import { ResumeAnalysis } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Mock analysis for now (replace with actual Python backend call)
    const mockAnalysis: ResumeAnalysis = {
      score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
      feedback: [
        {
          type: 'success',
          category: 'content',
          message: 'Strong technical skills section with relevant keywords',
          section: 'Skills',
          priority: 'high'
        },
        {
          type: 'warning', 
          category: 'formatting',
          message: 'Consider adding more quantifiable achievements',
          section: 'Experience',
          priority: 'medium'
        },
        {
          type: 'error',
          category: 'structure',
          message: 'Missing contact information (LinkedIn profile)',
          section: 'Personal Info',
          priority: 'high'
        },
        {
          type: 'suggestion',
          category: 'keywords',
          message: 'Add industry-specific keywords to improve ATS compatibility',
          section: 'Overall',
          priority: 'medium'
        }
      ],
      keywords: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Team Leadership'],
      missingKeywords: ['TypeScript', 'AWS', 'Docker', 'Machine Learning'],
      atsCompatibility: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
      sections: [
        {
          name: 'Personal Information',
          score: 85,
          issues: ['Missing LinkedIn profile'],
          suggestions: ['Add professional social media links']
        },
        {
          name: 'Professional Summary',
          score: 78,
          issues: ['Could be more concise'],
          suggestions: ['Focus on key achievements and skills']
        },
        {
          name: 'Work Experience', 
          score: 82,
          issues: ['Lack of quantified achievements'],
          suggestions: ['Add metrics and numbers to showcase impact']
        },
        {
          name: 'Skills',
          score: 90,
          issues: [],
          suggestions: ['Consider grouping skills by category']
        }
      ]
    };

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));

    return NextResponse.json(mockAnalysis);
  } catch (error) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
