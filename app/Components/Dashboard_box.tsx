import React from "react";
import { Trash2 } from "lucide-react";

interface DashboardBoxProps {
  actionText: string;
  reactionText: string;
  checked: boolean;
  onDelete: () => void;
  onCheck: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const formatText = (text: string): string => {
  return text
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export default function DashboardBox({
  actionText,
  reactionText,
  checked,
  onCheck,
  onDelete,
  label,
}: DashboardBoxProps) {
  return (
    <div className="w-full bg-[#E8EAF6] rounded-3xl border-2 border-[#576CA8] p-4 sm:p-6 md:p-8 flex items-center justify-between mb-4 sm:mb-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center flex-1 gap-4 sm:gap-8">
        <input
          type="checkbox"
          checked={checked}
          onChange={onCheck}
          className="w-6 h-6 sm:w-7 sm:h-7 accent-[#576CA8] cursor-pointer"
        />

        <div className="flex flex-col sm:flex-row flex-1 justify-between gap-4 sm:gap-12">
          <div className="flex-1">
            <p className="font-bold text-lg sm:text-xl text-[#1B264F] mb-1 sm:mb-2">Action:</p>
            <p className="text-base sm:text-lg text-[#576CA8] font-medium">{formatText(actionText)}</p>
          </div>

          <div className="flex-1">
            <p className="font-bold text-lg sm:text-xl text-[#1B264F] mb-1 sm:mb-2">Reaction:</p>
            <p className="text-base sm:text-lg text-[#576CA8] font-medium">{formatText(reactionText)}</p>
          </div>
        </div>
      </div>

      <button
        onClick={onDelete}
        className="ml-4 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-[#576CA8] hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
        aria-label="Delete"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
}