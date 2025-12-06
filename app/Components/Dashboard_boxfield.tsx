"use client";
import React, { useState } from "react";

export default function DashboardLinkField({ label, onApply }) {
  const [link, setLink] = useState("");

  const handleApply = () => {
    if (onApply) onApply(link);
  };

  return (
    <div className="flex flex-col ml-10 w-full max-w-sm">
      <p className="text-[#576CA8] text-2xl font-semibold mb-2">Add {label} link</p>
      <input
        type="text"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Enter link here"
        className="p-2 border border-gray-300 text-xl rounded mb-4 focus:outline-none focus:ring-2 focus:ring-[#1B1D20] text-[#576CA8]"
      />
      <button
        onClick={handleApply}
        className="px-4 py-2 bg-[#274690] text-white text-xl font-semibold rounded hover:bg-[#1B264F]"
      >
        Apply
      </button>
    </div>
  );
}
