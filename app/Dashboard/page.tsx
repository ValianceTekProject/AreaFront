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
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleAreas = async () => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        setIsAuthenticated(false)
        setError("You must be logged in")
        return
      }

      const response = await fetch("http://localhost:8080/areas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (response.status === 401 || response.status === 403) {
        setIsAuthenticated(false)
        setError("Session expired, please log in again")
        return
      }

      if (!response.ok) {
        throw new Error("Failed to fetch areas")
      }

      const data = await response.json()
      setItems(Array.isArray(data) ? data : [])
      setIsAuthenticated(true)
    } catch (err) {
      console.error("Network error", err)
      setError("Erreur lors du chargement des zones")
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/areas/${id}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete area");
      }
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Network error", err);
    }
  };


  const getUserId = async (): Promise<string | null> => {
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        setIsAuthenticated(false)
        return null
      }

      const response = await fetch("http://localhost:8080/me/userId", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (response.status === 401 || response.status === 403) {
        setIsAuthenticated(false)
        setError("Session expirée, veuillez vous reconnecter")
        return null
      }

      if (!response.ok) {
        throw new Error("Failed to fetch user info")
      }

      const data = await response.json()
      setIsAuthenticated(true)
      return data.userId || data.id
    } catch (err) {
      console.error("Network error", err)
      setIsAuthenticated(false)
      return null
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

      if (!token) {
        setIsAuthenticated(false)
        return
      }

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
    const init = async () => {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setIsAuthenticated(false)
        setError("Vous devez être connecté pour accéder à cette page")
        setLoading(false)
        return
      }

      await Promise.all([handleAreas(), getUserId()])
      setLoading(false)
    }

    init()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFAFA] flex items-center justify-center">
        <p className="text-black text-xl">Loading...</p>
      </div>
    )
  }

  if (!isAuthenticated || error) {
    return (
      <div className="min-h-screen bg-[#FFFAFA] items-center justify-center relative flex flex-col">
        <Header />
        <Sidebar />

        <main className="flex-1 ml-60 flex flex-col items-center justify-center min-h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-red-500">Access denied</h2>
            <p className="text-gray-600 mb-6">
              {error || "You must be logged in to access this page."}
            </p>
            <a
              href="/login"
              className="px-6 py-2 bg-[#5A80F0] text-white font-medium rounded-md hover:bg-[#4a6cd1] transition"
            >
              Log In
            </a>
          </div>
        </main>
      </div>
    )
  }

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

        {activeItems.map((item) => {
          const [action, reaction] = item.name.split(" -> ").map((part) => part.trim());
          return (
            <DashboardBox
              key={item.id}
              actionText={action}
              reactionText={reaction}
              checked={item.isEnabled}
              onCheck={(e) => handleToggleItem(item.id, e.target.checked)}
              onDelete={() => handleDelete(item.id)}
              label={item.label || item.name}
            />
          );
        })}

        <h2 className="text-4xl font-bold text-black mt-16 mb-10">
          Inactive Area
        </h2>

        {inactiveItems.map((item) => (
          <DashboardBox
            key={item.id}
            actionText={item.name}
            reactionText={item.name}
            checked={item.isEnabled}
            onDelete={() => handleDelete(item.id)}
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