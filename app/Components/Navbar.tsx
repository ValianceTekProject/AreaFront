'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [userRole, setUserRole] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);

  const getUserId = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:8080/me/userId', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      return data.userId;
    } catch {
      return null;
    }
  };

  const getUserRole = async (id: string) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`http://localhost:8080/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setUserRole(Array.isArray(data) ? data[0]?.admin : data.admin);
    } catch {}
  };

  useEffect(() => {
    const init = async () => {
      const id = await getUserId();
      if (id) await getUserRole(id);
      setLoading(false);
    };
    init();
  }, []);

  if (loading) return <div className="h-16 w-full bg-[#576CA8]" />;

  const navItems = [
    { label: 'Home', path: '/Home' },
    { label: 'Dashboard', path: '/Dashboard' },
    { label: 'Services', path: '/Services' },
    ...(userRole ? [{ label: 'Admin', path: '/Admin' }] : []),
  ];

  const NavButton = ({ label, path }: { label: string; path: string }) => {
    const isActive = pathname === path;

    return (
      <button
        onClick={() => {
          router.push(path);
          setOpen(false);
        }}
        className={`px-4 py-2 rounded-full text-base font-medium transition
          ${
            isActive
              ? 'bg-[#7a8ec4] text-white'
              : 'text-white hover:text-gray-200'
          }`}
      >
        {label}
      </button>
    );
  };

  return (
    <nav className="hidden md:flex w-full justify-center">
      <div className="hidden md:flex bg-[#576CA8] rounded-full px-8 py-3 gap-2">
        {navItems.map((item, i) => (
          <React.Fragment key={item.label}>
            <NavButton {...item} />
            {i < navItems.length - 1 && (
              <span className="text-white flex items-center">|</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="md:hidden relative">
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className="bg-[#576CA8] p-3 rounded-full text-white shadow-lg"
        >
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
