'use client';

import React from 'react';

interface FullResumePreviewProps {
  templateId: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  category: 'modern' | 'classic' | 'creative' | 'minimal' | 'executive';
  className?: string;
}

const FullResumePreview: React.FC<FullResumePreviewProps> = ({
  templateId,
  colors,
  category,
  className = ''
}) => {
  const renderModernTemplate = () => (
    <div className={`w-full bg-white shadow-lg ${className}`} style={{ minHeight: '297mm', width: '210mm' }}>
      {/* Header */}
      <div className="h-32 flex items-center px-8" style={{ backgroundColor: colors.primary }}>
        <div className="w-24 h-24 rounded-full bg-white mr-6 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-gray-200"></div>
        </div>
        <div className="text-white">
          <h1 className="text-4xl font-bold mb-2">John Smith</h1>
          <h2 className="text-xl font-light">Senior Software Developer</h2>
          <div className="mt-3 text-sm opacity-90">
            <div>john.smith@email.com | (555) 123-4567</div>
            <div>LinkedIn: /in/johnsmith | GitHub: /johnsmith</div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex px-8 py-6">
        {/* Main Content */}
        <div className="flex-1 pr-6">
          {/* Professional Summary */}
          <section className="mb-6">
            <h3 className="text-lg font-bold mb-3" style={{ color: colors.primary }}>
              PROFESSIONAL SUMMARY
            </h3>
            <p className="text-gray-700 leading-relaxed">
              Experienced Senior Software Developer with 8+ years of expertise in full-stack development, 
              cloud architecture, and team leadership. Proven track record of delivering scalable applications 
              and mentoring junior developers. Passionate about clean code and innovative solutions.
            </p>
          </section>

          {/* Experience */}
          <section className="mb-6">
            <h3 className="text-lg font-bold mb-4" style={{ color: colors.primary }}>
              PROFESSIONAL EXPERIENCE
            </h3>
            
            <div className="mb-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-gray-900">Senior Software Developer</h4>
                  <p className="text-gray-600">TechCorp Solutions</p>
                </div>
                <span className="text-gray-500 text-sm">2020 - Present</span>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Led development of microservices architecture serving 1M+ users</li>
                <li>Mentored 5 junior developers and established code review standards</li>
                <li>Improved application performance by 40% through optimization</li>
                <li>Implemented CI/CD pipelines reducing deployment time by 60%</li>
              </ul>
            </div>

            <div className="mb-5">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-gray-900">Full Stack Developer</h4>
                  <p className="text-gray-600">Innovation Labs</p>
                </div>
                <span className="text-gray-500 text-sm">2018 - 2020</span>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Developed responsive web applications using React and Node.js</li>
                <li>Collaborated with UX team to implement pixel-perfect designs</li>
                <li>Built RESTful APIs and integrated third-party services</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-gray-900">Software Developer</h4>
                  <p className="text-gray-600">StartupXYZ</p>
                </div>
                <span className="text-gray-500 text-sm">2016 - 2018</span>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Built MVP from ground up using modern web technologies</li>
                <li>Implemented user authentication and payment processing</li>
                <li>Participated in agile development and sprint planning</li>
              </ul>
            </div>
          </section>

          {/* Education */}
          <section>
            <h3 className="text-lg font-bold mb-4" style={{ color: colors.primary }}>
              EDUCATION
            </h3>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-gray-900">Bachelor of Science in Computer Science</h4>
                <p className="text-gray-600">University of Technology</p>
                <p className="text-gray-500 text-sm">Magna Cum Laude, GPA: 3.8/4.0</p>
              </div>
              <span className="text-gray-500 text-sm">2012 - 2016</span>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="w-72">
          {/* Skills */}
          <section className="mb-6">
            <h3 className="text-lg font-bold mb-4" style={{ color: colors.primary }}>
              TECHNICAL SKILLS
            </h3>
            <div className="space-y-3">
              {[
                { skill: 'JavaScript/TypeScript', level: 95 },
                { skill: 'React/Next.js', level: 90 },
                { skill: 'Node.js/Express', level: 85 },
                { skill: 'Python/Django', level: 80 },
                { skill: 'AWS/Docker', level: 85 },
                { skill: 'PostgreSQL/MongoDB', level: 80 }
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700">{item.skill}</span>
                    <span className="text-gray-500">{item.level}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full" 
                      style={{ 
                        width: `${item.level}%`, 
                        backgroundColor: colors.accent 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section className="mb-6">
            <h3 className="text-lg font-bold mb-4" style={{ color: colors.primary }}>
              CERTIFICATIONS
            </h3>
            <div className="space-y-2 text-sm">
              <div className="text-gray-700">AWS Certified Solutions Architect</div>
              <div className="text-gray-700">Google Cloud Professional</div>
              <div className="text-gray-700">Certified Scrum Master</div>
            </div>
          </section>

          {/* Languages */}
          <section className="mb-6">
            <h3 className="text-lg font-bold mb-4" style={{ color: colors.primary }}>
              LANGUAGES
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700">English</span>
                <span className="text-gray-500">Native</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Spanish</span>
                <span className="text-gray-500">Fluent</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">French</span>
                <span className="text-gray-500">Intermediate</span>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section>
            <h3 className="text-lg font-bold mb-4" style={{ color: colors.primary }}>
              KEY PROJECTS
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-semibold text-gray-900">E-Commerce Platform</h4>
                <p className="text-gray-600">Full-stack application with 50K+ users</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">AI Chat Bot</h4>
                <p className="text-gray-600">NLP-powered customer service solution</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Mobile App</h4>
                <p className="text-gray-600">React Native app with 4.8★ rating</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  const renderClassicTemplate = () => (
    <div className={`w-full bg-white shadow-lg ${className}`} style={{ minHeight: '297mm', width: '210mm' }}>
      {/* Header */}
      <div className="text-center py-8 px-8 border-b-2 border-gray-300">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">JOHN SMITH</h1>
        <h2 className="text-xl text-gray-600 mb-4" style={{ color: colors.primary }}>
          Senior Software Developer
        </h2>
        <div className="text-gray-600">
          <div>john.smith@email.com | (555) 123-4567</div>
          <div>123 Main Street, City, State 12345</div>
          <div>LinkedIn: /in/johnsmith | GitHub: /johnsmith</div>
        </div>
      </div>
      
      {/* Content */}
      <div className="px-8 py-6">
        {/* Professional Summary */}
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-4 pb-2 border-b" style={{ borderColor: colors.primary }}>
            PROFESSIONAL SUMMARY
          </h3>
          <p className="text-gray-700 leading-relaxed">
            Experienced Senior Software Developer with 8+ years of expertise in full-stack development, 
            cloud architecture, and team leadership. Proven track record of delivering scalable applications 
            and mentoring junior developers. Passionate about clean code and innovative solutions.
          </p>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-4 pb-2 border-b" style={{ borderColor: colors.primary }}>
            PROFESSIONAL EXPERIENCE
          </h3>
          
          <div className="mb-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-lg font-bold text-gray-900">Senior Software Developer</h4>
                <p className="text-gray-600 font-medium">TechCorp Solutions</p>
              </div>
              <span className="text-gray-500">2020 - Present</span>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Led development of microservices architecture serving 1M+ users</li>
              <li>Mentored 5 junior developers and established code review standards</li>
              <li>Improved application performance by 40% through optimization</li>
              <li>Implemented CI/CD pipelines reducing deployment time by 60%</li>
            </ul>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-lg font-bold text-gray-900">Full Stack Developer</h4>
                <p className="text-gray-600 font-medium">Innovation Labs</p>
              </div>
              <span className="text-gray-500">2018 - 2020</span>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Developed responsive web applications using React and Node.js</li>
              <li>Collaborated with UX team to implement pixel-perfect designs</li>
              <li>Built RESTful APIs and integrated third-party services</li>
            </ul>
          </div>

          <div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-lg font-bold text-gray-900">Software Developer</h4>
                <p className="text-gray-600 font-medium">StartupXYZ</p>
              </div>
              <span className="text-gray-500">2016 - 2018</span>
            </div>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Built MVP from ground up using modern web technologies</li>
              <li>Implemented user authentication and payment processing</li>
              <li>Participated in agile development and sprint planning</li>
            </ul>
          </div>
        </section>

        {/* Education */}
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-4 pb-2 border-b" style={{ borderColor: colors.primary }}>
            EDUCATION
          </h3>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-lg font-bold text-gray-900">Bachelor of Science in Computer Science</h4>
              <p className="text-gray-600 font-medium">University of Technology</p>
              <p className="text-gray-500">Magna Cum Laude, GPA: 3.8/4.0</p>
            </div>
            <span className="text-gray-500">2012 - 2016</span>
          </div>
        </section>

        {/* Skills */}
        <section className="mb-8">
          <h3 className="text-xl font-bold mb-4 pb-2 border-b" style={{ borderColor: colors.primary }}>
            TECHNICAL SKILLS
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Programming Languages</h4>
              <p className="text-gray-700">JavaScript, TypeScript, Python, Java, C++</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Frameworks & Libraries</h4>
              <p className="text-gray-700">React, Node.js, Express, Django, Spring Boot</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Databases</h4>
              <p className="text-gray-700">PostgreSQL, MongoDB, Redis, MySQL</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Cloud & DevOps</h4>
              <p className="text-gray-700">AWS, Docker, Kubernetes, Jenkins, Git</p>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section>
          <h3 className="text-xl font-bold mb-4 pb-2 border-b" style={{ borderColor: colors.primary }}>
            CERTIFICATIONS
          </h3>
          <ul className="text-gray-700 space-y-1">
            <li>• AWS Certified Solutions Architect - Professional (2023)</li>
            <li>• Google Cloud Professional Developer (2022)</li>
            <li>• Certified Scrum Master (2021)</li>
          </ul>
        </section>
      </div>
    </div>
  );

  // Similar implementations for other categories...
  const renderCreativeTemplate = () => (
    <div className={`w-full bg-white shadow-lg ${className}`} style={{ minHeight: '297mm', width: '210mm' }}>
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-80 p-8" style={{ backgroundColor: colors.primary }}>
          <div className="text-center mb-8">
            <div className="w-32 h-32 rounded-full bg-white mx-auto mb-4 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full bg-gray-200"></div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">JOHN SMITH</h1>
            <h2 className="text-lg text-white/90">Creative Designer</h2>
          </div>

          <div className="text-white space-y-6">
            <section>
              <h3 className="text-lg font-bold mb-4">CONTACT</h3>
              <div className="space-y-2 text-sm">
                <div>john.smith@email.com</div>
                <div>(555) 123-4567</div>
                <div>portfolio.com/johnsmith</div>
                <div>LinkedIn: /in/johnsmith</div>
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">SKILLS</h3>
              <div className="space-y-3">
                {['Adobe Creative Suite', 'Figma', 'Sketch', 'UI/UX Design', 'Branding', 'Web Design'].map((skill, index) => (
                  <div key={index}>
                    <div className="text-sm mb-1">{skill}</div>
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-white h-2 rounded-full" 
                        style={{ width: `${90 - index * 5}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold mb-4">LANGUAGES</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>English</span>
                  <span>Native</span>
                </div>
                <div className="flex justify-between">
                  <span>Spanish</span>
                  <span>Fluent</span>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4" style={{ color: colors.accent }}>
              Creative Designer
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Passionate creative designer with 6+ years of experience in digital design, 
              branding, and user experience. Expert in creating visually compelling designs 
              that drive engagement and conversions.
            </p>
          </div>

          <section className="mb-8">
            <h3 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>
              EXPERIENCE
            </h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-gray-900">Senior UI/UX Designer</h4>
                    <p className="text-gray-600">Creative Agency Inc.</p>
                  </div>
                  <span className="text-gray-500">2020 - Present</span>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Led design for 50+ client projects with 95% satisfaction rate</li>
                  <li>Created brand identities for Fortune 500 companies</li>
                  <li>Increased user engagement by 60% through UX improvements</li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-gray-900">Graphic Designer</h4>
                    <p className="text-gray-600">Design Studio</p>
                  </div>
                  <span className="text-gray-500">2018 - 2020</span>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li>Designed marketing materials for various industries</li>
                  <li>Collaborated with marketing teams on campaign visuals</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>
              EDUCATION
            </h3>
            <div>
              <h4 className="font-bold text-gray-900">Bachelor of Fine Arts in Graphic Design</h4>
              <p className="text-gray-600">Art Institute of Design</p>
              <p className="text-gray-500">2014 - 2018</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  const renderMinimalTemplate = () => (
    <div className={`w-full bg-white shadow-lg ${className}`} style={{ minHeight: '297mm', width: '210mm' }}>
      <div className="px-16 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-5xl font-light text-gray-900 mb-2">John Smith</h1>
          <h2 className="text-xl text-gray-600 mb-6">Software Developer</h2>
          <div className="text-gray-500 space-y-1">
            <div>john.smith@email.com</div>
            <div>(555) 123-4567</div>
            <div>linkedin.com/in/johnsmith</div>
          </div>
        </header>

        {/* Experience */}
        <section className="mb-12">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Experience</h3>
          
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">Senior Software Developer</h4>
                  <p className="text-gray-600">TechCorp Solutions</p>
                </div>
                <span className="text-gray-500">2020—Present</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Led development of microservices architecture serving 1M+ users. 
                Mentored junior developers and established code review standards. 
                Improved application performance by 40% through optimization.
              </p>
            </div>

            <div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">Full Stack Developer</h4>
                  <p className="text-gray-600">Innovation Labs</p>
                </div>
                <span className="text-gray-500">2018—2020</span>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Developed responsive web applications using React and Node.js. 
                Collaborated with UX team to implement pixel-perfect designs.
              </p>
            </div>
          </div>
        </section>

        {/* Education */}
        <section className="mb-12">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Education</h3>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium text-gray-900">Bachelor of Science in Computer Science</h4>
              <p className="text-gray-600">University of Technology</p>
            </div>
            <span className="text-gray-500">2012—2016</span>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h3 className="text-lg font-medium text-gray-900 mb-6">Skills</h3>
          <div className="flex flex-wrap gap-3">
            {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'PostgreSQL'].map((skill, index) => (
              <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );

  const renderExecutiveTemplate = () => (
    <div className={`w-full bg-white shadow-lg ${className}`} style={{ minHeight: '297mm', width: '210mm' }}>
      {/* Header */}
      <div className="text-center py-12 px-8 border-b-4" style={{ borderColor: colors.primary }}>
        <h1 className="text-5xl font-bold text-gray-900 mb-3">JOHN SMITH</h1>
        <h2 className="text-2xl font-medium mb-6" style={{ color: colors.primary }}>
          CHIEF EXECUTIVE OFFICER
        </h2>
        <div className="text-gray-600 text-lg">
          <div>Executive Leadership • Strategic Planning • Business Development</div>
          <div className="mt-2">john.smith@email.com | (555) 123-4567 | LinkedIn: /in/johnsmith</div>
        </div>
      </div>
      
      {/* Content */}
      <div className="px-8 py-8">
        {/* Executive Summary */}
        <section className="mb-10">
          <h3 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>
            EXECUTIVE SUMMARY
          </h3>
          <p className="text-gray-700 leading-relaxed text-lg">
            Accomplished C-level executive with 15+ years of progressive leadership experience 
            driving growth, innovation, and operational excellence. Proven track record of scaling 
            organizations from startup to IPO, leading digital transformation initiatives, and 
            building high-performing teams across global markets.
          </p>
        </section>

        {/* Core Competencies */}
        <section className="mb-10">
          <h3 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>
            CORE COMPETENCIES
          </h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <ul className="text-gray-700 space-y-2">
                <li>• Strategic Planning & Execution</li>
                <li>• P&L Management</li>
                <li>• Digital Transformation</li>
                <li>• Mergers & Acquisitions</li>
              </ul>
            </div>
            <div>
              <ul className="text-gray-700 space-y-2">
                <li>• Team Leadership & Development</li>
                <li>• Board Relations</li>
                <li>• Investor Relations</li>
                <li>• Global Market Expansion</li>
              </ul>
            </div>
            <div>
              <ul className="text-gray-700 space-y-2">
                <li>• Technology Innovation</li>
                <li>• Risk Management</li>
                <li>• Organizational Development</li>
                <li>• Stakeholder Management</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mb-10">
          <h3 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>
            PROFESSIONAL EXPERIENCE
          </h3>
          
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Chief Executive Officer</h4>
                  <p className="text-lg text-gray-600 font-medium">Fortune 500 Technology Company</p>
                </div>
                <span className="text-gray-500 text-lg">2018 - Present</span>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Led company through successful IPO, raising $500M in capital</li>
                <li>Scaled revenue from $50M to $500M through strategic acquisitions and market expansion</li>
                <li>Built and managed executive team of 12 VPs across global operations</li>
                <li>Drove digital transformation initiative resulting in 40% operational efficiency gain</li>
              </ul>
            </div>

            <div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="text-xl font-bold text-gray-900">Chief Operating Officer</h4>
                  <p className="text-lg text-gray-600 font-medium">Growth Stage SaaS Company</p>
                </div>
                <span className="text-gray-500 text-lg">2015 - 2018</span>
              </div>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Scaled operations from 100 to 1,000+ employees across 5 countries</li>
                <li>Implemented agile methodologies reducing time-to-market by 60%</li>
                <li>Led Series C funding round securing $100M investment</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Education & Board Positions */}
        <div className="grid grid-cols-2 gap-8">
          <section>
            <h3 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>
              EDUCATION
            </h3>
            <div>
              <h4 className="text-lg font-bold text-gray-900">Master of Business Administration</h4>
              <p className="text-gray-600 font-medium">Harvard Business School</p>
              <p className="text-gray-500">2010</p>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-bold text-gray-900">Bachelor of Engineering</h4>
              <p className="text-gray-600 font-medium">Stanford University</p>
              <p className="text-gray-500">2008</p>
            </div>
          </section>

          <section>
            <h3 className="text-2xl font-bold mb-6" style={{ color: colors.primary }}>
              BOARD POSITIONS
            </h3>
            <div className="space-y-3">
              <div>
                <h4 className="font-bold text-gray-900">Board Member</h4>
                <p className="text-gray-600">Tech Innovation Council</p>
              </div>
              <div>
                <h4 className="font-bold text-gray-900">Advisory Board</h4>
                <p className="text-gray-600">Venture Capital Fund</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );

  const renderTemplate = () => {
    switch (category) {
      case 'modern':
        return renderModernTemplate();
      case 'classic':
        return renderClassicTemplate();
      case 'creative':
        return renderCreativeTemplate();
      case 'minimal':
        return renderMinimalTemplate();
      case 'executive':
        return renderExecutiveTemplate();
      default:
        return renderModernTemplate();
    }
  };

  return renderTemplate();
};

export default FullResumePreview;
