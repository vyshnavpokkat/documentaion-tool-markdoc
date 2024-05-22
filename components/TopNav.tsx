import React from 'react';
import Link from 'next/link';

export function TopNav({ children }) {
  return (
    <nav>
      <nav className="bg-custom-darkGray w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 top-nav">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-custom-lightGray">DOCMACK</span>
          </a>
        </div>
      </nav>

      

    </nav>
  );
}
