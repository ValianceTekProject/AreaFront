"use client";

import { useEffect } from "react";

export default function AccessibilityInitializer() {
  useEffect(() => {
    const html = document.documentElement;

    ["dark", "text-large", "dyslexic"].forEach((key) => {
      if (localStorage.getItem(key) === "on") {
        html.classList.add(key);
      }
    });

    const cb = localStorage.getItem("colorblind");
    if (cb) {
      html.classList.add(cb);
    }
  }, []);

  return null;
}
