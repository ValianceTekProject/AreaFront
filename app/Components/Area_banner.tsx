import React from 'react';
import { Settings, Download } from 'lucide-react';
import Link from 'next/link';

const downloadAPK = async () => {
  const link = document.createElement("a");
  link.href = "/APK/app-release.apk";
  link.download = "area-client.apk";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const Header = () => {
  return (
    <header className="w-full bg-[#1B264F] py-4 px-6 text-lg font-semibold z-20 relative flex items-center justify-between">
      <img src="Area_logo.png" alt="Logo" className="h-8 w-auto" />
      <div className="flex gap-3">
        <button className="bg-[#576CA8] hover:bg-[#4a5d91] text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors" onClick={downloadAPK}>
          <Download size={20} />
          Download the APK
        </button>
      <Link href="../Accessibility">
        <button className="bg-[#576CA8] hover:bg-[#4a5d91] text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors">
          <Settings size={20} />
          Settings
        </button>
      </Link>
      </div>
    </header>
  );
};

export default Header;