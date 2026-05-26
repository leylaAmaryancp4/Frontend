'use client';
import { useRegisterMutation } from '@/store/api/authApi';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
   const [lastName, setlastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [roleId, setRoleId] = useState<"doctor" | "admin" | "hospital" | "user">("doctor");
  const [register, { isLoading, error }] = useRegisterMutation();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
    const response = await register({ name, lastName, email, password, roleId }).unwrap();

    // ✅ Redux is already set via onQueryStarted
    if (response.user.role === 'doctor') {
      router.push(`/dashboard/doctor/profile/${response.user._id}`);
    } else {
      router.push('/dashboard');
    }
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-black p-8 rounded shadow-md w-96">
        <h1 className="text-2xl mb-4">Register</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
          required
        />

        <input
          type="text"
          placeholder="lastName"
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
          required
        />
        
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
        <label className="block mb-1">Select Role</label>
<select
  value={roleId}
  onChange={(e) => setRoleId(e.target.value as "doctor" | "admin" | "hospital" | "user")}
  className="w-full p-2 border mb-3 rounded"
  required
>
  
  <option value="doctor" className="text-black">Doctor</option>
  <option value="admin" className="text-black">Admin</option>
  <option value="hospital" className="text-black">Hospital</option>
  <option value="user" className="text-black">User</option>
</select>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>

        {error && <p className="text-red-500 mt-2">Registration failed</p>}

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 underline hover:text-blue-800">Login</Link>
        </p>
      </form>
    </div>
  );
}