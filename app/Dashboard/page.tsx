"use client"

import React, { useState, useEffect } from "react"
import DashboardBox from "../Components/Dashboard_box"
import Sidebar from "../Components/Area_sidebar"
import Header from "../Components/Area_banner"
import AreaPopup from "../Components/AreaPopup"

type Area = {
  id: string
  name: string
  label?: string
  isEnabled: boolean
}

export default function Dashboard() {
  const [items, setItems] = useState<Area[]>([])
  const [areaOpen, setAreaOpen] = useState(false)

  const handleAreas = async () => {
    try {
      const token = localStorage.getItem('authToken');

      const response = await fetch("http://localhost:8080/areas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      const data = await response.json()
      setItems(data)
    } catch (err) {
      console.error("Network error", err)
    }
  }

  const handleToggleItem = async (itemId: string, isActive: boolean) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, isEnabled: isActive } : item
      )
    )

    try {
      const token = localStorage.getItem('authToken');

      const response = await fetch(`http://localhost:8080/areas/${itemId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ is_enabled: isActive }),
      });

      if (!response.ok) {
        throw new Error("Failed")
      }
    } catch {
      setItems((prev) =>
        prev.map((item) =>
          item.id === itemId ? { ...item, isEnabled: !isActive } : item
        )
      )
    }
  }

  useEffect(() => {
    handleAreas()
  }, [])

  const activeItems = items.filter((item) => item.isEnabled)
  const inactiveItems = items.filter((item) => !item.isEnabled)

  return (
    <div className="min-h-screen bg-[#FFFAFA] relative flex flex-col">
      <Header />
      <Sidebar />

      <main className="flex-1 ml-60 flex flex-col p-10 relative z-0">
        <div className="w-full flex justify-between items-center mb-10">
          <h2 className="text-4xl font-bold text-black">Active Area</h2>

          <button
            onClick={() => setAreaOpen(true)}
            className="px-4 py-2 text-xl font-medium rounded-md bg-[#5A80F0] text-white shadow hover:bg-[#4a6cd1] transition"
          >
            Create Area
          </button>
        </div>

        {activeItems.map((item) => (
          <DashboardBox
            key={item.id}
            actionText={item.name}
            reactionText={item.name}
            checked={item.isEnabled}
            onCheck={(e) => handleToggleItem(item.id, e.target.checked)}
            label={item.label || item.name}
          />
        ))}

        <h2 className="text-4xl font-bold text-black mt-16 mb-10">
          Inactive Area
        </h2>

        {inactiveItems.map((item) => (
          <DashboardBox
            key={item.id}
            actionText={item.name}
            reactionText={item.name}
            checked={item.isEnabled}
            onCheck={(e) => handleToggleItem(item.id, e.target.checked)}
            label={item.label || item.name}
          />
        ))}
      </main>

      <AreaPopup
        open={areaOpen}
        onClose={() => setAreaOpen(false)}
        onCreated={handleAreas}
      />
    </div>
  )
}
