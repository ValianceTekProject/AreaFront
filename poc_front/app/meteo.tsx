"use client";

import { useEffect, useState } from "react";

type MeteoCurrent = {
  snowfall: number;
  rain: number;
  cloud_cover: number;
};

type MeteoResponse = {
  current: MeteoCurrent;
};

export default function Meteo({
  onBackgroundChange,
}: {
  onBackgroundChange: (color: string) => void;
}) {
  const [data, setData] = useState<MeteoResponse | null>(null);

  useEffect(() => {
    fetch("/api/meteo")
      .then((res) => res.json())
      .then((d: MeteoResponse) => {
        setData(d);
      });
  }, []);

  useEffect(() => {
    if (!data || !data.current) return;

    let bg = "";

    if (data.current.snowfall > 0)
      bg = "bg-[url('/snow.png')] bg-cover bg-center";

    else if (data.current.rain > 0)
      bg = "bg-[url('/rain.png')] bg-cover bg-center";

    else if (data.current.cloud_cover > 70)
      bg = "bg-[url('/very_cloudy.png')] bg-cover bg-center";

    else if (data.current.cloud_cover > 30)
      bg = "bg-[url('/cloudy.png')] bg-cover bg-center";

    else
      bg = "bg-[url('/sun.png')] bg-cover bg-center";

    onBackgroundChange(bg);
  }, [data, onBackgroundChange]);

  return null;
}
