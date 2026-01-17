import React from "react";

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
  <div className="w-full bg-white rounded-md shadow-md shadow-[#576CA8] p-10 flex items-center">
    <div className="flex items-start flex-1">
      <input
        type="checkbox"
        checked={checked}
        onChange={onCheck}
        className="self-center mr-20 w-6 h-6 accent-[#576CA8]"
      />
      <div className="flex flex-col">
        <div className="mb-6">
          <p className="font-semibold text-2xl text-[#274690]">Action:</p>
          <p className="text-xl text-[#576CA8]">
            {formatText(actionText)}
          </p>
        </div>
        <div>
          <p className="font-semibold text-2xl text-[#274690]">Reaction:</p>
          <p className="text-xl text-[#576CA8]">
            {formatText(reactionText)}
          </p>
        </div>
      </div>
    </div>
    <div className="w-24 flex items-center justify-center mt-6">
      <button
        onClick={onDelete}
        className="w-14 h-14 flex items-center justify-center text-2xl text-red-600 rounded-full hover:bg-red-100 hover:text-red-800 transition"
        aria-label="Delete"
      >
        🗑️
      </button>
    </div>

  </div>
);
}