"use client";

import { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";
import Header from "../Components/Area_banner";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        window.location.href = "/login";
      } else {
        console.error("Error:", data.message);
      }

    } catch (err) {
      console.error("Network error", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-[#FFFAFA]">
      <Header />
      <div className="flex flex-col items-center mt-10 sm:mt-20 md:mt-32 lg:mt-40 px-4">
        <div className="flex justify-center items-center w-full flex-1">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl shadow-[#576CA8] max-w-3xl w-full p-6 sm:p-8 md:p-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-[#1B1D20]">
              Create an account
            </h1>
            <div className="mb-5 sm:mb-6">
              <label className="block mb-2 font-medium text-[#576CA8] text-sm sm:text-base">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border border-[#576CA8] rounded-md px-3 py-2 text-[#1B1D20] placeholder:text-[#576CA8] text-base"
              />
            </div>
            <div className="mb-5 sm:mb-6">
              <label className="block mb-2 font-medium text-[#576CA8] text-sm sm:text-base">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full border border-[#576CA8] rounded-md px-3 py-2 text-[#1B1D20] placeholder:text-[#576CA8] text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#576CA8]"
                >
                  {showPassword ? <Eye /> : <EyeClosed />}
                </button>
              </div>
            </div>
            <div className="mb-6 sm:mb-8">
              <label className="block mb-2 font-medium text-[#576CA8] text-sm sm:text-base">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="w-full border border-[#576CA8] rounded-md px-3 py-2 text-[#1B1D20] placeholder:text-[#576CA8] text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#576CA8]"
                >
                  {showConfirm ? <Eye /> : <EyeClosed />}
                </button>
              </div>
            </div>
            <div className="flex justify-center">
              <button 
                className="w-full sm:w-70 bg-[#274690] text-white py-3 px-8 text-base sm:text-lg rounded-md hover:opacity-90 transition-opacity" 
                onClick={handleSubmit}
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}