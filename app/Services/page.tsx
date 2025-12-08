"use client";

import Image from "next/image";
import Sidebar from "../Components/Area_sidebar";
import Header from "../Components/Area_banner";

export default function ServicesPage() {
  const services = [
    {
      name: "Spotify",
      icon: "/spotify.svg",
    },
    {
      name: "Google",
      icon: "/google.svg",
    },
    {
      name: "Github",
      icon: "/github.svg",
    },
    {
      name: "Discord",
      icon: "/discord.svg",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FFFAFA] relative flex flex-col">
      <Header />
      <Sidebar />

      <main className="flex-1 ml-60 px-16 py-10">
        <h1 className="text-4xl font-semibold text-black">Services</h1>

        <div className="mt-16 flex flex-col gap-15 ">
          {services.map((s) => (
            <button
              key={s.name}
              className="w-72 flex items-center gap-7 border border-black rounded-lg px-4 py-3 bg-white shadow-sm hover:shadow-lg transition"
            >
              <Image
                src={s.icon}
                alt={s.name}
                width={26}
                height={26}
                className="select-none"
              />
              <span className="font-medium text-[#576CA8]">Log in with {s.name}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
