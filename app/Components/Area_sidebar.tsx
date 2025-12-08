"use client";

import Link from "next/link";
import { Settings } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="absolute left-0 top-0 h-full w-60 bg-[#1B264F] z-15">
      <nav className="mt-15">
        <ul>
          <li className="px-6 py-8 text-xl text-white hover:text-black hover:bg-[#FFFAFA] cursor-pointer">
            <Link href="/Dashboard" className="block w-full h-full">
              Area Dashboard
            </Link>
          </li>

          <li className="px-6 py-8 text-xl text-white hover:text-black hover:bg-[#FFFAFA] cursor-pointer">
            Area Configuration
          </li>

          <li className="px-6 py-8 text-xl text-white hover:text-black hover:bg-[#FFFAFA] cursor-pointer">
            <Link href="/Services" className="block w-full h-full">
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