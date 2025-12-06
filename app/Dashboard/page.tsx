"use client";
import React, { useState } from "react";
import { Settings } from 'lucide-react';
import DashboardBox from "../Components/Dashboard_box";

export default function Dashboard() {
  const [activeChecked, setActiveChecked] = useState(true);
  const [inactiveChecked, setInactiveChecked] = useState(true);

  return (
    <div className="min-h-screen bg-[#89A5A7] relative flex flex-col">
      <header className="w-full bg-[#1B1D20] text-[#F4FFF8] py-4 px-6 text-lg font-semibold z-20 relative">
        LOGO
      </header>

      <div className="absolute left-0 top-0 h-full w-60 bg-[#3C4A4C] z-15">
        <nav className="mt-15">
          <ul>
            <li className="px-6 py-8 text-xl text-[#F4FFF8] hover:bg-[#89A5A7] cursor-pointer">Area Dashboard</li>
            <li className="px-6 py-8 text-xl text-[#F4FFF8] hover:bg-[#89A5A7] cursor-pointer">Area Configuration</li>
            <li className="px-6 py-8 text-xl text-[#F4FFF8] hover:bg-[#89A5A7] cursor-pointer">Services</li>
          </ul>
        </nav>
        <button className="absolute bottom-10 left-6 flex items-center gap-2 px-12 py-2 bg-[#F4FFF8] text-[#1B1D20] font-semibold rounded hover:bg-[#A3C1C2]">
            <Settings size={22} />
            <span>Settings</span>
        </button>
      </div>

      <main className="flex-1 ml-60 flex flex-col items-start justify-start p-10 relative z-0">
        <h2 className="text-4xl font-bold text-[#1B1D20] m-10">Active Area</h2>
        <DashboardBox
          actionText="Ton père"
          reactionText="Ton frère"
          checked={activeChecked}
          onCheck={(e) => setActiveChecked(e.target.checked)}
          label="ton grand-père"
        />

        <h2 className="text-4xl font-bold text-[#1B1D20] m-10">Inactive Area</h2>
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
