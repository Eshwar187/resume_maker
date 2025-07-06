'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Download, Eye, Star, CheckCircle, Palette, Layout, Briefcase, Lock } from 'lucide-react';
import { PulseLoader } from '@/components/ui/LoadingSpinner';
import Header from '@/components/common/Header';
import TemplatePreviewModal from '@/components/templates/TemplatePreviewModal';
import ResumeTemplatePreview from '@/components/templates/ResumeTemplatePreview';
import DownloadModal from '@/components/templates/DownloadModal';
import AuthModal from '@/components/common/AuthModal';
import { useAuth } from '@/contexts/AuthContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Template {
  id: string;
  name: string;
  description: string;
  category: 'modern' | 'classic' | 'creative' | 'minimal' | 'executive';
  atsOptimized: boolean;
  preview: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  features: string[];
  rating: number;
  downloads: number;
}

interface Category {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

// Import all templates from the create page
const templates: Template[] = [
  // Modern Templates (8)
  {
    id: 'modern-pro-1',
    name: 'Modern Professional',
    description: 'Clean, contemporary design perfect for tech and business professionals',
    category: 'modern',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#3B82F6', secondary: '#1E40AF', accent: '#10B981' },
    features: ['ATS Optimized', 'Clean Layout', 'Professional Fonts', 'Easy to Edit'],
    rating: 4.9,
    downloads: 15420,
  },
  {
    id: 'modern-tech-2',
    name: 'Tech Innovator',
    description: 'Perfect for software developers and tech professionals',
    category: 'modern',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#0F172A', secondary: '#334155', accent: '#06B6D4' },
    features: ['Tech Focused', 'ATS Optimized', 'Code-friendly', 'Modern Design'],
    rating: 4.9,
    downloads: 12850,
  },
  {
    id: 'modern-sleek-3',
    name: 'Sleek Modern',
    description: 'Ultra-modern design with sophisticated typography',
    category: 'modern',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#8B5CF6', secondary: '#7C3AED', accent: '#F59E0B' },
    features: ['Ultra Modern', 'ATS Safe', 'Typography Focus', 'Clean Sections'],
    rating: 4.8,
    downloads: 9670,
  },
  {
    id: 'modern-gradient-4',
    name: 'Gradient Pro',
    description: 'Modern design with subtle gradient accents',
    category: 'modern',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#6366F1', secondary: '#4F46E5', accent: '#EC4899' },
    features: ['Gradient Design', 'ATS Compatible', 'Modern Layout', 'Professional'],
    rating: 4.7,
    downloads: 8920,
  },
  {
    id: 'modern-bold-5',
    name: 'Bold Modern',
    description: 'Strong typography with modern aesthetic',
    category: 'modern',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#DC2626', secondary: '#B91C1C', accent: '#059669' },
    features: ['Bold Typography', 'ATS Optimized', 'Strong Design', 'Modern Style'],
    rating: 4.6,
    downloads: 7340,
  },
  {
    id: 'modern-startup-6',
    name: 'Startup Pro',
    description: 'Perfect for startup environments and entrepreneurs',
    category: 'modern',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#F59E0B', secondary: '#D97706', accent: '#3B82F6' },
    features: ['Startup Focused', 'ATS Safe', 'Entrepreneur Style', 'Innovation'],
    rating: 4.7,
    downloads: 6890,
  },
  {
    id: 'modern-digital-7',
    name: 'Digital Native',
    description: 'Built for digital-first professionals',
    category: 'modern',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#06B6D4', secondary: '#0891B2', accent: '#8B5CF6' },
    features: ['Digital Focus', 'ATS Compatible', 'Tech Style', 'Modern Layout'],
    rating: 4.8,
    downloads: 5670,
  },
  {
    id: 'modern-creative-8',
    name: 'Creative Modern',
    description: 'Perfect balance of creativity and professionalism',
    category: 'modern',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#10B981', secondary: '#059669', accent: '#F59E0B' },
    features: ['Creative Edge', 'ATS Optimized', 'Professional', 'Unique Design'],
    rating: 4.6,
    downloads: 5340,
  },

  // Classic Templates (6)
  {
    id: 'classic-exec-1',
    name: 'Executive Classic',
    description: 'Traditional format that works with all ATS systems',
    category: 'classic',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#374151', secondary: '#6B7280', accent: '#059669' },
    features: ['100% ATS Compatible', 'Traditional Layout', 'Corporate Style', 'Timeless Design'],
    rating: 4.8,
    downloads: 22100,
  },
  {
    id: 'classic-corporate-2',
    name: 'Corporate Standard',
    description: 'Perfect for corporate and business professionals',
    category: 'classic',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#1F2937', secondary: '#4B5563', accent: '#DC2626' },
    features: ['Corporate Style', '100% ATS Safe', 'Professional', 'Industry Standard'],
    rating: 4.8,
    downloads: 18700,
  },
  {
    id: 'classic-traditional-3',
    name: 'Traditional Pro',
    description: 'Time-tested format for conservative industries',
    category: 'classic',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#000000', secondary: '#374151', accent: '#059669' },
    features: ['Traditional Format', 'ATS Guaranteed', 'Conservative', 'Professional'],
    rating: 4.7,
    downloads: 15600,
  },
  {
    id: 'classic-finance-4',
    name: 'Finance Professional',
    description: 'Designed specifically for finance professionals',
    category: 'classic',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#1E40AF', secondary: '#3B82F6', accent: '#059669' },
    features: ['Finance Focused', 'ATS Compliant', 'Professional', 'Industry Specific'],
    rating: 4.7,
    downloads: 11250,
  },
  {
    id: 'classic-legal-5',
    name: 'Legal Professional',
    description: 'Perfect for lawyers and legal professionals',
    category: 'classic',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#7C2D12', secondary: '#A3A3A3', accent: '#059669' },
    features: ['Legal Format', 'ATS Compatible', 'Professional', 'Conservative'],
    rating: 4.6,
    downloads: 8930,
  },
  {
    id: 'classic-academic-6',
    name: 'Academic Professional',
    description: 'Ideal for academic and research positions',
    category: 'classic',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#374151', secondary: '#6B7280', accent: '#7C3AED' },
    features: ['Academic Focus', 'ATS Safe', 'Research Style', 'Professional'],
    rating: 4.8,
    downloads: 7650,
  },

  // Creative Templates (5)
  {
    id: 'creative-edge-1',
    name: 'Creative Edge',
    description: 'Stylish design while maintaining ATS compatibility',
    category: 'creative',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#7C3AED', secondary: '#A855F7', accent: '#EC4899' },
    features: ['Creative Layout', 'ATS Compatible', 'Eye-catching', 'Modern Typography'],
    rating: 4.6,
    downloads: 12800,
  },
  {
    id: 'creative-design-2',
    name: 'Designer Pro',
    description: 'Perfect for designers and creative professionals',
    category: 'creative',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#EC4899', secondary: '#BE185D', accent: '#F59E0B' },
    features: ['Design Focus', 'ATS Optimized', 'Creative Style', 'Portfolio Ready'],
    rating: 4.7,
    downloads: 9840,
  },
  {
    id: 'creative-marketing-3',
    name: 'Marketing Creative',
    description: 'Built for marketing and advertising professionals',
    category: 'creative',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#F59E0B', secondary: '#D97706', accent: '#EC4899' },
    features: ['Marketing Focus', 'ATS Safe', 'Creative Edge', 'Brand Style'],
    rating: 4.5,
    downloads: 7620,
  },
  {
    id: 'creative-media-4',
    name: 'Media Professional',
    description: 'Ideal for media and communications roles',
    category: 'creative',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#06B6D4', secondary: '#0891B2', accent: '#EC4899' },
    features: ['Media Focus', 'ATS Compatible', 'Creative Design', 'Communications'],
    rating: 4.6,
    downloads: 6340,
  },
  {
    id: 'creative-freelance-5',
    name: 'Freelancer Pro',
    description: 'Perfect for freelancers and consultants',
    category: 'creative',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#8B5CF6', secondary: '#7C3AED', accent: '#10B981' },
    features: ['Freelance Focus', 'ATS Optimized', 'Flexible Design', 'Professional'],
    rating: 4.4,
    downloads: 5780,
  },

  // Minimal Templates (4)
  {
    id: 'minimal-pro-1',
    name: 'Minimalist Pro',
    description: 'Simple, elegant design focusing on content clarity',
    category: 'minimal',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#111827', secondary: '#6B7280', accent: '#F59E0B' },
    features: ['Ultra Clean', 'Content Focused', 'ATS Friendly', 'Minimal Styling'],
    rating: 4.7,
    downloads: 18350,
  },
  {
    id: 'minimal-clean-2',
    name: 'Clean Minimal',
    description: 'Pure minimalism with maximum impact',
    category: 'minimal',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#374151', secondary: '#9CA3AF', accent: '#3B82F6' },
    features: ['Pure Minimal', 'ATS Safe', 'Content First', 'Clean Lines'],
    rating: 4.6,
    downloads: 13240,
  },
  {
    id: 'minimal-elegant-3',
    name: 'Elegant Minimal',
    description: 'Sophisticated minimalism with elegant typography',
    category: 'minimal',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#000000', secondary: '#6B7280', accent: '#DC2626' },
    features: ['Elegant Design', 'ATS Compatible', 'Typography Focus', 'Sophisticated'],
    rating: 4.8,
    downloads: 9870,
  },
  {
    id: 'minimal-simple-4',
    name: 'Simple Pro',
    description: 'Straightforward design that gets results',
    category: 'minimal',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#1F2937', secondary: '#9CA3AF', accent: '#059669' },
    features: ['Simple Design', 'ATS Guaranteed', 'Results Focused', 'Easy to Read'],
    rating: 4.5,
    downloads: 7450,
  },

  // Executive Templates (2)
  {
    id: 'executive-leader-1',
    name: 'Executive Leader',
    description: 'Premium design for C-level executives',
    category: 'executive',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#1F2937', secondary: '#374151', accent: '#DC2626' },
    features: ['Executive Level', 'ATS Optimized', 'Premium Design', 'Leadership Focus'],
    rating: 4.9,
    downloads: 4560,
  },
  {
    id: 'executive-senior-2',
    name: 'Senior Executive',
    description: 'Sophisticated design for senior management',
    category: 'executive',
    atsOptimized: true,
    preview: '/api/placeholder/400/600',
    colors: { primary: '#0F172A', secondary: '#1E293B', accent: '#059669' },
    features: ['Senior Level', 'ATS Compatible', 'Sophisticated', 'Management Focus'],
    rating: 4.8,
    downloads: 3890,
  },
];

const categories: Category[] = [
  { id: 'all', label: 'All Templates', icon: Layout },
  { id: 'modern', label: 'Modern', icon: Palette },
  { id: 'classic', label: 'Classic', icon: Briefcase },
  { id: 'creative', label: 'Creative', icon: Star },
  { id: 'minimal', label: 'Minimal', icon: FileText },
  { id: 'executive', label: 'Executive', icon: Star },
];

const TemplateCard: React.FC<{
  template: Template;
  index: number;
  handlePreview: (id: string) => void;
  handleDownload: (id: string) => void;
  isDownloading: string | null;
  isLoggedIn: boolean;
  setShowAuthModal: (show: boolean) => void;
}> = ({ template, index, handlePreview, handleDownload, isDownloading, isLoggedIn, setShowAuthModal }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1, duration: 0.8 }}
    className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
  >
    <div className="relative group">
      <ResumeTemplatePreview
        colors={template.colors}
        category={template.category}
        className="w-full h-[250px]"
      />
      {template.atsOptimized && (
        <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
          <CheckCircle className="w-3 h-3" />
          <span>ATS</span>
        </div>
      )}
      <div className="absolute top-3 right-3 bg-white/90 text-gray-700 px-2 py-1 rounded-full text-xs font-medium capitalize">
        {template.category}
      </div>
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
        <button
          onClick={() => isLoggedIn ? handlePreview(template.id) : setShowAuthModal(true)}
          className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2 relative"
          aria-label={`Preview ${template.name}`}
        >
          {isLoggedIn ? <Eye className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          <span>{isLoggedIn ? 'Preview' : 'Preview'}</span>
          {!isLoggedIn && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center">
              <Lock className="w-2 h-2 text-white" />
            </div>
          )}
        </button>
        <button
          onClick={() => isLoggedIn ? handleDownload(template.id) : setShowAuthModal(true)}
          disabled={isDownloading === template.id}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 relative"
          aria-label={`Download ${template.name}`}
        >
          {isDownloading === template.id ? (
            <PulseLoader count={3} />
          ) : (
            <>
              {isLoggedIn ? <Download className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span>{isLoggedIn ? 'Download' : 'Download'}</span>
              {!isLoggedIn && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Lock className="w-2 h-2 text-white" />
                </div>
              )}
            </>
          )}
        </button>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{template.name}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{template.description}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {template.features.slice(0, 2).map((feature, i) => (
          <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
            {feature}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <div className="flex items-center space-x-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span>{template.rating.toFixed(1)}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Download className="w-4 h-4" />
          <span>{template.downloads.toLocaleString()}</span>
        </div>
      </div>
      <div className="flex space-x-3">
        <button
          onClick={() => isLoggedIn ? handlePreview(template.id) : setShowAuthModal(true)}
          className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-1 relative"
        >
          {isLoggedIn ? <Eye className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          <span>Preview</span>
          {!isLoggedIn && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full"></div>
          )}
        </button>
        <button
          onClick={() => isLoggedIn ? handleDownload(template.id) : setShowAuthModal(true)}
          disabled={isDownloading === template.id}
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-1 relative"
        >
          {isDownloading === template.id ? (
            'Downloading...'
          ) : (
            <>
              {isLoggedIn ? <Download className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              <span>Download</span>
              {!isLoggedIn && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full"></div>
              )}
            </>
          )}
        </button>
      </div>
    </div>
  </motion.div>
);

export default function TemplatesPage() {
  const { login, isLoggedIn } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isDownloading, setIsDownloading] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [downloadTemplate, setDownloadTemplate] = useState<Template | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const filteredTemplates = selectedCategory === 'all'
    ? templates
    : templates.filter((template) => template.category === selectedCategory);

  const handleDownload = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setDownloadTemplate(template);
      setIsDownloadModalOpen(true);
    }
  };

  const performDownload = async (format: 'pdf' | 'docx') => {
    if (!downloadTemplate) return;
    
    setIsDownloading(downloadTemplate.id);
    
    try {
      if (format === 'pdf') {
        // Create a temporary element with the template preview
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        tempDiv.style.width = '210mm';
        tempDiv.style.minHeight = '297mm';
        document.body.appendChild(tempDiv);
        
        // You would render the full template here
        tempDiv.innerHTML = `<div style="padding: 20px; background: white;">
          <h1>${downloadTemplate.name}</h1>
          <p>This is a sample resume template download.</p>
        </div>`;
        
        const canvas = await html2canvas(tempDiv, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff'
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${downloadTemplate.name.replace(/\s+/g, '_')}_Template.pdf`);
        
        document.body.removeChild(tempDiv);
      } else {
        // Simple text download for DOCX
        const content = `${downloadTemplate.name}\n\nThis is a downloadable template in Word format.`;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${downloadTemplate.name.replace(/\s+/g, '_')}_Template.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(null);
      setIsDownloadModalOpen(false);
      setDownloadTemplate(null);
    }
  };

  const openPreview = (template: Template) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setSelectedTemplate(null);
  };

  const handlePreview = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      openPreview(template);
    }
  };

  const handleAuthSuccess = () => {
    // Create a mock user object since login is handled by the AuthModal
    const mockUser = {
      id: Date.now().toString(),
      name: 'User', 
      email: 'user@example.com'
    };
    login(mockUser);
    setShowAuthModal(false);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              ATS-Optimized Resume Templates
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choose from our collection of 25 professionally designed, ATS-friendly resume templates. All templates are 100% free and optimized to pass through applicant tracking systems.
            </p>
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">100% ATS Compatible</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                  aria-label={`Filter by ${category.label}`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </motion.div>

          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map((template, index) => (
                  <TemplateCard
                    key={template.id}
                    template={template}
                    index={index}
                    handlePreview={handlePreview}
                    handleDownload={handleDownload}
                    isDownloading={isDownloading}
                    isLoggedIn={isLoggedIn}
                    setShowAuthModal={setShowAuthModal}
                  />
                ))
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center text-gray-600 text-lg"
                >
                  No templates found for this category.
                </motion.p>
              )}
            </motion.div>
			</AnimatePresence>
          <TemplatePreviewModal
            isOpen={isPreviewOpen}
            onClose={closePreview}
            template={selectedTemplate}
            saveWork={(id, content) => console.log(`Saved work for template ${id}:`, content)}
          />
          
          <DownloadModal
            isOpen={isDownloadModalOpen}
            onClose={() => {
              setIsDownloadModalOpen(false);
              setDownloadTemplate(null);
            }}
            templateName={downloadTemplate?.name || ''}
            onDownload={performDownload}
          />
          
          <AuthModal 
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            onSuccess={handleAuthSuccess}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-16 bg-white rounded-2xl p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Why Choose Our ATS-Optimized Templates?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: CheckCircle,
                  title: '100% ATS Compatible',
                  description: 'All templates are designed to pass through applicant tracking systems without issues.',
                  color: 'green',
                },
                {
                  icon: Download,
                  title: 'Free Downloads',
                  description: 'All templates are completely free to download and use for your job applications.',
                  color: 'blue',
                },
                {
                  icon: Palette,
                  title: 'Professional Design',
                  description: 'Modern, clean designs that make a great impression while maintaining readability.',
                  color: 'purple',
                },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 bg-${item.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <item.icon className={`w-6 h-6 text-${item.color}-600`} />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

