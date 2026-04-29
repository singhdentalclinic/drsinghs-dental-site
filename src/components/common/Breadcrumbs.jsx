'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon } from '@heroicons/react/20/solid';

export default function Breadcrumbs() {
  const pathname = usePathname();

  if (!pathname || pathname === '/') return null;

  const pathNames = pathname.split('/').filter((path) => path);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.drsinghdental.com';

  const breadcrumbList = [
    {
      name: 'Home',
      item: baseUrl,
    },
  ];

  const formatString = (str) => {
    return str
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const breadcrumbs = pathNames.map((path, index) => {
    const href = `/${pathNames.slice(0, index + 1).join('/')}`;
    let name = formatString(path);
    
    // Special formatting rules
    if (name.toLowerCase() === 'services' && index > 0 && pathNames[index - 1] === 'treatments') {
      name = 'Services';
    }
    
    breadcrumbList.push({ name, item: `${baseUrl}${href}` });
    return { name, href };
  });

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbList.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <nav aria-label="Breadcrumb" className="w-full flex mt-4 z-40 relative">
        <ol className="flex items-center space-x-2 text-sm text-text-secondary bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm">
          <li>
            <div>
              <Link href="/" className="text-text-secondary hover:text-primary transition-colors flex items-center">
                <HomeIcon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                <span className="sr-only">Home</span>
              </Link>
            </div>
          </li>
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <li key={crumb.name}>
                <div className="flex items-center">
                  <span className="text-tertiary font-bold mx-1 select-none" aria-hidden="true">
                    &gt;
                  </span>
                  {isLast ? (
                    <span
                      className="ml-2 text-sm font-medium text-text-primary truncate max-w-[150px] sm:max-w-none"
                      aria-current="page"
                      title={crumb.name}
                    >
                      {crumb.name}
                    </span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="ml-2 text-sm font-medium text-text-secondary hover:text-primary transition-colors truncate max-w-[100px] sm:max-w-none"
                      title={crumb.name}
                    >
                      {crumb.name}
                    </Link>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
