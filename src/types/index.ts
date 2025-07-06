export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  summary: string;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  projects?: ProjectItem[];
  certifications?: CertificationItem[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  location?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  location?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  startDate?: string;
  endDate?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiryDate?: string;
  credentialId?: string;
}

export interface ResumeAnalysis {
  score: number;
  feedback: FeedbackItem[];
  keywords: string[];
  missingKeywords: string[];
  atsCompatibility: number;
  sections: SectionAnalysis[];
}

export interface FeedbackItem {
  type: 'error' | 'warning' | 'suggestion' | 'success';
  category: 'content' | 'formatting' | 'structure' | 'keywords';
  message: string;
  section?: string;
  priority: 'high' | 'medium' | 'low';
}

export interface SectionAnalysis {
  name: string;
  score: number;
  issues: string[];
  suggestions: string[];
}

export interface Template {
  id: string;
  name: string;
  description: string;
  category: 'modern' | 'classic' | 'creative' | 'minimal';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    background: string;
  };
  preview: string;
  isPremium: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  resumes: string[];
  preferences: {
    theme: 'light' | 'dark';
    defaultTemplate: string;
  };
}

export interface UploadedFile {
  id: string;
  filename: string;
  originalName: string;
  size: number;
  type: string;
  uploadedAt: Date;
  userId?: string;
}
