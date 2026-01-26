"use client";

import { useState } from "react";
import Header from "../Components/Area_banner";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import UsersPanel from "../Components/User_panel";
import ServicesPanel from "../Components/Service_panel";
import { Menu, X, Users, Server } from "lucide-react";

export default function AdminDashboard() {
  const [tab, setTab] = useState<"users" | "services">("users");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFAFA] flex flex-col">
      <Header />

      <div className="mt-10 flex justify-center">
        <Navbar />
      </div>

      <main className="flex-1 w-full flex justify-center px-6 md:px-12 lg:px-20 py-14">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            <button
              onClick={() => setTab("users")}
              className={`p-8 rounded-2xl border-2 shadow-lg transition-all text-left
                ${
                  tab === "users"
                    ? "border-[#1B264F] bg-white"
                    : "border-gray-300 bg-gray-50 hover:border-[#576CA8]"
                }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <Users size={32} className="text-[#1B264F]" />
                <h3 className="text-2xl font-bold text-[#1B264F]">
                  User Management
                </h3>
              </div>
              <p className="text-gray-600">
                View users, manage roles and access rights
              </p>
            </button>

            <button
              onClick={() => setTab("services")}
              className={`p-8 rounded-2xl border-2 shadow-lg transition-all text-left
                ${
                  tab === "services"
                    ? "border-[#1B264F] bg-white"
                    : "border-gray-300 bg-gray-50 hover:border-[#576CA8]"
                }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <Server size={32} className="text-[#1B264F]" />
                <h3 className="text-2xl font-bold text-[#1B264F]">
                  Service Control
                </h3>
              </div>
              <p className="text-gray-600">
                Monitor and manage connected integrations
              </p>
            </button>
          </div>

         {tab === "users" && <UsersPanel />}

          {tab === "services" && (
            <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">
              <ServicesPanel />
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
