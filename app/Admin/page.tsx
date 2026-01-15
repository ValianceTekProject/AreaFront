"use client"

import { useEffect, useState } from "react"
import Header from "../Components/Area_banner"
import Sidebar from "../Components/Area_sidebar"
import UsersPanel from "../Components/User_panel"
import ServicesPanel from "../Components/Service_panel"


export default function AdminDashboard() {
  const [tab, setTab] = useState<"users" | "services">("users")

  return (
    <div className="min-h-screen bg-[#FFFAFA] flex flex-col">
      <Header />
      <Sidebar />

      <main className="ml-60 p-10 flex-1">
        <h1 className="text-4xl font-bold mb-10 text-black">Admin Dashboard</h1>

        <div className="flex gap-6 mb-10">
          {["users", "services"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`px-6 py-2 rounded-md text-lg font-medium transition
                ${tab === t ? "bg-[#1B264F] text-white" : "bg-[#5A80F0] border hover:bg-gray-500"}`}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>

        {tab === "users" && <UsersPanel />}
        {tab === "services" && <ServicesPanel />}
      </main>
    </div>
  )
}
