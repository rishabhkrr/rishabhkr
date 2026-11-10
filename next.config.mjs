/**
 * basePath follows the GitHub repo name:
 *  - `<user>.github.io`  -> served from the domain root, no basePath
 *  - any other repo name -> served from `/<repo-name>`
 * GITHUB_REPOSITORY ("owner/repo") is set automatically in GitHub Actions.
 * Locally it is unset, so `npm run dev` / `npm run build` serve from the root
 * (set GITHUB_REPOSITORY yourself to test a sub-path build).
 */
const repo = (process.env.GITHUB_REPOSITORY || '').split('/')[1] || '';
const basePath = repo && !repo.endsWith('.github.io') ? `/${repo}` : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString(),
  },
};

export default nextConfig;
