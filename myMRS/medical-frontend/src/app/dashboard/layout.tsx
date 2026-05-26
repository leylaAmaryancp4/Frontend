'use client';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logOut } from '../../store/api/slices/authSlice';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logOut());
    router.push('/login');
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-6 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">Medical System</h2>
        {user && (
          <nav className="flex flex-col gap-4">
            {user.role.toLowerCase() === 'admin' && (
              <>
                <Link href="/dashboard/admin/adminPage" className="text-left px-2 py-1 rounded hover:bg-blue-700">Admin Management</Link>
                <Link href="/dashboard/doctor/id" className="text-left px-2 py-1 rounded hover:bg-blue-700">Doctor Management</Link>
                <Link href="/dashboard/hospital/hospitalPage" className="text-left px-2 py-1 rounded hover:bg-blue-700">Hospital Management</Link>
              </>
            )}
            {user.role.toLowerCase() === 'doctor' && (
              <Link href={`/dashboard/doctor/profile/${user._id}`} className="text-left px-2 py-1 rounded hover:bg-blue-700">My Profile</Link>
            )}
            {user.role.toLowerCase() === 'hospital' && (
              <Link href="/dashboard/hospital/hospitalPage" className="text-left px-2 py-1 rounded hover:bg-blue-700">Hospital Dashboard</Link>
            )}
          </nav>
        )}
      </div>

      {/* Page content */}
      <div className="flex-1 p-10 bg-gray-100">
        {children}
      </div>
    </div>
  );
}