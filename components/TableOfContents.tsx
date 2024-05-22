import React from 'react';
import Link from 'next/link';

export function TableOfContents({ toc }) {
  const items = toc.filter(
    (item) => item.id && (item.level === 2 || item.level === 3)
  );

  if (items.length <= 1) {
    return null;
  }

  return (
    <aside id="default-sidebar" className="w-100 transition-transform -translate-x-full sm:translate-x-0 lvh overflow-auto" aria-label="Sidebar">
      <div className="h-full px-3 py-20 overflow-y-auto bg-custom-mediumGray">
        <ul className="max-w-md space-y-1 text-gray-400 list-none list-inside">
          {items.map((item) => {
            const href = `#${item.id}`;
            const active =
              typeof window !== 'undefined' && window.location.hash === href;
            return (
              <li
                key={item.title}
                className={[
                  active ? 'underline' : undefined,
                  item.level === 3 ? 'pl-3' : undefined,
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <Link href={href}>
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
