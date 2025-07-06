import { NextRequest, NextResponse } from 'next/server';

// Import the templates from the main route (in a real app, this would be from a database)
const TEMPLATES = [
  {
    id: 'modern-pro-1',
    name: 'Modern Professional',
    description: 'Clean, contemporary design perfect for tech and business professionals',
    category: 'modern',
    atsOptimized: true,
    colors: { primary: '#3B82F6', secondary: '#1E40AF', accent: '#10B981' },
    features: ['ATS Optimized', 'Clean Layout', 'Professional Fonts', 'Easy to Edit'],
    rating: 4.9,
    downloads: 15420,
    isPremium: false,
    fields: [
      { id: 'fullName', label: 'Full Name', type: 'text', required: true, placeholder: 'John Smith' },
      { id: 'email', label: 'Email', type: 'email', required: true, placeholder: 'john@example.com' },
      { id: 'phone', label: 'Phone', type: 'phone', required: true, placeholder: '+1 (555) 123-4567' },
      { id: 'location', label: 'Location', type: 'text', required: false, placeholder: 'City, State' },
      { id: 'linkedin', label: 'LinkedIn', type: 'url', required: false, placeholder: 'linkedin.com/in/johnsmith' },
      { id: 'github', label: 'GitHub', type: 'url', required: false, placeholder: 'github.com/johnsmith' },
      { id: 'summary', label: 'Professional Summary', type: 'textarea', required: true, maxLength: 500 },
      { id: 'experience', label: 'Work Experience', type: 'list', required: true },
      { id: 'education', label: 'Education', type: 'list', required: true },
      { id: 'skills', label: 'Skills', type: 'list', required: true },
      { id: 'certifications', label: 'Certifications', type: 'list', required: false },
      { id: 'projects', label: 'Projects', type: 'list', required: false }
    ],
    layout: {
      sections: ['header', 'summary', 'experience', 'education', 'skills', 'certifications', 'projects'],
      columnLayout: '2-column',
      headerStyle: 'centered'
    },
    htmlTemplate: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{fullName}} - Resume</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 210mm; margin: 0 auto; background: white; }
        .header { background: {{primaryColor}}; color: white; padding: 30px; text-align: center; }
        .header h1 { font-size: 2.5em; margin-bottom: 10px; }
        .header .title { font-size: 1.2em; opacity: 0.9; }
        .contact { margin-top: 15px; }
        .contact span { margin: 0 10px; }
        .main { display: grid; grid-template-columns: 2fr 1fr; gap: 30px; padding: 30px; }
        .section { margin-bottom: 25px; }
        .section h2 { color: {{primaryColor}}; border-bottom: 2px solid {{accentColor}}; padding-bottom: 5px; margin-bottom: 15px; }
        .experience-item, .education-item { margin-bottom: 15px; }
        .item-header { display: flex; justify-content: between; margin-bottom: 5px; }
        .item-title { font-weight: bold; }
        .item-date { color: #666; font-style: italic; }
        .skills-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .skill-item { background: {{accentColor}}; color: white; padding: 5px 10px; border-radius: 15px; text-align: center; font-size: 0.9em; }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>{{fullName}}</h1>
            <div class="title">{{professionalTitle}}</div>
            <div class="contact">
                <span>{{email}}</span>
                <span>{{phone}}</span>
                <span>{{location}}</span>
                {{#if linkedin}}<span>{{linkedin}}</span>{{/if}}
                {{#if github}}<span>{{github}}</span>{{/if}}
            </div>
        </header>
        
        <div class="main">
            <div class="left-column">
                <section class="section">
                    <h2>Professional Summary</h2>
                    <p>{{summary}}</p>
                </section>
                
                <section class="section">
                    <h2>Work Experience</h2>
                    {{#each experience}}
                    <div class="experience-item">
                        <div class="item-header">
                            <span class="item-title">{{title}} at {{company}}</span>
                            <span class="item-date">{{startDate}} - {{endDate}}</span>
                        </div>
                        <p>{{description}}</p>
                        {{#if achievements}}
                        <ul>
                            {{#each achievements}}
                            <li>{{this}}</li>
                            {{/each}}
                        </ul>
                        {{/if}}
                    </div>
                    {{/each}}
                </section>
                
                <section class="section">
                    <h2>Projects</h2>
                    {{#each projects}}
                    <div class="project-item">
                        <div class="item-header">
                            <span class="item-title">{{name}}</span>
                            {{#if url}}<span><a href="{{url}}">{{url}}</a></span>{{/if}}
                        </div>
                        <p>{{description}}</p>
                        {{#if technologies}}
                        <p><strong>Technologies:</strong> {{technologies}}</p>
                        {{/if}}
                    </div>
                    {{/each}}
                </section>
            </div>
            
            <div class="right-column">
                <section class="section">
                    <h2>Skills</h2>
                    <div class="skills-grid">
                        {{#each skills}}
                        <div class="skill-item">{{this}}</div>
                        {{/each}}
                    </div>
                </section>
                
                <section class="section">
                    <h2>Education</h2>
                    {{#each education}}
                    <div class="education-item">
                        <div class="item-header">
                            <span class="item-title">{{degree}}</span>
                            <span class="item-date">{{year}}</span>
                        </div>
                        <p>{{institution}}</p>
                        {{#if gpa}}<p>GPA: {{gpa}}</p>{{/if}}
                    </div>
                    {{/each}}
                </section>
                
                <section class="section">
                    <h2>Certifications</h2>
                    {{#each certifications}}
                    <div class="cert-item">
                        <span class="item-title">{{name}}</span>
                        {{#if year}}<span class="item-date">({{year}})</span>{{/if}}
                    </div>
                    {{/each}}
                </section>
            </div>
        </div>
    </div>
</body>
</html>`
  },
  // Add other templates here with their HTML templates...
];

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const template = TEMPLATES.find(t => t.id === id);
    
    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }
    
    // Include detailed template information
    const detailedTemplate = {
      ...template,
      metadata: {
        lastUpdated: new Date().toISOString(),
        version: '1.0.0',
        compatibility: ['ATS', 'PDF', 'Word'],
        fileSize: '2.5KB',
        supportedFormats: ['PDF', 'DOCX', 'HTML']
      },
      customization: {
        colorSchemes: [
          { name: 'Default', primary: template.colors.primary, secondary: template.colors.secondary, accent: template.colors.accent },
          { name: 'Professional Blue', primary: '#1E40AF', secondary: '#3B82F6', accent: '#10B981' },
          { name: 'Corporate Gray', primary: '#374151', secondary: '#6B7280', accent: '#F59E0B' },
          { name: 'Creative Purple', primary: '#7C3AED', secondary: '#A855F7', accent: '#EC4899' }
        ],
        fonts: [
          { name: 'Arial', category: 'Sans-serif', atsCompatible: true },
          { name: 'Calibri', category: 'Sans-serif', atsCompatible: true },
          { name: 'Times New Roman', category: 'Serif', atsCompatible: true },
          { name: 'Helvetica', category: 'Sans-serif', atsCompatible: true }
        ],
        layouts: [
          { name: 'Two Column', id: '2-column', description: 'Main content on left, sidebar on right' },
          { name: 'Single Column', id: '1-column', description: 'Traditional single column layout' },
          { name: 'Sidebar', id: 'sidebar', description: 'Narrow sidebar with main content' }
        ]
      },
      sampleData: {
        fullName: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/johnsmith',
        github: 'github.com/johnsmith',
        summary: 'Experienced software developer with 5+ years of expertise in full-stack development, cloud architecture, and team leadership. Proven track record of delivering scalable applications and mentoring junior developers.',
        experience: [
          {
            title: 'Senior Software Developer',
            company: 'Tech Corp Solutions',
            startDate: '2020',
            endDate: 'Present',
            description: 'Lead development of microservices architecture serving 1M+ users',
            achievements: [
              'Improved application performance by 40% through optimization',
              'Mentored 5 junior developers and established code review standards',
              'Implemented CI/CD pipelines reducing deployment time by 60%'
            ]
          },
          {
            title: 'Full Stack Developer',
            company: 'Innovation Labs',
            startDate: '2018',
            endDate: '2020',
            description: 'Developed responsive web applications using React and Node.js',
            achievements: [
              'Built RESTful APIs and integrated third-party services',
              'Collaborated with UX team to implement pixel-perfect designs'
            ]
          }
        ],
        education: [
          {
            degree: 'Bachelor of Science in Computer Science',
            institution: 'University of Technology',
            year: '2016',
            gpa: '3.8'
          }
        ],
        skills: [
          'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS',
          'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'Git', 'Agile'
        ],
        projects: [
          {
            name: 'E-Commerce Platform',
            description: 'Full-stack application with 50K+ users',
            technologies: 'React, Node.js, PostgreSQL, AWS',
            url: 'github.com/johnsmith/ecommerce'
          }
        ],
        certifications: [
          { name: 'AWS Certified Solutions Architect', year: '2023' },
          { name: 'Certified Kubernetes Administrator', year: '2022' }
        ]
      }
    };
    
    return NextResponse.json(detailedTemplate);
    
  } catch (error) {
    console.error('Template fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch template' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const updates = await request.json();
    
    const templateIndex = TEMPLATES.findIndex(t => t.id === id);
    
    if (templateIndex === -1) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }
    
    // Update template with new data
    TEMPLATES[templateIndex] = {
      ...TEMPLATES[templateIndex],
      ...updates,
      id // Ensure ID cannot be changed
    };
    
    return NextResponse.json({
      success: true,
      message: 'Template updated successfully',
      template: TEMPLATES[templateIndex]
    });
    
  } catch (error) {
    console.error('Template update error:', error);
    return NextResponse.json(
      { error: 'Failed to update template' },
      { status: 500 }
    );
  }
}
