'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', path: '/Home' },
    { label: 'Dashboard', path: '/Dashboard' },
    { label: 'Services', path: '/Services' },
  ];

  return (
    <nav className="w-full flex justify-center">
      <div className="bg-[#576CA8] rounded-full px-8 py-3 flex gap-1 relative">
        {navItems.map((item, index) => {
          const isActive = pathname === item.path;

          return (
            <React.Fragment key={item.label}>
              <div className="relative">
                <button
                  onClick={() => router.push(item.path)}
                  className="text-white text-base font-medium hover:text-gray-200 transition-colors cursor-pointer px-4 py-2 relative z-10"
                >
                  {item.label}
                </button>

                {isActive && (
                  <div className="absolute inset-0 bg-[#7a8ec4] rounded-full" />
                )}
              </div>

              {index < navItems.length - 1 && (
                <span className="text-white mx-2 flex items-center">|</span>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
