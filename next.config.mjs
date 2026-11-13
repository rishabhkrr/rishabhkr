/**
 * Static export works on Vercel, GitHub Pages or any static host.
 * BASE_PATH is only needed when served from a sub-path (e.g. GitHub Pages
 * project sites: "/rishabhkr"); leave it unset for Vercel or a custom domain.
 */
const basePath = process.env.BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Optional separate build folder for verification builds (restart a running dev server afterwards).
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
