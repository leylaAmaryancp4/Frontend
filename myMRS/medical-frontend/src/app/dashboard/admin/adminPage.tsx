'use client';
import RoleGuard from '../roleGuard';

export default function AdminPage() {
  return (
    <RoleGuard allowedRole="admin">
      <h1>Admin Dashboard</h1>
    </RoleGuard>
  );
}