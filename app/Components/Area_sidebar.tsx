"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const baseStyle = "px-6 py-8 text-xl cursor-pointer block w-full h-full";
  const hoverStyle = "hover:text-black hover:bg-[#FFFAFA]";
  const [userId, setUserId] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
  }, [userRole]);

  if (loading) {
    return (
      <div className="absolute left-0 top-0 h-full w-60 bg-[#1B264F] z-15" />
    );
  }

  return (
    <div className="absolute left-0 top-0 h-full w-60 bg-[#1B264F] z-15">
      <nav className="mt-15">
        <ul>
          <li>
            <Link
              href="/Dashboard"
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
    </div>
  );
}