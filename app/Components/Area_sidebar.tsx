"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
  const pathname = usePathname();
  const baseStyle = "px-6 py-8 text-xl cursor-pointer block w-full h-full";
  const hoverStyle = "hover:text-black hover:bg-[#FFFAFA]";
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const downloadAPK = async () => {
    const link = document.createElement("a");
    link.href = "/APK/app-release.apk";
    link.download = "area-client.apk";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

  const getUserRole = async (id: string) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user role");
      }
      const data = await response.json();
      const adminStatus = Array.isArray(data) ? data[0]?.admin : data.admin;
      setUserRole(adminStatus);
    } catch (err) {
      console.error("Network error", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      const id = await getUserId();
      if (id) {
        await getUserRole(id);
      }
      setLoading(false);
    };
    init();
  }, []);

  const handleLinkClick = () => {
    if (onClose) {
      onClose();
    }
  };

  if (loading) {
    return <div className="h-full w-60 bg-[#1B264F] z-15" />;
  }

  return (
    <div className="h-full w-60 bg-[#1B264F] z-15">
      <nav className="mt-16">
        <ul>
          <li>
            <Link
              href="/Dashboard"
              onClick={handleLinkClick}
              className={`${baseStyle} ${
                pathname === "/Dashboard"
                  ? "bg-[#FFFAFA] text-black"
                  : "text-white " + hoverStyle
              }`}
            >
              Area Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/Services"
              onClick={handleLinkClick}
              className={`${baseStyle} ${
                pathname === "/Services"
                  ? "bg-[#FFFAFA] text-black"
                  : "text-white " + hoverStyle
              }`}
            >
              Services
            </Link>
          </li>
          {userRole === true && (
            <li>
              <Link
                href="/Admin"
                onClick={handleLinkClick}
                className={`${baseStyle} ${
                  pathname === "/Admin"
                    ? "bg-[#FFFAFA] text-black"
                    : "text-white " + hoverStyle
                }`}
              >
                Admin Dashboard
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <button
        className="absolute bottom-10 left-6 right-6 flex items-center gap-2 px-6 py-2 bg-white text-[#576CA8] font-semibold rounded hover:bg-gray-200"
        onClick={downloadAPK}
      >
        <span>Download the app</span>
      </button>
    </div>
  );
}
