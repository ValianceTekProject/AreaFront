'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const getUserId = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:8080/me/userId', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user info');
      }

      const data = await response.json();
      setUserId(data.userId);
      return data.userId;
    } catch (err) {
      console.error('Network error', err);
      return null;
    }
  };

  const getUserRole = async (id: string) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user role');
      }

      const data = await response.json();
      const adminStatus = Array.isArray(data) ? data[0]?.admin : data.admin;
      setUserRole(adminStatus);
    } catch (err) {
      console.error('Network error', err);
    }
  };

  useEffect(() => {
    const init = async () => {
      const id = await getUserId();
      if (id) {
        await getUserRole(id);
      }
      setLoading(false);
    };

    init();
  }, []);

  if (loading) {
    return <div className="h-16 w-full bg-[#576CA8]" />;
  }

  const navItems = [
    { label: 'Home', path: '/Home' },
    { label: 'Dashboard', path: '/Dashboard' },
    { label: 'Services', path: '/Services' },
    ...(userRole ? [{ label: 'Admin', path: '/Admin' }] : []),
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
