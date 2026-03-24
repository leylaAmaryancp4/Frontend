'use client';
import { redirect } from 'next/navigation';

export default function OldDoctorProfilePage({ params }: { params: { id: string } }) {
  const { id } = params;
  redirect(`/dashboard/doctor/profile/${id}`);
}