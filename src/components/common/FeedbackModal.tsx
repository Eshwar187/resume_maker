'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Send, MessageSquare, ThumbsUp, ThumbsDown, AlertCircle } from 'lucide-react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (feedback: FeedbackData) => void;
}

interface FeedbackData {
  rating: number;
  category: 'general' | 'template' | 'feature' | 'bug' | 'suggestion';
  message: string;
  email?: string;
  page: string;
}

export default function FeedbackModal({ isOpen, onClose, onSubmit }: FeedbackModalProps) {
  const [feedback, setFeedback] = useState<FeedbackData>({
    rating: 0,
    category: 'general',
    message: '',
    email: '',
    page: typeof window !== 'undefined' ? window.location.pathname : '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [
    { id: 'general', label: 'General Feedback', icon: MessageSquare },
    { id: 'template', label: 'Template Issue', icon: AlertCircle },
    { id: 'feature', label: 'Feature Request', icon: ThumbsUp },
    { id: 'bug', label: 'Bug Report', icon: ThumbsDown },
    { id: 'suggestion', label: 'Suggestion', icon: Star },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (feedback.rating === 0 || !feedback.message.trim()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store feedback in localStorage for demo
      const existingFeedback = JSON.parse(localStorage.getItem('userFeedback') || '[]');
      existingFeedback.push({
        ...feedback,
        timestamp: new Date().toISOString(),
        id: Date.now().toString(),
      });
      localStorage.setItem('userFeedback', JSON.stringify(existingFeedback));
      
      onSubmit?.(feedback);
      setIsSubmitted(true);
      
      setTimeout(() => {
        onClose();
        setIsSubmitted(false);
        setFeedback({
          rating: 0,
          category: 'general',
          message: '',
          email: '',
          page: typeof window !== 'undefined' ? window.location.pathname : '',
        });
      }, 2000);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRatingClick = (rating: number) => {
    setFeedback(prev => ({ ...prev, rating }));
  };

  if (!isOpen) return null;

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
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-8"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <ThumbsUp className="w-8 h-8 text-green-600" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600">Your feedback helps us improve the experience for everyone.</p>
            </motion.div>
          ) : (
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Share Your Feedback</h2>
                <p className="text-gray-600">Help us improve your resume building experience</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    How would you rate your experience?
                  </label>
                  <div className="flex justify-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRatingClick(star)}
                        className={`p-1 rounded-full transition-colors ${
                          star <= feedback.rating
                            ? 'text-yellow-400 hover:text-yellow-500'
                            : 'text-gray-300 hover:text-gray-400'
                        }`}
                      >
                        <Star className="w-8 h-8 fill-current" />
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Category
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <motion.button
                          key={category.id}
                          type="button"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFeedback(prev => ({ ...prev, category: category.id as 'general' | 'feature' | 'bug' | 'improvement' }))}
                          className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors text-sm ${
                            feedback.category === category.id
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span>{category.label}</span>
                        </motion.button>
                      );
                    })}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    value={feedback.message}
                    onChange={(e) => setFeedback(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Tell us about your experience, suggestions, or any issues you encountered..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    required
                  />
                </div>

                {/* Email (Optional) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={feedback.email}
                    onChange={(e) => setFeedback(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your@email.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Leave your email if you&apos;d like us to follow up with you
                  </p>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting || feedback.rating === 0 || !feedback.message.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Feedback</span>
                    </>
                  )}
                </motion.button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
