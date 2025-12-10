"use client";
import React, { useState, useEffect } from "react";
import DashboardBox from "../Components/Dashboard_box";
import Sidebar from "../Components/Area_sidebar";
import Header from "../Components/Area_banner";

export default function Dashboard() {
  const [items, setItems] = useState<Array<any>>([]);

  const handleAreas = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const response = await fetch("http://localhost:8080/areas", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      });

      const data = await response.json();
      if (response.ok) {
        setItems(data);
      }
    } catch (err) {
      console.error("Network error", err);
    }
  };

  const handleToggleItem = async (itemId: string, isActive: boolean) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, isEnabled: isActive } : item
      )
    );

    try {
      const response = await fetch(`http://localhost:8080/areas/${itemId}/status`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({ is_enabled: isActive }),
      });

      if (!response.ok) {
        setItems(prevItems =>
          prevItems.map(item =>
            item.id === itemId ? { ...item, isEnabled: !isActive } : item
          )
        );
      }
    } catch (err) {
      setItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, isEnabled: !isActive } : item
        )
      );
    }
  };

  useEffect(() => {
    handleAreas();
  }, []);

  const activeItems = items.filter(item => item.isEnabled);
  const inactiveItems = items.filter(item => !item.isEnabled);

  console.log("Active items:", activeItems);
  console.log("Inactive items:", inactiveItems);

  return (
    <div className="min-h-screen bg-[#FFFAFA] relative flex flex-col">
      <Header />
      <Sidebar />
      <main className="flex-1 ml-60 flex flex-col items-start justify-start p-10 relative z-0">
        <h2 className="text-4xl font-bold text-black m-10">Active Area</h2>
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

        <h2 className="text-4xl font-bold text-black m-10">Inactive Area</h2>
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
    </div>
  );
}