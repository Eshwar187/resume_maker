'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Eye, EyeOff, AlertCircle, ArrowLeft, CheckCircle } from 'lucide-react';

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function SignInPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loadingPhase, setLoadingPhase] = useState<'idle' | 'validating' | 'processing' | 'success'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setLoadingPhase('validating');
    
    try {
      // Simulate validation phase
      setTimeout(() => {
        setLoadingPhase('processing');
        
        // Simulate processing phase
        setTimeout(() => {
          setLoadingPhase('success');
          
          // Show success state briefly then redirect
          setTimeout(() => {
            setIsLoading(false);
            setLoadingPhase('idle');
            // In a real app, you'd store auth state and redirect
            router.push('/');
          }, 1000);
        }, 1500);
      }, 800);
    } catch {
      setIsLoading(false);
      setLoadingPhase('idle');
      setErrors({ general: 'An error occurred. Please try again.' });
    }
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const getLoadingMessage = () => {
    switch (loadingPhase) {
      case 'validating': return 'Validating credentials...';
      case 'processing': return 'Signing you in...';
      case 'success': return 'Welcome back!';
      default: return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        {/* Sign In Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">Welcome Back</h1>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {errors.general && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-700">{errors.general}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
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

            {/* Password Field */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className={`peer w-full px-4 py-3 border ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'} rounded-lg focus:ring-2 transition-all duration-300`}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              {errors.password && <AlertCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500" />}
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link 
                href="/forgot-password" 
                className="text-blue-600 hover:text-blue-800 text-sm transition-colors duration-200"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                isLoading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:scale-105'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>{getLoadingMessage()}</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Loading Success State */}
            {loadingPhase === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center space-x-2 text-green-600"
              >
                <CheckCircle className="w-5 h-5" />
                <span>Successfully signed in! Redirecting...</span>
              </motion.div>
            )}
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don&apos;t have an account?{' '}
              <Link 
                href="/signup" 
                className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
