import React from "react";

export default function AccessibilityCard({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) {
  return (
    <button className="bg-[#E6ECFB] border border-[#576CA8] rounded-2xl h-44 flex flex-col items-center justify-center gap-4 text-[#576CA8] hover:scale-[1.02] hover:shadow-lg transition">
      {icon}
      <span className="text-lg font-medium">{title}</span>
    </button>
  );
}