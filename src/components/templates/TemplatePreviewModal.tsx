'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Edit3 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import FullResumePreview from './FullResumePreview';
import DownloadModal from './DownloadModal';

interface TemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  template: Template | null;
  saveWork: (templateId: string, content: string) => void;
}

interface Template {
  id: string;
  name: string;
  preview: string;
  category: 'modern' | 'classic' | 'creative' | 'minimal' | 'executive';
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function TemplatePreviewModal({ isOpen, onClose, template, saveWork }: TemplatePreviewModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const handleDownload = async (format: 'pdf' | 'docx') => {
    setIsGenerating(true);
    const previewElement = document.getElementById('preview-area');
    
    if (previewElement && format === 'pdf') {
      // PDF generation
      const canvas = await html2canvas(previewElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${template?.name.replace(/\s+/g, '_') || 'Resume'}_Resume.pdf`);
    } else if (format === 'docx') {
      // For DOCX, we'll create a simple downloadable file
      // In a real implementation, you'd use a library like docx or call an API
      const docxContent = generateDocxContent();
      const blob = new Blob([docxContent], { 
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' 
      });
      
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${template?.name.replace(/\s+/g, '_') || 'Resume'}_Resume.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
    
    setIsGenerating(false);
  };

  const generateDocxContent = () => {
    // This is a simplified DOCX content - in production you'd use a proper library
    return `
JOHN SMITH
Senior Software Developer

CONTACT INFORMATION
Email: john.smith@email.com
Phone: (555) 123-4567
LinkedIn: /in/johnsmith

PROFESSIONAL SUMMARY
Experienced Senior Software Developer with 8+ years of expertise in full-stack development, cloud architecture, and team leadership. Proven track record of delivering scalable applications and mentoring junior developers.

PROFESSIONAL EXPERIENCE

Senior Software Developer | TechCorp Solutions | 2020 - Present
• Led development of microservices architecture serving 1M+ users
• Mentored 5 junior developers and established code review standards
• Improved application performance by 40% through optimization
• Implemented CI/CD pipelines reducing deployment time by 60%

Full Stack Developer | Innovation Labs | 2018 - 2020
• Developed responsive web applications using React and Node.js
• Collaborated with UX team to implement pixel-perfect designs
• Built RESTful APIs and integrated third-party services

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2012 - 2016
Magna Cum Laude, GPA: 3.8/4.0

TECHNICAL SKILLS
• Programming Languages: JavaScript, TypeScript, Python, Java
• Frameworks: React, Node.js, Express, Django
• Databases: PostgreSQL, MongoDB, Redis
• Cloud & DevOps: AWS, Docker, Kubernetes, Jenkins
`;
  };

  const handleSave = () => {
    if (!template) return;
    const previewContent = document.getElementById('preview-area')?.innerHTML || '';
    saveWork(template.id, previewContent);
    onClose();
  };

  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }

    if (isOpen) {
      window.addEventListener('keydown', handleEscKey);
    }

    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !template) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-6"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {template?.name || 'Template'} Preview
          </h2>

          <div id="preview-area" className="bg-gray-100 p-4 rounded-lg border max-h-[70vh] overflow-y-auto">
            <div className="flex justify-center">
              {template && (
                <FullResumePreview
                  colors={template.colors}
                  category={template.category}
                  className="transform scale-75 origin-top"
                />
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Edit3 className="w-4 h-4" />
              <span>Use Template</span>
            </button>
            
            <button
              onClick={() => setShowDownloadModal(true)}
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 hover:shadow-lg transition-all duration-300"
              disabled={isGenerating}
            >
              <Download className="w-4 h-4" />
              <span>Download Resume</span>
            </button>
          </div>
          
          <DownloadModal
            isOpen={showDownloadModal}
            onClose={() => setShowDownloadModal(false)}
            templateName={template.name}
            onDownload={handleDownload}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
