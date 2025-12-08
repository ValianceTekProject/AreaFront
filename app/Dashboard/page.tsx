"use client";

import React, { useState } from "react";
import DashboardBox from "../Components/Dashboard_box";
import Sidebar from "../Components/Area_sidebar";
import Header from "../Components/Area_banner";


export default function Dashboard() {
  const [activeChecked, setActiveChecked] = useState(true);
  const [inactiveChecked, setInactiveChecked] = useState(true);

  return (
    <div className="min-h-screen bg-[#FFFAFA] relative flex flex-col">

      <Header />
      <Sidebar />

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
