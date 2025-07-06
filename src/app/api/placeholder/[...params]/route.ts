import { NextRequest, NextResponse } from 'next/server';

// Simple placeholder image generator
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ params: string[] }> }
) {
  const resolvedParams = await params;
  const [width = '400', height = '600'] = resolvedParams.params;
  
  // Create a simple SVG placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:0.8" />
          <stop offset="50%" style="stop-color:#8B5CF6;stop-opacity:0.6" />
          <stop offset="100%" style="stop-color:#10B981;stop-opacity:0.4" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
      <rect x="20" y="30" width="60%" height="8" fill="white" opacity="0.8" rx="4"/>
      <rect x="20" y="50" width="40%" height="6" fill="white" opacity="0.6" rx="3"/>
      <rect x="20" y="70" width="80%" height="4" fill="white" opacity="0.4" rx="2"/>
      <rect x="20" y="80" width="70%" height="4" fill="white" opacity="0.4" rx="2"/>
      <rect x="20" y="90" width="60%" height="4" fill="white" opacity="0.4" rx="2"/>
      
      <rect x="20" y="120" width="50%" height="6" fill="white" opacity="0.6" rx="3"/>
      <rect x="20" y="140" width="90%" height="4" fill="white" opacity="0.4" rx="2"/>
      <rect x="20" y="150" width="85%" height="4" fill="white" opacity="0.4" rx="2"/>
      <rect x="20" y="160" width="75%" height="4" fill="white" opacity="0.4" rx="2"/>
      
      <rect x="20" y="190" width="45%" height="6" fill="white" opacity="0.6" rx="3"/>
      <rect x="20" y="210" width="80%" height="4" fill="white" opacity="0.4" rx="2"/>
      <rect x="20" y="220" width="65%" height="4" fill="white" opacity="0.4" rx="2"/>
      
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="14" opacity="0.7">
        Resume Template
      </text>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000',
    },
  });
}
