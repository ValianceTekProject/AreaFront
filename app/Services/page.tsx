"use client";

import Header from "../Components/Area_banner";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import React, { useEffect, useState } from "react";

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

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-xl text-gray-600">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <div className="w-full py-5 px-8 bg-cover bg-center bg-no-repeat rounded-b-[50px]" style={{ backgroundImage: 'url(Home_background.jpg)' }}>
        <div className="mb-20">
          <Navbar />
        </div>
        <div className="max-w-4xl mx-auto text-center mb-25">
          <h1 className="text-white text-4xl font-bold">
            Connect your services to unlock new possibilities
          </h1>
        </div>
      </div>

      <main className="flex-1 w-full px-4 sm:px-6 md:px-10 lg:px-16 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B264F] text-center mb-12">Available Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {availableServices.map((service) => {
                const isConnected = isServiceConnected(service.id);
                return (
                  <div
                    key={service.id}
                    className={`rounded-2xl p-8 flex flex-col items-center justify-center min-h-[320px] transition-all shadow-lg hover:shadow-xl ${
                      isConnected
                        ? "bg-gradient-to-br from-blue-100 to-blue-50 border-2 border-[#1B264F]"
                        : "bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-300 hover:border-blue-300"
                    }`}
                  >
                    <div className="text-6xl mb-6">{service.icon}</div>
                    <h3 className="text-2xl font-bold text-[#1B264F] mb-2">{service.name}</h3>
                    <div className={`h-1 w-12 rounded-full mb-6 ${isConnected ? "bg-[#1B264F]" : "bg-gray-300"}`}></div>
                    <p className="text-lg font-semibold text-[#576CA8] mb-8">
                      {isConnected ? "✓ Connected" : "Not Connected"}
                    </p>
                    <button
                      onClick={() => handleOAuthLogin(service.url)}
                      className={`px-8 py-3 rounded-lg font-medium transition-all ${
                        isConnected
                          ? "bg-[#4a5d91] text-white hover:bg-[#1B264F]"
                          : "bg-[#576CA8] text-white hover:bg-[#4a5d91]"
                      }`}
                    >
                      {isConnected ? "Reconnect" : `Connect with ${service.name}`}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}