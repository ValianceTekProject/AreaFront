"use client";

type ColorBlindMode = "cb-1" | "cb-2" | "cb-3" | null;

export function useAccessibility() {
  const html = typeof window !== "undefined" ? document.documentElement : null;

  const toggleClass = (className: string) => {
    if (!html) return;

    html.classList.toggle(className);
    localStorage.setItem(
      className,
      html.classList.contains(className) ? "on" : "off"
    );
  };

  const setColorBlind = (mode: ColorBlindMode) => {
    if (!html) return;

    ["cb-1", "cb-2", "cb-3"].forEach(c => html.classList.remove(c));

    if (mode) {
      html.classList.add(mode);
      localStorage.setItem("colorblind", mode);
    } else {
      localStorage.removeItem("colorblind");
    }
  };

  return {
    toggleDarkMode: () => toggleClass("dark"),
    toggleLargeText: () => toggleClass("text-large"),
    toggleDyslexic: () => toggleClass("dyslexic"),
    colorBlind1: () => setColorBlind("cb-1"),
    colorBlind2: () => setColorBlind("cb-2"),
    colorBlind3: () => setColorBlind("cb-3"),
  };
}
