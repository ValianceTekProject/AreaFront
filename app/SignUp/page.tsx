"use client";
import React, { useState } from "react";
import { Eye, EyeClosed } from "lucide-react";

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen bg-[#89A5A7] flex flex-col items-center p-0 m-0">
      <header className="w-full bg-[#1B1D20] text-[#F4FFF8] py-4 px-6 text-lg font-semibold">
        LOGO
      </header>
      <div className="flex justify-center items-center w-full flex-1">
        <div className="bg-[#F4FFF8] rounded-2xl shadow-md max-w-3xl w-full p-10">
          <h1 className="text-3xl font-bold text-center mb-8 text-[#1B1D20]">
            Create an account
          </h1>
          <div className="mb-6">
            <label className="block mb-2 font-medium text-[#1B1D20]">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-[#1B1D20] placeholder:text-gray-500"
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 font-medium text-[#1B1D20]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-[#1B1D20] placeholder:text-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <Eye /> : <EyeClosed />}
              </button>
            </div>
          </div>
          <div className="mb-8">
            <label className="block mb-2 font-medium text-[#1B1D20]">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm your password"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-[#1B1D20] placeholder:text-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showConfirm ? <Eye /> : <EyeClosed />}
              </button>
            </div>
          </div>
          <div className="flex justify-center">
            <button className="w-70 bg-[#1C3738] text-[#F4FFF8] py-3 px-8 text-lg rounded-md hover:opacity-90">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}