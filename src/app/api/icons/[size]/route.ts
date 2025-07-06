import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ size: string }> }
) {
  const resolvedParams = await params;
  const size = parseInt(resolvedParams.size);
  
  // Create a simple SVG icon
  const svg = `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="${size}" height="${size}" rx="${size * 0.15}" fill="url(#gradient0)"/>
      <rect x="${size * 0.2}" y="${size * 0.25}" width="${size * 0.6}" height="${size * 0.08}" fill="white" rx="${size * 0.02}"/>
      <rect x="${size * 0.2}" y="${size * 0.4}" width="${size * 0.6}" height="${size * 0.08}" fill="white" rx="${size * 0.02}"/>
      <rect x="${size * 0.2}" y="${size * 0.55}" width="${size * 0.5}" height="${size * 0.08}" fill="white" rx="${size * 0.02}"/>
      <rect x="${size * 0.2}" y="${size * 0.7}" width="${size * 0.4}" height="${size * 0.08}" fill="white" rx="${size * 0.02}"/>
      <defs>
        <linearGradient id="gradient0" x1="0" y1="0" x2="${size}" y2="${size}" gradientUnits="userSpaceOnUse">
          <stop stop-color="#3B82F6"/>
          <stop offset="1" stop-color="#8B5CF6"/>
        </linearGradient>
      </defs>
    </svg>
  `;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=31536000',
    },
  });
}
