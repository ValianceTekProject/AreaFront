"use client"

import { useEffect, useState } from "react"
import Header from "../Components/Area_banner"
import Sidebar from "../Components/Area_sidebar"
import UsersPanel from "../Components/User_panel"
import ServicesPanel from "../Components/Service_panel"
import { Menu, X } from "lucide-react"

export default function AdminDashboard() {
  const [tab, setTab] = useState<"users" | "services">("users")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#FFFAFA] flex flex-col">
      <Header />
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-lg lg:hidden hover:bg-gray-100 transition-colors"
        aria-label="Toggle menu"
      >
        {sidebarOpen ? <X size={24} className="text-[#1B264F]" /> : <Menu size={24} className="text-[#1B264F]" />}
      </button>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <div className={`
        fixed top-0 left-0 h-full z-40 transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>
      <main className="ml-0 lg:ml-60 p-4 sm:p-6 md:p-8 lg:p-10 flex-1">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 md:mb-10 text-black">Admin Dashboard</h1>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mb-6 md:mb-10">
          {["users", "services"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as any)}
              className={`w-full sm:w-auto px-6 py-2 rounded-md text-base sm:text-lg font-medium transition
                ${tab === t ? "bg-[#1B264F] text-white" : "bg-[#5A80F0] text-white hover:bg-[#4a6cd1]"}`}
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