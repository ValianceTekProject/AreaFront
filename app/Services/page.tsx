"use client";

import Image from "next/image";
import Sidebar from "../Components/Area_sidebar";
import Header from "../Components/Area_banner";
import OAuthPopupButton from "../Components/OAuthPopup";

export default function ServicesPage() {
  const services = [
    { name: "Spotify", icon: "/spotify.svg", url: "http://localhost:8080/auth/spotify/login" },
    { name: "Google", icon: "/google.svg", url: "http://localhost:8080/auth/google/login" },
    { name: "Github", icon: "/github.svg", url: "http://localhost:8080/auth/github/login" },
    { name: "Discord", icon: "/discord.svg", url: "http://localhost:8080/auth/discord/login" },
  ];

  return (
    <div className="min-h-screen bg-[#FFFAFA] relative flex flex-col">
      <Header />
      <Sidebar />

      <main className="flex-1 ml-60 px-16 py-10 flex flex-row justify-center items-start">
        <div className="flex flex-col w-2/3">
          <h1 className="text-4xl font-semibold text-black">Services</h1>

          <div className="mt-16 flex flex-col gap-15">
            {services.map((s) => (
              <OAuthPopupButton
                key={s.name}
                name={s.name}
                icon={s.icon}
                url={s.url}
              />
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
                <Image src="/spotify.svg" alt="spotify" width={32} height={32} />
                <span className="text-black text-lg">Connected</span>
              </div>

              <div className="flex items-center gap-4">
                <Image src="/google.svg" alt="google" width={32} height={32} />
                <span className="text-black text-lg">Connected</span>
              </div>

              <div className="flex items-center gap-4">
                <Image src="/github.svg" alt="github" width={32} height={32} />
                <span className="text-black text-lg">Awaiting</span>
              </div>

              <div className="flex items-center gap-4">
                <Image src="/discord.svg" alt="discord" width={32} height={32} />
                <span className="text-black text-lg">Connection error</span>
              </div>
            </div>

            <p className="mt-10 text-md text-black">Last synchronisation :</p>

            <div className="flex items-center gap-4 mt-3">
              <Image src="/spotify.svg" alt="spotify" width={28} height={28} />
              <span className="text-black text-md">Spotify — 3 hours ago</span>
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
