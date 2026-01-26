"use client"

import React, { useState, useEffect } from "react"
import DashboardBox from "../Components/Dashboard_box"
import Navbar from "../Components/Navbar"
import Header from "../Components/Area_banner"
import Footer from "../Components/Footer"
import AreaPopup from "../Components/AreaPopup"
import { Menu, X, Plus } from "lucide-react"

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
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
        <div className="mb-20">
          <Navbar />
        </div>
        <main className="flex-1 ml-0 lg:ml-60 flex flex-col items-center justify-center min-h-96 px-4">
          <div className="text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-red-500">Access denied</h2>
            <p className="text-sm md:text-base text-gray-600 mb-6">
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
    <div className="min-h-screen bg-[#FFFAFA] flex flex-col">
      <Header />
      <div className="mt-8 mb-20">
        <Navbar />
      </div>
      <main className="flex-1 px-8 md:px-16 lg:px-24 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-3">
            <div className="mb-16">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1B264F]">
                  Active Areas:
                </h2>
                <button
                  onClick={() => setAreaOpen(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-[#576CA8] text-white font-semibold rounded-full hover:bg-[#4a5d91] transition-colors shadow-lg"
                >
                  <Plus size={20} />
                  Create Area
                </button>
              </div>

              {activeItems.length === 0 ? (
                <p className="text-gray-500 text-lg text-center py-12">
                  No active areas yet. Create one to get started!
                </p>
              ) : (
                activeItems.map((item) => {
                  const [action, reaction] = item.name.split(" -> ").map(p => p.trim());
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
                })
              )}
            </div>
            <div className="mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1B264F] mb-8">
                Inactive Areas:
              </h2>

              {inactiveItems.length === 0 ? (
                <p className="text-gray-500 text-lg text-center py-12">
                  No inactive areas.
                </p>
              ) : (
                inactiveItems.map((item) => {
                  const [action, reaction] = item.name.split(" -> ").map(p => p.trim());
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
                })
              )}
            </div>

          </div>
          <div className="lg:col-span-1">
            <div className="grid grid-cols-1 gap-6 sticky top-24">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-[#576CA8] hover:shadow-xl transition-shadow">
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">
                  Total Areas
                </p>
                <p className="text-5xl font-bold text-[#576CA8] mt-3">
                  {items.length}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-500 hover:shadow-xl transition-shadow">
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">
                  Active
                </p>
                <p className="text-5xl font-bold text-green-500 mt-3">
                  {activeItems.length}
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-orange-500 hover:shadow-xl transition-shadow">
                <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">
                  Inactive
                </p>
                <p className="text-5xl font-bold text-orange-500 mt-3">
                  {inactiveItems.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <AreaPopup
        open={areaOpen}
        onClose={() => setAreaOpen(false)}
        onCreated={handleAreas}
      />
    </div>
  )
}