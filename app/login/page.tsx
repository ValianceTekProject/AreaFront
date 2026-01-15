'use client';

import { EyeClosed, Eye } from 'lucide-react';
import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from "../Components/Area_banner";

import GoogleIcon from '../Components/Google_Icon';
import DiscordIcon from '../Components/Discord_Icon';
import GithubIcon from '../Components/Github_Icon';

function LoginForm() {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('authToken', token);
      window.history.replaceState({}, document.title, '/Dashboard');
      window.location.href = '/Dashboard';
    }
  }, [searchParams]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (): Promise<void> => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
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
        if (data.token) {
          localStorage.setItem("authToken", data.token);
        }
        window.location.href = "/Dashboard";
      } else {
        console.error("Error:", data.message);
      }

    } catch (err) {
      console.error("Network error:", err);
    }
  };

  const handleOAuthLogin = async (url: string): Promise<void> => {
    window.location.href = url;
  };

  const services = [
    { name: "Google", url: "http://localhost:8080/auth/google/login", icon: <GoogleIcon /> },
    { name: "Discord", url: "http://localhost:8080/auth/discord/login", icon: <DiscordIcon /> },
    { name: "Github", url: "http://localhost:8080/auth/github/login", icon: <GithubIcon /> },
  ];

  return (
    <div className="min-h-screen bg-[#FFFAFA]">
      <div className="flex items-center justify-center p-6 mt-30">
        <div className="bg-white rounded-3xl shadow-2xl shadow-[#576CA8] w-full max-w-7xl p-6 md:p-15 grid md:grid-cols-2 gap-8 md:gap-30">

          <div className="flex flex-col justify-center">
            <div className="mb-8">
              <label className="block text-2xl font-semibold text-[#1B1D20] mb-4">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3 border-2 border-[#576CA8] rounded-lg focus:outline-none focus:border-[#1B264F] text-[#1B264F] transition-colors placeholder:text-[#576CA8]"
              />
            </div>

            <div className="mb-2">
              <label className="block text-2xl font-semibold text-gray-800 mb-4">Password</label>
              <div className="relative mb-2">
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border-2 border-[#576CA8] rounded-lg focus:outline-none focus:border-[#1B264F] text-[#1B264F] transition-colors placeholder:text-[#576CA8]"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#576CA8]"
                >
                  {show ? <Eye /> : <EyeClosed />}
                </button>
              </div>
            </div>

            <a href="#" className="text-sm text-[#576CA8] hover:text-[#1B264F] mb-12">
              Forgot password ?
            </a>

            <button
              className="w-full max-w-xs bg-[#274690] text-white py-3.5 rounded-lg text-lg font-medium hover:bg-[#1B264F] transition-colors mb-6 mx-auto"
              onClick={handleLogin}
            >
              Log in
            </button>

            <Link href="/SignUp" className="text-[#576CA8] hover:text-[#1B264F] text-center">
              Create account
            </Link>
          </div>

          <div className="bg-[#1B264F] rounded-2xl p-6 md:p-8 flex flex-col justify-center">
            <h2 className="text-[#F4FFF8] text-2xl font-semibold mb-8 text-center">
              Other sign in methods
            </h2>

            <div className="space-y-4 flex flex-col items-center">
              {services.map(service => (
                <button
                  key={service.name}
                  onClick={() => handleOAuthLogin(service.url)}
                  className="flex items-center gap-3 w-full max-w-xs px-4 py-3 bg-white text-[#1B264F] rounded-lg font-medium hover:bg-[#F4FFF8] transition-colors"
                >
                  {service.icon}
                  <span>Sign in with {service.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#FFFAFA]">
      <Header />
      <Suspense fallback={
        <div className="flex items-center justify-center p-6 mt-30">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#274690] mx-auto mb-4"></div>
            <p className="text-xl text-[#1B264F]">Loading...</p>
          </div>
        </div>
      }>
        <LoginForm />
      </Suspense>
    </div>
  );
}