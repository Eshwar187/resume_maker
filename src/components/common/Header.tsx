'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FileText, BarChart3, User, Menu, X, Grid3X3 } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { href: '/', label: 'Home', icon: FileText },
    { href: '/analyze', label: 'Analyze', icon: BarChart3 },
    { href: '/create', label: 'Create', icon: FileText },
    { href: '/templates', label: 'Templates', icon: Grid3X3 },
  ];


  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Resume Analyzer</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-700">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium">Welcome back!</span>
                </div>
                <button 
                  onClick={handleSignOut}
                  className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 border border-gray-300 rounded-lg hover:border-blue-300"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  href="/signin"
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
                >
                  <span>Sign In</span>
                </Link>
                <Link 
                  href="/signup"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center space-x-2"
                >
                  <User className="w-4 h-4" />
                  <span>Get Started</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 px-4 py-2"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 px-4 py-2"
                >
                  <User className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              ) : (
                <div className="px-4 py-2 space-y-3">
                  <Link
                    href="/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 w-full"
                  >
                    <User className="w-4 h-4" />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    href="/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                  >
                    <User className="w-4 h-4" />
                    <span>Get Started</span>
                  </Link>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
