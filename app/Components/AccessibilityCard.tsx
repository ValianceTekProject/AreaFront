import React from "react";


type Props = {
  icon: React.ReactNode;
  title: string;
  onClick: () => void;
};

export default function AccessibilityCard({ icon, title, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-[#E6ECFB] hover:bg-[#dbe3fa] border border-[#576CA8]  text-[#576CA8] rounded-2xl p-10 flex flex-col items-center justify-center gap-4 transition shadow-md"
    >
      {icon}
      <span className="text-lg font-medium">{title}</span>
    </button>
  );
}
