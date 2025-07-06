import { NextRequest, NextResponse } from 'next/server';

interface Template {
  id: string;
  name: string;
  description: string;
  category: 'modern' | 'classic' | 'creative' | 'minimal' | 'executive';
  atsOptimized: boolean;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  features: string[];
  rating: number;
  downloads: number;
  isPremium: boolean;
  fields: {
    id: string;
    label: string;
    type: 'text' | 'textarea' | 'email' | 'phone' | 'url' | 'date' | 'list';
    required: boolean;
    placeholder?: string;
    maxLength?: number;
  }[];
  layout: {
    sections: string[];
    columnLayout: '1-column' | '2-column' | 'sidebar';
    headerStyle: 'centered' | 'left-aligned' | 'split';
  };
}

// Complete template database
const TEMPLATES: Template[] = [
  // Modern Templates
  {
    id: 'modern-pro-1',
    name: 'Modern Professional',
    description: 'Clean, contemporary design perfect for tech and business professionals',
    category: 'modern',
    atsOptimized: true,
    colors: { primary: '#3B82F6', secondary: '#1E40AF', accent: '#10B981' },
    features: ['ATS Optimized', 'Clean Layout', 'Professional Fonts', 'Easy to Edit'],
    rating: 4.9,
    downloads: 15420,
    isPremium: false,
    fields: [
      { id: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'John Smith' },
      { id: 'email', label: 'Email', type: 'email', required: true, placeholder: 'john@example.com' },
      { id: 'phone', label: 'Phone', type: 'phone', required: true, placeholder: '+1 (555) 123-4567' },
      { id: 'location', label: 'Location', type: 'text', required: false, placeholder: 'City, State' },
      { id: 'linkedin', label: 'LinkedIn', type: 'url', required: false, placeholder: 'linkedin.com/in/johnsmith' },
      { id: 'github', label: 'GitHub', type: 'url', required: false, placeholder: 'github.com/johnsmith' },
      { id: 'summary', label: 'Professional Summary', type: 'textarea', required: true, maxLength: 500 },
      { id: 'experience', label: 'Work Experience', type: 'list', required: true },
      { id: 'education', label: 'Education', type: 'list', required: true },
      { id: 'skills', label: 'Skills', type: 'list', required: true },
      { id: 'certifications', label: 'Certifications', type: 'list', required: false },
      { id: 'projects', label: 'Projects', type: 'list', required: false }
    ],
    layout: {
      sections: ['header', 'summary', 'experience', 'education', 'skills', 'certifications', 'projects'],
      columnLayout: '2-column',
      headerStyle: 'centered'
    }
  },
  {
    id: 'modern-tech-2',
    name: 'Tech Innovator',
    description: 'Perfect for software developers and tech professionals',
    category: 'modern',
    atsOptimized: true,
    colors: { primary: '#0F172A', secondary: '#334155', accent: '#06B6D4' },
    features: ['Tech Focused', 'ATS Optimized', 'Code-friendly', 'Modern Design'],
    rating: 4.9,
    downloads: 12850,
    isPremium: false,
    fields: [
      { id: 'fullName', label: 'Full Name', type: 'text', required: true },
      { id: 'email', label: 'Email', type: 'email', required: true },
      { id: 'phone', label: 'Phone', type: 'phone', required: true },
      { id: 'location', label: 'Location', type: 'text', required: false },
      { id: 'github', label: 'GitHub', type: 'url', required: true },
      { id: 'linkedin', label: 'LinkedIn', type: 'url', required: false },
      { id: 'portfolio', label: 'Portfolio', type: 'url', required: false },
      { id: 'summary', label: 'Technical Summary', type: 'textarea', required: true, maxLength: 400 },
      { id: 'experience', label: 'Work Experience', type: 'list', required: true },
      { id: 'projects', label: 'Technical Projects', type: 'list', required: true },
      { id: 'skills', label: 'Technical Skills', type: 'list', required: true },
      { id: 'education', label: 'Education', type: 'list', required: true },
      { id: 'certifications', label: 'Certifications', type: 'list', required: false }
    ],
    layout: {
      sections: ['header', 'summary', 'skills', 'experience', 'projects', 'education', 'certifications'],
      columnLayout: 'sidebar',
      headerStyle: 'left-aligned'
    }
  },
  // Classic Templates
  {
    id: 'classic-exec-1',
    name: 'Executive Classic',
    description: 'Traditional format that works with all ATS systems',
    category: 'classic',
    atsOptimized: true,
    colors: { primary: '#374151', secondary: '#6B7280', accent: '#059669' },
    features: ['100% ATS Compatible', 'Traditional Layout', 'Corporate Style', 'Timeless Design'],
    rating: 4.8,
    downloads: 22100,
    isPremium: false,
    fields: [
      { id: 'fullName', label: 'Full Name', type: 'text', required: true },
      { id: 'email', label: 'Email Address', type: 'email', required: true },
      { id: 'phone', label: 'Phone Number', type: 'phone', required: true },
      { id: 'address', label: 'Address', type: 'text', required: false },
      { id: 'linkedin', label: 'LinkedIn Profile', type: 'url', required: false },
      { id: 'objective', label: 'Professional Objective', type: 'textarea', required: true, maxLength: 300 },
      { id: 'experience', label: 'Professional Experience', type: 'list', required: true },
      { id: 'education', label: 'Education', type: 'list', required: true },
      { id: 'skills', label: 'Core Competencies', type: 'list', required: true },
      { id: 'achievements', label: 'Key Achievements', type: 'list', required: false },
      { id: 'references', label: 'References', type: 'text', required: false }
    ],
    layout: {
      sections: ['header', 'objective', 'experience', 'education', 'skills', 'achievements'],
      columnLayout: '1-column',
      headerStyle: 'centered'
    }
  },
  // Creative Templates
  {
    id: 'creative-edge-1',
    name: 'Creative Edge',
    description: 'Stylish design while maintaining ATS compatibility',
    category: 'creative',
    atsOptimized: true,
    colors: { primary: '#7C3AED', secondary: '#A855F7', accent: '#EC4899' },
    features: ['Creative Layout', 'ATS Compatible', 'Eye-catching', 'Modern Typography'],
    rating: 4.6,
    downloads: 12800,
    isPremium: false,
    fields: [
      { id: 'fullName', label: 'Full Name', type: 'text', required: true },
      { id: 'title', label: 'Professional Title', type: 'text', required: true },
      { id: 'email', label: 'Email', type: 'email', required: true },
      { id: 'phone', label: 'Phone', type: 'phone', required: true },
      { id: 'location', label: 'Location', type: 'text', required: false },
      { id: 'portfolio', label: 'Portfolio Website', type: 'url', required: false },
      { id: 'behance', label: 'Behance Profile', type: 'url', required: false },
      { id: 'dribbble', label: 'Dribbble Profile', type: 'url', required: false },
      { id: 'summary', label: 'Creative Profile', type: 'textarea', required: true, maxLength: 450 },
      { id: 'experience', label: 'Experience', type: 'list', required: true },
      { id: 'projects', label: 'Featured Projects', type: 'list', required: true },
      { id: 'skills', label: 'Creative Skills', type: 'list', required: true },
      { id: 'education', label: 'Education', type: 'list', required: true },
      { id: 'awards', label: 'Awards & Recognition', type: 'list', required: false }
    ],
    layout: {
      sections: ['header', 'summary', 'projects', 'experience', 'skills', 'education', 'awards'],
      columnLayout: '2-column',
      headerStyle: 'split'
    }
  },
  // Minimal Templates
  {
    id: 'minimal-pro-1',
    name: 'Minimalist Pro',
    description: 'Simple, elegant design focusing on content clarity',
    category: 'minimal',
    atsOptimized: true,
    colors: { primary: '#111827', secondary: '#6B7280', accent: '#F59E0B' },
    features: ['Ultra Clean', 'Content Focused', 'ATS Friendly', 'Minimal Styling'],
    rating: 4.7,
    downloads: 18350,
    isPremium: false,
    fields: [
      { id: 'fullName', label: 'Name', type: 'text', required: true },
      { id: 'email', label: 'Email', type: 'email', required: true },
      { id: 'phone', label: 'Phone', type: 'phone', required: true },
      { id: 'linkedin', label: 'LinkedIn', type: 'url', required: false },
      { id: 'summary', label: 'Summary', type: 'textarea', required: true, maxLength: 350 },
      { id: 'experience', label: 'Experience', type: 'list', required: true },
      { id: 'education', label: 'Education', type: 'list', required: true },
      { id: 'skills', label: 'Skills', type: 'list', required: true }
    ],
    layout: {
      sections: ['header', 'summary', 'experience', 'education', 'skills'],
      columnLayout: '1-column',
      headerStyle: 'left-aligned'
    }
  },
  // Executive Templates
  {
    id: 'executive-leader-1',
    name: 'Executive Leader',
    description: 'Premium design for C-level executives',
    category: 'executive',
    atsOptimized: true,
    colors: { primary: '#1F2937', secondary: '#374151', accent: '#DC2626' },
    features: ['Executive Level', 'ATS Optimized', 'Premium Design', 'Leadership Focus'],
    rating: 4.9,
    downloads: 4560,
    isPremium: true,
    fields: [
      { id: 'fullName', label: 'Executive Name', type: 'text', required: true },
      { id: 'title', label: 'Executive Title', type: 'text', required: true },
      { id: 'email', label: 'Email Address', type: 'email', required: true },
      { id: 'phone', label: 'Phone Number', type: 'phone', required: true },
      { id: 'location', label: 'Location', type: 'text', required: false },
      { id: 'linkedin', label: 'LinkedIn Profile', type: 'url', required: false },
      { id: 'executive_summary', label: 'Executive Summary', type: 'textarea', required: true, maxLength: 600 },
      { id: 'leadership_experience', label: 'Leadership Experience', type: 'list', required: true },
      { id: 'achievements', label: 'Key Achievements', type: 'list', required: true },
      { id: 'education', label: 'Education', type: 'list', required: true },
      { id: 'board_positions', label: 'Board Positions', type: 'list', required: false },
      { id: 'speaking', label: 'Speaking Engagements', type: 'list', required: false },
      { id: 'publications', label: 'Publications', type: 'list', required: false }
    ],
    layout: {
      sections: ['header', 'executive_summary', 'leadership_experience', 'achievements', 'education', 'board_positions'],
      columnLayout: '1-column',
      headerStyle: 'centered'
    }
  }
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const premium = searchParams.get('premium');
  const atsOptimized = searchParams.get('atsOptimized');
  
  let filteredTemplates = TEMPLATES;
  
  // Filter by category
  if (category && category !== 'all') {
    filteredTemplates = filteredTemplates.filter(template => template.category === category);
  }
  
  // Filter by premium status
  if (premium !== null) {
    const isPremium = premium === 'true';
    filteredTemplates = filteredTemplates.filter(template => template.isPremium === isPremium);
  }
  
  // Filter by ATS optimization
  if (atsOptimized !== null) {
    const isAtsOptimized = atsOptimized === 'true';
    filteredTemplates = filteredTemplates.filter(template => template.atsOptimized === isAtsOptimized);
  }
  
  // Sort by downloads (most popular first)
  filteredTemplates.sort((a, b) => b.downloads - a.downloads);
  
  return NextResponse.json({
    templates: filteredTemplates,
    total: filteredTemplates.length,
    categories: ['modern', 'classic', 'creative', 'minimal', 'executive'],
    filters: {
      category: category || 'all',
      premium: premium || 'all',
      atsOptimized: atsOptimized || 'all'
    }
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, templateId, customTemplate } = body;
    
    if (action === 'download') {
      // Track download
      const template = TEMPLATES.find(t => t.id === templateId);
      if (template) {
        template.downloads += 1;
        return NextResponse.json({
          success: true,
          message: 'Download tracked',
          template: {
            id: template.id,
            name: template.name,
            downloads: template.downloads
          }
        });
      } else {
        return NextResponse.json(
          { error: 'Template not found' },
          { status: 404 }
        );
      }
    }
    
    if (action === 'rate') {
      const { rating } = body;
      const template = TEMPLATES.find(t => t.id === templateId);
      if (template && rating >= 1 && rating <= 5) {
        // In a real app, you'd store individual ratings and calculate averages
        template.rating = ((template.rating * template.downloads) + rating) / (template.downloads + 1);
        return NextResponse.json({
          success: true,
          message: 'Rating submitted',
          newRating: template.rating
        });
      }
    }
    
    if (action === 'create' && customTemplate) {
      // Validate required fields for custom template
      const requiredFields = ['name', 'description', 'category', 'colors', 'fields', 'layout'];
      const missingFields = requiredFields.filter(field => !customTemplate[field]);
      
      if (missingFields.length > 0) {
        return NextResponse.json(
          { error: `Missing required fields: ${missingFields.join(', ')}` },
          { status: 400 }
        );
      }
      
      const newTemplate: Template = {
        id: `custom-${Date.now()}`,
        name: customTemplate.name,
        description: customTemplate.description,
        category: customTemplate.category,
        atsOptimized: customTemplate.atsOptimized || false,
        colors: customTemplate.colors,
        features: customTemplate.features || ['Custom Template'],
        rating: 0,
        downloads: 0,
        isPremium: false,
        fields: customTemplate.fields,
        layout: customTemplate.layout
      };
      
      // In a real app, you'd save this to a database
      TEMPLATES.push(newTemplate);
      
      return NextResponse.json({
        success: true,
        message: 'Custom template created',
        template: newTemplate
      });
    }
    
    return NextResponse.json(
      { error: 'Invalid action' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('Template API error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
