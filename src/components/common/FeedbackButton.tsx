'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X } from 'lucide-react';
import FeedbackModal from './FeedbackModal';

export default function FeedbackButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
        className="fixed bottom-6 right-6 z-40"
      >
        <AnimatePresence mode="wait">
          {!isMinimized ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 max-w-xs"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-sm">Share Your Feedback</h3>
                  <p className="text-xs text-gray-600 mt-1">Help us improve your experience</p>
                </div>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-400" />
                </button>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Give Feedback</span>
              </motion.button>
            </motion.div>
          ) : (
            <motion.button
              key="minimized"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsModalOpen(true)}
              className="w-14 h-14 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group"
            >
              <MessageSquare className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(feedback) => {
          console.log('Feedback submitted:', feedback);
          // Here you would typically send to your analytics service
        }}
      />
    </>
  );
}
