import Link from 'next/link';
import { pages } from '@/content/copy';

export default function NotFound() {
  return (
    <div className="container-site flex min-h-[70vh] flex-col items-start justify-center py-20">
      <p className="num font-display text-6xl font-semibold sm:text-7xl">404</p>
      <h1 className="h2 mt-6">{pages.notFound.heading}</h1>
      <p className="lead">{pages.notFound.body}</p>
      <Link href="/" className="btn-primary mt-8">
        {pages.notFound.button}
      </Link>
    </div>
  );
}
