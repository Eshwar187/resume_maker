'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  Download, 
  ArrowRight, 
  CheckCircle, 
  Star,
  Eye,
  Edit3,
  Search,
  Filter,
  Sparkles,
  Zap,
  Layout,
  Palette,
 Briefcase,
  Lock
} from 'lucide-react';
import Header from '@/components/common/Header';
import { PulseLoader } from '@/components/ui/LoadingSpinner';
import AuthModal from '@/components/common/AuthModal';
import TemplatePreviewModal from '@/components/templates/TemplatePreviewModal';
import ResumeTemplatePreview from '@/components/templates/ResumeTemplatePreview';
import DownloadModal from '@/components/templates/DownloadModal';
import { useAuth } from '@/contexts/AuthContext';

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
  isPremium: boolean;
}

interface Category {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  count: number;
}

// 25 ATS-Optimized Resume Templates
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: false,
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
    isPremium: true,
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
    isPremium: true,
  },
];

const categories: Category[] = [
  { id: 'all', label: 'All Templates', icon: Layout, count: 25 },
  { id: 'modern', label: 'Modern', icon: Sparkles, count: 8 },
  { id: 'classic', label: 'Classic', icon: Briefcase, count: 6 },
  { id: 'creative', label: 'Creative', icon: Palette, count: 5 },
  { id: 'minimal', label: 'Minimal', icon: FileText, count: 4 },
  { id: 'executive', label: 'Executive', icon: Star, count: 2 },
];

export default function CreatePage() {
  const { isLoggedIn, login } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [downloadTemplate, setDownloadTemplate] = useState<Template | null>(null);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleTemplateSelect = (template: Template) => {
    if (!isLoggedIn) {
      setShowAuthModal(true);
      setSelectedTemplate(template);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to editor with selected template
      console.log('Creating resume with template:', template.id);
    }, 2000);
  };

  const handleAuthSuccess = () => {
    // Create a mock user object since login is handled by the AuthModal
    const mockUser = {
      id: Date.now().toString(),
      name: 'User',
      email: 'user@example.com'
    };
    login(mockUser);
    if (selectedTemplate) {
      handleTemplateSelect(selectedTemplate);
      setSelectedTemplate(null);
    }
  };

  const openPreview = (template: Template) => {
    setPreviewTemplate(template);
    setIsPreviewOpen(true);
  };

  const closePreview = () => {
    setIsPreviewOpen(false);
    setPreviewTemplate(null);
  };

  const handleDirectDownload = (template: Template) => {
    setDownloadTemplate(template);
    setIsDownloadModalOpen(true);
  };

  const performDirectDownload = async (format: 'pdf' | 'docx') => {
    if (!downloadTemplate) return;
    
    try {
      // Simple download simulation - in production you'd generate actual files
      const content = `${downloadTemplate.name} Resume Template\n\nThis would be a properly formatted ${format.toUpperCase()} resume template.`;
      
      if (format === 'pdf') {
        // In production, you'd use a PDF generation library
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${downloadTemplate.name.replace(/\s+/g, '_')}_Template.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        // For DOCX format
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
      setIsDownloadModalOpen(false);
      setDownloadTemplate(null);
    }
  };

  const TemplateCard = ({ template, index }: { template: Template; index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
    >
      {template.isPremium && (
        <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 z-10">
          <Star className="w-3 h-3" />
          <span>Premium</span>
        </div>
      )}
      
      <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 z-10">
        <CheckCircle className="w-3 h-3" />
        <span>ATS</span>
      </div>

      <div className="relative h-64 overflow-hidden">
        <ResumeTemplatePreview
          colors={template.colors}
          category={template.category}
          className="w-full h-full"
        />
        
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => isLoggedIn ? openPreview(template) : setShowAuthModal(true)}
            className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center space-x-2 relative"
          >
            {isLoggedIn ? <Eye className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            <span>Preview</span>
            {!isLoggedIn && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center">
                <Lock className="w-2 h-2 text-white" />
              </div>
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleTemplateSelect(template)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
          >
            <Edit3 className="w-4 h-4" />
            <span>Use Template</span>
          </motion.button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {template.name}
          </h3>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full capitalize">
            {template.category}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {template.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {template.features.slice(0, 3).map((feature, i) => (
            <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
              {feature}
            </span>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium">{template.rating}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Download className="w-4 h-4" />
            <span>{template.downloads.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => isLoggedIn ? handleDirectDownload(template) : setShowAuthModal(true)}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 relative"
          >
            {isLoggedIn ? <Download className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            <span>Download</span>
            {!isLoggedIn && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full"></div>
            )}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleTemplateSelect(template)}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <span>Create</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Zap className="w-10 h-10 text-white" />
              </motion.div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Creating Your Resume</h2>
            <p className="text-gray-600 mb-6">Setting up your professional resume builder...</p>
            <div className="flex justify-center">
              <PulseLoader count={3} />
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Create Your Perfect Resume
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choose from 25 professionally designed, ATS-optimized templates. 
              Build your resume in minutes with our intuitive editor.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
                <CheckCircle className="w-4 h-4" />
                <span className="font-semibold">100% ATS Compatible</span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                <Zap className="w-4 h-4" />
                <span className="font-semibold">Real-time Editor</span>
              </div>
              <div className="flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full">
                <Download className="w-4 h-4" />
                <span className="font-semibold">Instant PDF Export</span>
              </div>
            </div>
          </motion.div>

          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Filter className="w-4 h-4" />
                <span>{filteredTemplates.length} templates found</span>
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105'
                        : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.label}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedCategory === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {category.count}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Templates Grid */}
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map((template, index) => (
                  <TemplateCard key={template.id} template={template} index={index} />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="col-span-full text-center py-16"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No templates found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-20 bg-white rounded-3xl p-8 md:p-12 shadow-xl"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why Choose Our Resume Builder?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to create a professional resume that gets you hired
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: CheckCircle,
                  title: 'ATS-Optimized',
                  description: 'All templates pass through applicant tracking systems with ease',
                  color: 'green',
                },
                {
                  icon: Zap,
                  title: 'Real-time Editor',
                  description: 'See your changes instantly as you build your perfect resume',
                  color: 'blue',
                },
                {
                  icon: Download,
                  title: 'Instant Export',
                  description: 'Download your resume as PDF instantly, ready for applications',
                  color: 'purple',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  className="text-center group"
                >
                  <div className={`w-16 h-16 bg-${feature.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => {
          setShowAuthModal(false);
          setSelectedTemplate(null);
        }}
        onSuccess={handleAuthSuccess}
      />

      {/* Template Preview Modal */}
      <TemplatePreviewModal
        isOpen={isPreviewOpen}
        onClose={closePreview}
        template={previewTemplate}
        saveWork={(id, content) => console.log(`Saved work for template ${id}:`, content)}
      />
      
      {/* Download Modal */}
      <DownloadModal
        isOpen={isDownloadModalOpen}
        onClose={() => {
          setIsDownloadModalOpen(false);
          setDownloadTemplate(null);
        }}
        templateName={downloadTemplate?.name || ''}
        onDownload={performDirectDownload}
      />
    </>
  );
}
