"use client";

import Link from "next/link";
import { Settings } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

  const baseStyle = "px-6 py-8 text-xl cursor-pointer block w-full h-full";
  const hoverStyle = "hover:text-black hover:bg-[#FFFAFA]";

  return (
    <div className="absolute left-0 top-0 h-full w-60 bg-[#1B264F] z-15">
      <nav className="mt-15">
        <ul>
          <li>
            <Link
              href="/Dashboard"
              className={`${baseStyle} ${pathname === "/Dashboard" ? "bg-[#FFFAFA] text-black" : "text-white " + hoverStyle }`}>
              Area Dashboard
            </Link>
          </li>
          <li className={`${baseStyle} text-white ${hoverStyle}`}>
            Area Configuration
          </li>
          <li>
            <Link
              href="/Services"
              className={`${baseStyle} ${ pathname === "/Services" ? "bg-[#FFFAFA] text-black" : "text-white " + hoverStyle }`}>
              Services
            </Link>
          </li>
        </ul>
      </nav>
      <button className="absolute bottom-10 left-6 flex items-center gap-2 px-12 py-2 bg-white text-[#576CA8] font-semibold rounded hover:bg-gray-200">
        <Settings size={22} />
        <span>Settings</span>
      </button>
    </div>
  );
}
