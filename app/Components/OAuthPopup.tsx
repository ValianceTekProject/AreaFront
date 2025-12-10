'use client';

import Image from "next/image";
import { useState, useEffect } from "react";

interface OAuthPopupButtonProps {
  name: string;
  icon: React.ReactNode;
  url: string;
}

export default function OAuthPopupButton({ name, icon, url }: OAuthPopupButtonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  function openOAuthPopup() {
    const width = 600;
    const height = 700;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    const popup = window.open(
      url,
      "oauthPopup",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    if (!popup) {
      alert("Popup blocked. Please allow popups for this site.");
    }
  }

  if (!mounted) return null;
  return (
    <button
      onClick={openOAuthPopup}
      className="w-96 h-20 flex items-center gap-7 border border-black rounded-lg px-4 bg-white shadow-sm hover:shadow-lg transition hover:bg-gray-200"
    >
      {icon}
      <span className="font-medium text-[#576CA8]">
        Log in with {name}
      </span>
    </button>
  );
}
