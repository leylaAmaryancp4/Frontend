'use client';

import { useLoginMutation } from '@/store/api/authApi';
import { setUser } from  '@/store/api/slices/authSlice';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/store/store';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    // Call login mutation
    const data = await login({ email, password }).unwrap();

    // Store user info in Redux
    dispatch(setUser(data.user));

    // Redirect to dashboard
    router.push('/dashboard');

  } catch (err: any) {
    // Proper error handling for RTK Query
    if ('data' in err) {
      // Server returned an error (e.g., 401 or 404)
      console.error('Server error:', err.data);
      setErrorMessage(err.data?.error || 'Login failed');
    } else {
      // Unknown error
      console.error('Unknown error:', err);
      setErrorMessage('Login failed due to unknown error');
    }
  }
};

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-black p-8 rounded shadow-md w-96">
        <h1 className="text-2xl mb-4 text-white">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </button>

        {errorMessage && <p className="text-red-500 mt-2">Invalid credentials</p>}

        <p className="mt-6 text-center text-gray-400">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-600 underline hover:text-blue-800">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  );
}