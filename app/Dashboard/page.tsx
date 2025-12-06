"use client";
import React, { useState } from "react";
import { Settings } from 'lucide-react';
import DashboardBox from "../Components/Dashboard_box";

export default function Dashboard() {
  const [activeChecked, setActiveChecked] = useState(true);
  const [inactiveChecked, setInactiveChecked] = useState(true);

  return (
    <div className="min-h-screen bg-[#FFFAFA] relative flex flex-col">
      <div className="absolute left-0 top-0 h-full w-60 bg-[#1B264F] z-15">
        <nav className="mt-15">
          <ul>
            <li className="px-6 py-8 text-xl text-white hover:text-black hover:bg-[#FFFAFA] cursor-pointer">Area Dashboard</li>
            <li className="px-6 py-8 text-xl text-white hover:text-black hover:bg-[#FFFAFA] cursor-pointer">Area Configuration</li>
            <li className="px-6 py-8 text-xl text-white hover:text-black hover:bg-[#FFFAFA] cursor-pointer">Services</li>
          </ul>
        </nav>
        <button className="absolute bottom-10 left-6 flex items-center gap-2 px-12 py-2 bg-[#F4FFF8] text-[#576CA8] font-semibold rounded hover:bg-[#A3C1C2]">
            <Settings size={22} />
            <span>Settings</span>
        </button>
      </div>

      <main className="flex-1 ml-60 flex flex-col items-start justify-start p-10 relative z-0">
        <h2 className="text-4xl font-bold text-black m-10">Active Area</h2>
        <DashboardBox
          actionText="Ton père"
          reactionText="Ton frère"
          checked={activeChecked}
          onCheck={(e) => setActiveChecked(e.target.checked)}
          label="ton grand-père"
        />

        <h2 className="text-4xl font-bold text-black m-10">Inactive Area</h2>
        <DashboardBox
          actionText="Ta maman"
          reactionText="Ta soeur"
          checked={inactiveChecked}
          onCheck={(e) => setInactiveChecked(e.target.checked)}
          label="ta grand-mère"
        />
      </main>
    </div>
  );
}
