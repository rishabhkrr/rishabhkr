/**
 * ArrowLink — from Skiper UI (skiper40 "Link001", free), https://skiper-ui.com
 * Attribution to Skiper UI is required for the free version (credited in the site footer).
 * Adapted: underline sits under the text box, works for internal links, external links
 * get rel/target, and the arrow is decorative.
 */
import { cn } from '@/lib/utils';

export function ArrowLink({
  children,
  href,
  className,
  external = false,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'group relative inline-flex items-center',
        "before:pointer-events-none before:absolute before:-bottom-0.5 before:left-0 before:h-px before:w-full before:bg-current before:content-['']",
        'before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]',
        'hover:before:origin-left hover:before:scale-x-100 focus-visible:before:origin-left focus-visible:before:scale-x-100',
        className
      )}
    >
      {children}
      <svg
        className="ml-[0.3em] size-[0.55em] translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100 motion-reduce:transition-none"
        fill="none"
        viewBox="0 0 10 10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {external && <span className="sr-only"> (opens in new tab)</span>}
    </a>
  );
}
