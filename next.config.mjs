/**
 * Static export works on Vercel, GitHub Pages or any static host.
 * BASE_PATH is only needed when served from a sub-path (e.g. GitHub Pages
 * project sites: "/rishabhkr"); leave it unset for Vercel or a custom domain.
 */
const basePath = process.env.BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Lets a verification build run without clobbering a running dev server's .next folder.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  basePath,
  images: {
    unoptimized: true,
  },
  trailingSlash: false,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
