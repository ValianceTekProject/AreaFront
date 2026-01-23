import React from 'react';
import { useRouter } from 'next/navigation';

interface ActionBoxProps {
  icon: React.ReactNode;
  text: string;
  path: string;
}

const ActionBox: React.FC<ActionBoxProps> = ({ icon, text, path }) => {
  const router = useRouter();

  return (
    <div
        onClick={() => router.push(path)}
        className="bg-[#576CA8] rounded-2xl p-12 flex flex-col items-center justify-center gap-6 cursor-pointer hover:bg-[#4a5d91] transition-all hover:shadow-2xl hover:scale-105 min-h-[280px] w-full max-w-[380px]"
    >
    <div className="text-white text-6xl">
        {icon}
    </div>
        <p className="text-white text-center font-medium text-xl leading-relaxed">
            {text}
        </p>
    </div>
);
};

export default ActionBox;