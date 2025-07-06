'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Edit3, 
  Trash2, 
  Download, 
  Plus, 
  FileText, 
  Calendar,
  Eye,
  Copy,
  Star
} from 'lucide-react';
import Link from 'next/link';

interface SavedResume {
  id: string;
  templateId: string;
  templateName: string;
  title: string;
  content: string;
  lastModified: string;
  created: string;
  preview?: string;
  isFavorite?: boolean;
}

interface UserDashboardProps {
  userId?: string;
}

export default function UserDashboard({ userId }: UserDashboardProps) {
  const [savedResumes, setSavedResumes] = useState<SavedResume[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedResume, setSelectedResume] = useState<SavedResume | null>(null);

  useEffect(() => {
    // Load saved resumes from localStorage (in a real app, this would be from your API)
    const loadSavedResumes = () => {
      try {
        const saved = localStorage.getItem('savedResumes') || '[]';
        const resumes = JSON.parse(saved);
        setSavedResumes(resumes);
      } catch (error) {
        console.error('Error loading saved resumes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSavedResumes();
  }, []);

  const saveResume = (templateId: string, content: string, title?: string) => {
    const newResume: SavedResume = {
      id: Date.now().toString(),
      templateId,
      templateName: getTemplateName(templateId),
      title: title || `Resume ${savedResumes.length + 1}`,
      content,
      lastModified: new Date().toISOString(),
      created: new Date().toISOString(),
      isFavorite: false,
    };

    const updatedResumes = [...savedResumes, newResume];
    setSavedResumes(updatedResumes);
    localStorage.setItem('savedResumes', JSON.stringify(updatedResumes));
  };

  const deleteResume = (id: string) => {
    const updatedResumes = savedResumes.filter(resume => resume.id !== id);
    setSavedResumes(updatedResumes);
    localStorage.setItem('savedResumes', JSON.stringify(updatedResumes));
  };

  const toggleFavorite = (id: string) => {
    const updatedResumes = savedResumes.map(resume => 
      resume.id === id ? { ...resume, isFavorite: !resume.isFavorite } : resume
    );
    setSavedResumes(updatedResumes);
    localStorage.setItem('savedResumes', JSON.stringify(updatedResumes));
  };

  const duplicateResume = (resume: SavedResume) => {
    const duplicated: SavedResume = {
      ...resume,
      id: Date.now().toString(),
      title: `${resume.title} (Copy)`,
      created: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      isFavorite: false,
    };

    const updatedResumes = [...savedResumes, duplicated];
    setSavedResumes(updatedResumes);
    localStorage.setItem('savedResumes', JSON.stringify(updatedResumes));
  };

  const getTemplateName = (templateId: string): string => {
    // In a real app, you'd get this from your templates data
    const templateNames: Record<string, string> = {
      'modern-pro-1': 'Modern Professional',
      'classic-exec-1': 'Executive Classic',
      'minimal-pro-1': 'Minimalist Pro',
      // Add more mappings as needed
    };
    return templateNames[templateId] || 'Unknown Template';
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2 mb-4"></div>
                  <div className="flex space-x-2">
                    <div className="h-8 bg-gray-300 rounded flex-1"></div>
                    <div className="h-8 bg-gray-300 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Resumes
              </h1>
              <p className="text-xl text-gray-600 mt-2">
                Manage and edit your saved resume drafts
              </p>
            </div>
            <Link
              href="/create"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create New</span>
            </Link>
          </div>

          {savedResumes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved resumes yet</h3>
              <p className="text-gray-600 mb-6">Create your first resume to get started</p>
              <Link
                href="/create"
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                <span>Create Resume</span>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedResumes.map((resume, index) => (
                <motion.div
                  key={resume.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">
                          {resume.title}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {resume.templateName}
                        </p>
                        <div className="flex items-center text-xs text-gray-500 space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>Modified {formatDate(resume.lastModified)}</span>
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFavorite(resume.id)}
                        className={`p-2 rounded-full transition-colors ${
                          resume.isFavorite 
                            ? 'text-yellow-500 hover:text-yellow-600' 
                            : 'text-gray-400 hover:text-gray-500'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${resume.isFavorite ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedResume(resume)}
                        className="flex-1 bg-blue-50 text-blue-700 py-2 px-3 rounded-lg font-medium text-sm hover:bg-blue-100 transition-colors flex items-center justify-center space-x-1"
                      >
                        <Edit3 className="w-4 h-4" />
                        <span>Edit</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => duplicateResume(resume)}
                        className="bg-gray-50 text-gray-700 py-2 px-3 rounded-lg font-medium text-sm hover:bg-gray-100 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => deleteResume(resume.id)}
                        className="bg-red-50 text-red-700 py-2 px-3 rounded-lg font-medium text-sm hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Resume Editor Modal */}
      <AnimatePresence>
        {selectedResume && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedResume(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
            >
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Editing: {selectedResume.title}
                </h2>
                <button
                  onClick={() => setSelectedResume(null)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <Eye className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-sm text-gray-600">
                    Resume content and editing interface would be implemented here.
                    This would include form fields for personal information, experience, education, etc.
                  </p>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedResume(null)}
                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Save changes logic here
                      setSelectedResume(null);
                    }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:shadow-lg transition-all duration-300"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
