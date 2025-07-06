'use client';

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  FileText, 
  BarChart3, 
  Sparkles, 
  Download, 
  Zap, 
  Users,
  Award,
  TrendingUp,
  ArrowRight,
  Rocket
} from "lucide-react";
import Header from "@/components/common/Header";
import { 
  MagneticButton, 
  Reveal, 
  AnimatedText, 
  MorphingBlob,
  ParticleBackground
} from "@/components/ui/AdvancedAnimations";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const features = [
    {
      icon: BarChart3,
      title: "AI-Powered Analysis",
      description: "Advanced algorithms analyze your resume and provide detailed feedback with actionable insights for ATS optimization.",
      color: "from-blue-500 to-cyan-500",
      stats: "98% accuracy"
    },
    {
      icon: FileText,
      title: "25+ Premium Templates",
      description: "Professionally designed, ATS-optimized templates across 5 categories including modern, classic, creative, minimal, and executive.",
      color: "from-purple-500 to-pink-500",
      stats: "100% ATS compatible"
    },
    {
      icon: Zap,
      title: "Real-time Editor",
      description: "See changes instantly as you build your resume with our lightning-fast real-time preview and editing system.",
      color: "from-yellow-500 to-orange-500",
      stats: "Instant updates"
    },
    {
      icon: Download,
      title: "Smart Export",
      description: "Download your professional resume in multiple formats with intelligent formatting that maintains ATS compatibility.",
      color: "from-green-500 to-emerald-500",
      stats: "Multiple formats"
    }
  ];

  const stats = [
    { icon: Users, value: "50K+", label: "Happy Users", color: "text-blue-500" },
    { icon: FileText, value: "100K+", label: "Resumes Created", color: "text-purple-500" },
    { icon: Award, value: "95%", label: "Success Rate", color: "text-green-500" },
    { icon: TrendingUp, value: "4.9/5", label: "User Rating", color: "text-yellow-500" }
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {/* Animated Background */}
          <MorphingBlob className="top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-500" delay={0} />
          <MorphingBlob className="bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500 to-pink-500" delay={5} />
          <MorphingBlob className="top-3/4 left-3/4 w-64 h-64 bg-gradient-to-r from-cyan-500 to-blue-500" delay={10} />
          
          {/* Particle effects */}
          <ParticleBackground />

          <motion.div 
            style={{ y, opacity }}
            className="relative z-10 max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8"
          >
            {/* Badge */}
            <Reveal direction="down" className="mb-8">
              <motion.div
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                </motion.div>
                <span className="text-white font-medium">100% Free • No Credit Card Required</span>
              </motion.div>
            </Reveal>

            {/* Main Title */}
            <AnimatedText 
              text="Build Your Dream Career with AI-Powered Resume Intelligence"
              className="text-4xl md:text-7xl font-bold text-white mb-8 leading-tight"
              delay={0.3}
            />

            {/* Subtitle */}
            <Reveal direction="up" delay={0.8} className="mb-12">
              <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Create stunning, ATS-optimized resumes with our AI-powered platform. 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">
                  Join 50,000+ professionals
                </span> who landed their dream jobs.
              </p>
            </Reveal>

            {/* CTA Buttons */}
            <Reveal direction="up" delay={1.2} className="mb-16">
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <MagneticButton
                  className="group bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-2xl border-2 border-white/20 backdrop-blur-sm"
                >
                  <Link href="/create" className="flex items-center space-x-3">
                    <Rocket className="w-6 h-6 group-hover:animate-bounce" />
                    <span>Start Building Now</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </MagneticButton>
                
                <MagneticButton
                  className="group bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-2xl font-semibold text-lg border-2 border-white/30 hover:bg-white/20"
                >
                  <Link href="/analyze" className="flex items-center space-x-3">
                    <BarChart3 className="w-6 h-6" />
                    <span>Analyze Existing Resume</span>
                  </Link>
                </MagneticButton>
              </div>
            </Reveal>

            {/* Stats */}
            <Reveal direction="up" delay={1.6}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1.8 + index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                      {stat.value}
                    </div>
                    <div className="text-gray-300 text-sm md:text-base flex items-center justify-center space-x-1">
                      <stat.icon className="w-4 h-4" />
                      <span>{stat.label}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to create a standout resume that gets noticed by employers and ATS systems.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="card-hover bg-white p-8 rounded-2xl border border-gray-100 shadow-lg text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Build Your Perfect Resume?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of job seekers who have improved their resumes with our AI-powered platform.
            </p>
            <Link 
              href="/create" 
              className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <FileText className="w-5 h-5" />
              <span>Get Started Now</span>
            </Link>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Resume Analyzer</span>
            </div>
            <p className="text-gray-400">
              © 2025 Resume Analyzer. Built with Next.js and powered by AI.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
