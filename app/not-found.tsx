import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 relative z-10">
      <div className="text-center">
        <h1 className="font-display text-8xl font-bold gradient-text mb-6">404</h1>
        <h2 className="font-display text-3xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-text-secondary max-w-md mb-8">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <Link href="/" className="btn-primary inline-flex">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
