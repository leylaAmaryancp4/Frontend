
'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useMeQuery } from '@/store/api/authApi';

export default function RoleGuard({ children, allowedRole }: { children: React.ReactNode; allowedRole: string }) {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'allowed' | 'denied'>('loading');
  useMeQuery(undefined, { skip: !!user });

  useEffect(() => {
    if (!user) return;

    const userRole = user.role.toLowerCase();
    if (userRole === 'admin' || userRole === allowedRole.toLowerCase()) {
      setStatus('allowed');
    } else {
      setStatus('denied');
      setTimeout(() => router.push("/dashboard"), 2000);
    }
  }, [user, allowedRole, router]);

  if (!user || status === 'loading') {
    return <div className="flex justify-center items-center h-screen"><span className="text-[#0B1D59] text-lg font-semibold">Loading...</span></div>;
  }

  if (status === 'denied') {
    return <div className="flex flex-col justify-center items-center h-screen text-center px-4">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-gray-700">You don't have permission to view this page. Redirecting to dashboard...</p>
    </div>;
  }

  return <>{children}</>;
}