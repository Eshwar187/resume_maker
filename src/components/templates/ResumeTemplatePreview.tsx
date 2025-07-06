'use client';

import React from 'react';

interface ResumeTemplatePreviewProps {
  templateId: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  category: 'modern' | 'classic' | 'creative' | 'minimal' | 'executive';
  className?: string;
}

const ResumeTemplatePreview: React.FC<ResumeTemplatePreviewProps> = ({
  templateId,
  colors,
  category,
  className = ''
}) => {
  const renderModernTemplate = () => (
    <div className={`w-full h-full bg-white text-xs ${className}`} style={{ fontSize: '6px' }}>
      {/* Header */}
      <div className="h-16 flex items-center px-3" style={{ backgroundColor: colors.primary }}>
        <div className="w-8 h-8 rounded-full bg-white mr-2"></div>
        <div className="text-white">
          <div className="font-bold text-sm">John Smith</div>
          <div className="text-xs opacity-90">Software Developer</div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-3 space-y-2">
        <div className="flex space-x-3">
          <div className="flex-1">
            <div className="font-bold text-xs mb-1" style={{ color: colors.primary }}>EXPERIENCE</div>
            <div className="space-y-1">
              <div className="font-semibold text-xs">Senior Developer</div>
              <div className="text-xs opacity-70">Tech Corp • 2020-2023</div>
              <div className="h-2 bg-gray-100 rounded"></div>
              <div className="h-1 bg-gray-100 rounded w-3/4"></div>
            </div>
          </div>
          <div className="w-20">
            <div className="font-bold text-xs mb-1" style={{ color: colors.primary }}>SKILLS</div>
            <div className="space-y-1">
              <div className="h-1 rounded" style={{ backgroundColor: colors.accent }}></div>
              <div className="h-1 bg-gray-200 rounded"></div>
              <div className="h-1 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderClassicTemplate = () => (
    <div className={`w-full h-full bg-white text-xs ${className}`} style={{ fontSize: '6px' }}>
      {/* Header */}
      <div className="text-center p-3 border-b">
        <div className="font-bold text-lg">JOHN SMITH</div>
        <div className="text-xs" style={{ color: colors.primary }}>Software Developer</div>
        <div className="text-xs mt-1 opacity-70">john@email.com • (555) 123-4567</div>
      </div>
      
      {/* Content */}
      <div className="p-3 space-y-2">
        <div>
          <div className="font-bold text-xs mb-1 border-b" style={{ borderColor: colors.primary }}>
            PROFESSIONAL EXPERIENCE
          </div>
          <div className="space-y-1">
            <div className="font-semibold text-xs">Senior Software Developer</div>
            <div className="text-xs opacity-70">Technology Corporation, 2020-2023</div>
            <div className="h-2 bg-gray-100 rounded"></div>
            <div className="h-1 bg-gray-100 rounded w-4/5"></div>
          </div>
        </div>
        
        <div>
          <div className="font-bold text-xs mb-1 border-b" style={{ borderColor: colors.primary }}>
            EDUCATION
          </div>
          <div className="h-2 bg-gray-100 rounded"></div>
        </div>
      </div>
    </div>
  );

  const renderCreativeTemplate = () => (
    <div className={`w-full h-full bg-white text-xs ${className}`} style={{ fontSize: '6px' }}>
      {/* Sidebar */}
      <div className="flex h-full">
        <div className="w-16 p-2" style={{ backgroundColor: colors.primary }}>
          <div className="w-8 h-8 rounded-full bg-white mx-auto mb-2"></div>
          <div className="text-white text-center">
            <div className="font-bold text-xs">JOHN</div>
            <div className="text-xs">SMITH</div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="text-white text-xs font-bold">SKILLS</div>
            <div className="space-y-1">
              <div className="h-1 bg-white rounded"></div>
              <div className="h-1 bg-white/70 rounded"></div>
              <div className="h-1 bg-white/50 rounded"></div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-3">
          <div className="text-lg font-bold" style={{ color: colors.accent }}>
            Creative Designer
          </div>
          <div className="mt-2 space-y-2">
            <div>
              <div className="font-bold text-xs" style={{ color: colors.primary }}>EXPERIENCE</div>
              <div className="h-2 bg-gray-100 rounded mt-1"></div>
              <div className="h-1 bg-gray-100 rounded mt-1 w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMinimalTemplate = () => (
    <div className={`w-full h-full bg-white text-xs ${className}`} style={{ fontSize: '6px' }}>
      {/* Header */}
      <div className="p-3">
        <div className="text-2xl font-light">John Smith</div>
        <div className="text-xs opacity-70 mt-1">Software Developer</div>
        <div className="text-xs opacity-50 mt-1">john@email.com • linkedin.com/in/johnsmith</div>
      </div>
      
      {/* Content */}
      <div className="px-3 space-y-3">
        <div>
          <div className="text-xs font-medium mb-1">Experience</div>
          <div className="space-y-2">
            <div>
              <div className="text-xs font-medium">Senior Software Developer</div>
              <div className="text-xs opacity-70">Tech Company • 2020-Present</div>
              <div className="h-1 bg-gray-200 rounded mt-1"></div>
              <div className="h-1 bg-gray-200 rounded mt-1 w-4/5"></div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="text-xs font-medium mb-1">Skills</div>
          <div className="flex flex-wrap gap-1">
            <div className="h-2 w-6 bg-gray-200 rounded"></div>
            <div className="h-2 w-8 bg-gray-200 rounded"></div>
            <div className="h-2 w-6 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExecutiveTemplate = () => (
    <div className={`w-full h-full bg-white text-xs ${className}`} style={{ fontSize: '6px' }}>
      {/* Header */}
      <div className="text-center p-4 border-b-2" style={{ borderColor: colors.primary }}>
        <div className="text-2xl font-bold">JOHN SMITH</div>
        <div className="text-sm font-medium mt-1" style={{ color: colors.primary }}>
          CHIEF EXECUTIVE OFFICER
        </div>
        <div className="text-xs mt-2 opacity-70">
          Executive Leadership • Strategic Planning • Business Development
        </div>
      </div>
      
      {/* Content */}
      <div className="p-3 space-y-2">
        <div>
          <div className="text-xs font-bold mb-1" style={{ color: colors.primary }}>
            EXECUTIVE SUMMARY
          </div>
          <div className="h-2 bg-gray-100 rounded"></div>
          <div className="h-1 bg-gray-100 rounded mt-1 w-5/6"></div>
        </div>
        
        <div>
          <div className="text-xs font-bold mb-1" style={{ color: colors.primary }}>
            PROFESSIONAL EXPERIENCE
          </div>
          <div className="space-y-1">
            <div className="font-semibold text-xs">Chief Executive Officer</div>
            <div className="text-xs opacity-70">Fortune 500 Company • 2018-Present</div>
            <div className="h-1 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate = () => {
    switch (category) {
      case 'modern':
        return renderModernTemplate();
      case 'classic':
        return renderClassicTemplate();
      case 'creative':
        return renderCreativeTemplate();
      case 'minimal':
        return renderMinimalTemplate();
      case 'executive':
        return renderExecutiveTemplate();
      default:
        return renderModernTemplate();
    }
  };

  return (
    <div className="w-full h-64 bg-gray-50 rounded-lg overflow-hidden shadow-sm border">
      {renderTemplate()}
    </div>
  );
};

export default ResumeTemplatePreview;
