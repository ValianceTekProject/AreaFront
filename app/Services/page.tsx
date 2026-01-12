"use client";
import Image from "next/image";
import Sidebar from "../Components/Area_sidebar";
import Header from "../Components/Area_banner";
import GoogleIcon from '../Components/Google_Icon';
import DiscordIcon from '../Components/Discord_Icon';
import GithubIcon from '../Components/Github_Icon';
import SpotifyIcon from '../Components/Spotify_Icon';

export default function ServicesPage() {
  const services = [
    { name: "Spotify", icon: <SpotifyIcon />, url: "http://localhost:8080/auth/spotify/login" },
    { name: "Google", icon: <GoogleIcon />, url: "http://localhost:8080/auth/google/login" },
    { name: "Github", icon: <GithubIcon />, url: "http://localhost:8080/auth/github/login" },
    { name: "Discord", icon: <DiscordIcon />, url: "http://localhost:8080/auth/discord/login" },
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

  return (
    <div className="min-h-screen bg-[#FFFAFA] relative flex flex-col">
      <Header />
      <Sidebar />
      <main className="flex-1 ml-60 px-16 py-10 flex flex-row justify-center items-start">
        <div className="flex flex-col w-2/3">
          <h1 className="text-4xl font-semibold text-black">Services</h1>
          <div className="mt-16 flex flex-col gap-15">
            {services.map((s) => (
              <button
                key={s.name}
                onClick={() => handleOAuthLogin(s.url)}
                className="flex items-center gap-4 p-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="text-3xl">{s.icon}</div>
                <div className="text-lg font-medium text-black">Connect with {s.name}</div>
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
              <div className="flex items-center gap-4">
                <SpotifyIcon />
                <span className="text-black text-lg">Not Connected</span>
              </div>
              <div className="flex items-center gap-4">
                <GoogleIcon />
                <span className="text-black text-lg">Not Connected</span>
              </div>
              <div className="flex items-center gap-4">
                <GithubIcon />
                <span className="text-black text-lg">Connected</span>
              </div>
              <div className="flex items-center gap-4">
                <DiscordIcon />
                <span className="text-black text-lg">Connected</span>
              </div>
            </div>
            <p className="mt-10 text-md text-black">Last synchronisation :</p>
            <div className="flex items-center gap-4 mt-3">
              <DiscordIcon />
              <span className="text-black text-md">Discord — 3 hours ago</span>
            </div>
            <button className="w-full mt-8 py-3 bg-[#5A80F0] text-white font-medium rounded-md shadow hover:bg-[#4a6cd1] transition">
              Reconnect all services
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}