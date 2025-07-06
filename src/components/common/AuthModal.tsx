'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Eye, EyeOff, CheckCircle, AlertCircle } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loadingPhase, setLoadingPhase] = useState<'idle' | 'validating' | 'processing' | 'success'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (isSignUp && !formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (isSignUp && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setLoadingPhase('validating');
    
    // Simulate validation phase
    setTimeout(() => {
      setLoadingPhase('processing');
      
      // Simulate processing phase
      setTimeout(() => {
        setLoadingPhase('success');
        
        // Show success state briefly
        setTimeout(() => {
          setIsLoading(false);
          setLoadingPhase('idle');
          onSuccess?.();
          onClose();
          // Reset form
          setFormData({
            fullName: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
          setErrors({});
        }, 1000);
      }, 1500);
    }, 800);
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
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
          className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-8"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold gradient-text mb-2">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-gray-600">
              {isSignUp 
                ? 'Join thousands of job seekers'
                : 'Sign in to your account'
              }
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
{isSignUp && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Full Name"
                  className={`peer w-full px-4 py-3 border ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-lg focus:ring-2 transition-all duration-300`}
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  required
                />
                <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 peer-focus:text-blue-500" />
                {errors.fullName && <AlertCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" />}
                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
              </div>
            )}
            
<div className="relative">
              <input
                type="email"
                placeholder="Email"
                className={`peer w-full px-4 py-3 border ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-lg focus:ring-2 transition-all duration-300`}
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
              />
              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 peer-focus:text-blue-500" />
              {errors.email && <AlertCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" />}
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
<div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className={`peer w-full px-4 py-3 border ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-lg focus:ring-2 transition-all duration-300`}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
              />
              <Lock className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 peer-focus:text-blue-500" />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 focus:outline-none"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {errors.password && <AlertCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" />}
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

{isSignUp && (
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  className={`peer w-full px-4 py-3 border ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-lg focus:ring-2 transition-all duration-300`}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                />
                <Lock className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 peer-focus:text-blue-500" />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 focus:outline-none"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                {errors.confirmPassword && <AlertCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" />}
                {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
{isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  {loadingPhase === 'validating' && (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      <span>Validating...</span>
                    </>
                  )}
                  {loadingPhase === 'processing' && (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                      <span>Processing...</span>
                    </>
                  )}
                  {loadingPhase === 'success' && (
                    <>
                      <CheckCircle className="text-green-500" />
                      <span>Success!</span>
                    </>
                  )}
                </div>
              ) : (
                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="ml-2 text-blue-600 font-semibold hover:text-blue-700"
              >
                {isSignUp ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
