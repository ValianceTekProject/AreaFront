"use client";

import React, { useEffect, useState } from "react";
import { Settings, Download, Menu, X } from "lucide-react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const downloadAPK = () => {
  const link = document.createElement("a");
  link.href = "/APK/app-release.apk";
  link.download = "area-client.apk";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState<boolean | null>(null);

  const navItems = [
    { label: "Home", path: "/Home" },
    { label: "Dashboard", path: "/Dashboard" },
    { label: "Services", path: "/Services" },
    ...(userRole ? [{ label: "Admin", path: "/Admin" }] : []),
  ];

  useEffect(() => {
    const init = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) return;

        const idRes = await fetch("http://localhost:8080/me/userId", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { userId } = await idRes.json();

        const roleRes = await fetch(`http://localhost:8080/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await roleRes.json();
        setUserRole(Array.isArray(data) ? data[0]?.admin : data.admin);
      } catch {}
    };

    init();
  }, []);

  const MobileNavButton = ({ label, path }: { label: string; path: string }) => (
    <button
      onClick={() => {
        router.push(path);
        setMenuOpen(false);
      }}
      className={`w-full text-left px-4 py-2 rounded-md text-white
        ${
          pathname === path
            ? "bg-[#7a8ec4]"
            : "hover:bg-[#4a5d91]"
        }`}
    >
      {label}
    </button>
  );

  return (
    <header className="w-full bg-[#1B264F] px-6 py-2 md:py-4 relative z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <img src="Area_logo.png" alt="Logo" className="h-8 w-auto" />

        <div className="hidden md:flex gap-3">
          <button
            onClick={downloadAPK}
            className="bg-[#576CA8] hover:bg-[#4a5d91] text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <Download size={18} />
            Download APK
          </button>

          <Link href="/Accessibility">
            <button className="bg-[#576CA8] hover:bg-[#4a5d91] text-white px-4 py-2 rounded-md flex items-center gap-2">
              <Settings size={18} />
              Settings
            </button>
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
          aria-label="Open menu"
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 bg-[#576CA8] rounded-2xl p-4 space-y-2">
          {navItems.map((item) => (
            <MobileNavButton key={item.label} {...item} />
          ))}

          <button
            onClick={downloadAPK}
            className="w-full mt-2 bg-[#4a5d91] text-white px-4 py-2 rounded-md flex items-center justify-center gap-2"
          >
            <Download size={18} />
            Download APK
          </button>

          <Link href="/Accessibility">
            <button className="w-full bg-[#4a5d91] text-white px-4 py-2 rounded-md flex items-center justify-center gap-2">
              <Settings size={18} />
              Settings
            </button>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
