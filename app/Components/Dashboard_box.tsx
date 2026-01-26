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
    <div className="w-full bg-[#E8EAF6] rounded-3xl border-2 border-[#576CA8] p-8 flex items-center mb-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center flex-1 gap-8">
        <input
          type="checkbox"
          checked={checked}
          onChange={onCheck}
          className="w-7 h-7 accent-[#576CA8] cursor-pointer"
        />

        <div className="flex flex-1 justify-between items-center gap-12">
          <div className="flex-1">
            <p className="font-bold text-xl text-[#1B264F] mb-2">Action:</p>
            <p className="text-lg text-[#576CA8] font-medium">
              {formatText(actionText)}
            </p>
            <p className="text-sm text-[#576CA8] mt-1 opacity-75">
              Description de l'action
            </p>
          </div>

          <div className="flex-1">
            <p className="font-bold text-xl text-[#1B264F] mb-2">Reaction:</p>
            <p className="text-lg text-[#576CA8] font-medium">
              {formatText(reactionText)}
            </p>
            <p className="text-sm text-[#576CA8] mt-1 opacity-75">
              Description de l'action
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onDelete}
        className="ml-6 w-12 h-12 flex items-center justify-center text-[#576CA8] hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
        aria-label="Delete"
      >
        <Trash2 size={24} />
      </button>
    </div>
  );
}