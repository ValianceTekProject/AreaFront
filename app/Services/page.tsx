"use client";

import Sidebar from "../Components/Area_sidebar";
import Header from "../Components/Area_banner";
import React, { use, useEffect, useState } from "react";

import GoogleIcon from '../Components/Google_Icon';
import DiscordIcon from '../Components/Discord_Icon';
import GithubIcon from '../Components/Github_Icon';

export default function ServicesPage() {
  const [userId, setUserId] = React.useState<string | null>(null);
  const [servicesStatus, setServicesStatus] = React.useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const availableServices = [
    { name: "Google", icon: <GoogleIcon />, url: "http://localhost:8080/auth/google/login", id: 1 },
    { name: "Github", icon: <GithubIcon />, url: "http://localhost:8080/auth/github/login", id: 2 },
    { name: "Discord", icon: <DiscordIcon />, url: "http://localhost:8080/auth/discord/login", id: 3 },
  ];

  const handleOAuthLogin = async (url: string): Promise<void> => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      window.location.href = url;
      return;
    }
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("OAuth error:", err);
      window.location.href = url;
    }
  };

  const getUserId = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:8080/me/userId", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }
      const data = await response.json();
      setUserId(data.userId);
      return data.userId;
    } catch (err) {
      console.error("Network error", err);
      return null;
    }
  };

  const getServicesStatus = async (userId: string) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:8080/services/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch services status");
      }
      const data = await response.json();
      console.log("Fetched services status:", data);
      setServicesStatus(data || []);
      return data;
    } catch (err) {
      console.error("Network error", err);
      return null;
    }
  };

  useEffect(() => {
    const init = async () => {
      const id = await getUserId();
      if (id) {
        await getServicesStatus(id);
      }
      setLoading(false);
    };
    init();
  }, []);

  const isServiceConnected = (serviceId: number) => {
    return servicesStatus.some(service => service.serviceId === serviceId);
  };

  const getServiceInfo = (serviceId: number) => {
    return servicesStatus.find(service => service.serviceId === serviceId);
  };



  return (
    <div className="min-h-screen bg-[#FFFAFA] relative flex flex-col">
      <Header />
      <Sidebar />

      <main className="flex-1 ml-60 px-16 py-10 flex flex-row justify-center items-start">
        <div className="flex flex-col w-2/3">
          <h1 className="text-4xl font-semibold text-black">Services</h1>

          <div className="mt-16 flex flex-col gap-15 w-fit">
            {availableServices.map((s) => (
              <button
                key={s.name}
                onClick={() => handleOAuthLogin(s.url)}
                className="flex items-center gap-3 px-4 py-5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="text-2xl">{s.icon}</div>
                <div className="text-base font-medium text-black">Connect with {s.name}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="w-[700px] mt-25">
          <div className="border border-black rounded-xl p-8 bg-white shadow-sm">
            <h2 className="text-2xl text-black font-semibold text-center">
              Connection Summary Panel
            </h2>

            <div className="mt-8 flex flex-col gap-6">
              {availableServices.map((service) => (
                <div key={service.id} className="flex items-center gap-4">
                  {service.icon}
                  <span className="text-black text-lg">
                    {isServiceConnected(service.id) ? "Connected" : "Not Connected"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}