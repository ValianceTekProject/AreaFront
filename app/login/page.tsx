'use client';

import { EyeClosed, Eye } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [show, setShow] = useState(false);

  return (
    <div className="min-h-screen bg-[#8BAAAD] flex items-center justify-center p-6">
      <div className="bg-[#F4FFF8] rounded-3xl shadow-2xl w-full max-w-7xl p-6 md:p-15 grid md:grid-cols-2 gap-8 md:gap-30">
        <div className="flex flex-col justify-center">
          <div className="mb-8">
            <label className="block text-2xl font-semibold text-[#1B1D20] mb-4">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border-2 border-[#8BAAAD] rounded-lg focus:outline-none focus:border-[#1B1D20] text-[#1B1D20] transition-colors placeholder:text-gray-500"
            />
          </div>

          <div className="mb-2">
            <label className="block text-2xl font-semibold text-gray-800 mb-4">
              Password
            </label>
            <div className="relative mb-2">
              <input
                type={show ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border-2 border-[#8BAAAD] rounded-lg focus:outline-none focus:border-[#1B1D20] text-[#1B1D20] transition-colors placeholder:text-gray-500"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {show ? <Eye /> : <EyeClosed />}
              </button>
            </div>
          </div>

          <a href="#" className="text-sm text-gray-500 hover:text-gray-700 mb-12">
            Forgot password ?
          </a>

          <button className="w-full max-w-xs bg-[#1C3738] text-white py-3.5 rounded-lg text-lg font-medium hover:bg-[#0e2020] transition-colors mb-6 mx-auto">
            Log in
          </button>

          <Link href="/SignUp" className="text-gray-600 hover:text-gray-800 text-center">
            Create account
          </Link>
        </div>

        <div className="bg-[#1C3738] rounded-2xl p-6 md:p-8 flex flex-col justify-center">
          <h2 className="text-[#F4FFF8] text-2xl font-semibold mb-8 text-center">
            Other sign in methods
          </h2>

          <div className="space-y-4">
            <button className="w-full bg-[#F4FFF8] hover:bg-[#dbe6df] text-gray-800 py-3.5 rounded-lg font-medium text-sm lg:text-2xl flex items-center md:gap-18 transition-colors">
              <svg className="w-8 h-8 mx-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Log in with Google
            </button>

            <button className="w-full bg-[#F4FFF8] hover:bg-[#dbe6df] text-gray-800 py-3.5 rounded-lg font-medium text-sm lg:text-2xl flex items-center md:gap-18 transition-colors">
              <svg className="w-8 h-8 mx-5" viewBox="0 0 24 24" fill="#5865F2">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
              </svg>
              Log in with Discord
            </button>

            <button className="w-full bg-[#F4FFF8] hover:bg-[#dbe6df] text-gray-800 py-3.5 rounded-lg font-medium text-sm lg:text-2xl flex items-center md:gap-18 transition-colors">
              <svg className="w-8 h-8 mx-5" viewBox="0 0 24 24" fill="#181717">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Log in with Github
            </button>

            <button className="w-full bg-[#F4FFF8] hover:bg-[#dbe6df] text-gray-800 py-3.5 rounded-lg font-medium text-sm lg:text-2xl flex items-center md:gap-18 transition-colors">
              <svg className="w-8 h-8 mx-5" viewBox="0 0 24 24" fill="#1DB954">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              Log in with Spotify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}