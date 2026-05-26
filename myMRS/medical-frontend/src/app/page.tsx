'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-4">
      {/* Hero Message */}
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-[#0B1D59] text-center">
        Welcome to MedCare
      </h1>
      <p className="text-lg md:text-xl text-[#0B1D59] mb-12 text-center max-w-xl">
        Your trusted medical system. Access your appointments, doctors, and health records easily.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => router.push('/login')}
          className="px-8 py-4 bg-[#0B1D59] text-white font-semibold rounded-lg shadow-lg hover:bg-blue-800 transition transform hover:-translate-y-1"
        >
          Login
        </button>
        <button
          onClick={() => router.push('/register')}
          className="px-8 py-4 bg-white text-[#0B1D59] font-semibold rounded-lg shadow-lg border-2 border-[#0B1D59] hover:bg-[#0B1D59] hover:text-white transition transform hover:-translate-y-1"
        >
          Sign Up
        </button>
      </div>

      {/* Optional Footer */}
      <p className="mt-16 text-sm text-gray-500 text-center max-w-md">
        © 2026 MedCare. All rights reserved.
      </p>
    </div>
  );
}