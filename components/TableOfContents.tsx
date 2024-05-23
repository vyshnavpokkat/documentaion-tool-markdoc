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
      <div className="h-full px-5 py-10 overflow-y-auto">
        <ul className="max-w-md space-y-1 text-black-400 list-none list-inside border-r border-x-red-600">
          {items.map((item) => {
            const href = `#${item.id}`;
            const active =
              typeof window !== 'undefined' && window.location.hash === href;
            return (
              <li
                key={item.title}
                className={[
                  active ? 'text-red-600' : undefined,
                  item.level === 2? 'font-bold text-custom-mediumGray my-2': undefined,
                  item.level === 3 ? 'font-normal' : undefined,
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
