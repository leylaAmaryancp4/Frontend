'use client';
import RoleGuard from '../roleGuard';

export default function HospitalPage() {
  return (
    <RoleGuard allowedRole="hospital">
      <h1>Hospital Dashboard</h1>
    </RoleGuard>
  );
}