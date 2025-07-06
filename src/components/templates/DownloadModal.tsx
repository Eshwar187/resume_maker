'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, FileText, FileCheck, Loader2 } from 'lucide-react';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
  onDownload: (format: 'pdf' | 'docx') => Promise<void>;
}

export default function DownloadModal({ isOpen, onClose, templateName, onDownload }: DownloadModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'docx'>('pdf');
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await onDownload(selectedFormat);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Download Resume
            </h2>
            <p className="text-gray-600">
              Choose your preferred format for <span className="font-semibold">{templateName}</span>
            </p>
          </div>

          <div className="space-y-3 mb-6">
            {/* PDF Option */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                selectedFormat === 'pdf'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedFormat('pdf')}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedFormat === 'pdf'
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedFormat === 'pdf' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 bg-white rounded-full"
                    />
                  )}
                </div>
                <FileText className={`w-8 h-8 ${
                  selectedFormat === 'pdf' ? 'text-blue-500' : 'text-gray-400'
                }`} />
                <div className="flex-1">
                  <h3 className={`font-semibold ${
                    selectedFormat === 'pdf' ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    PDF Format
                  </h3>
                  <p className="text-sm text-gray-600">
                    Perfect for job applications, preserves formatting
                  </p>
                </div>
              </div>
            </motion.div>

            {/* DOCX Option */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                selectedFormat === 'docx'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedFormat('docx')}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedFormat === 'docx'
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {selectedFormat === 'docx' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-3 h-3 bg-white rounded-full"
                    />
                  )}
                </div>
                <FileCheck className={`w-8 h-8 ${
                  selectedFormat === 'docx' ? 'text-blue-500' : 'text-gray-400'
                }`} />
                <div className="flex-1">
                  <h3 className={`font-semibold ${
                    selectedFormat === 'docx' ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    Word Document
                  </h3>
                  <p className="text-sm text-gray-600">
                    Editable format, great for customization
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Downloading...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download {selectedFormat.toUpperCase()}</span>
                </>
              )}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
