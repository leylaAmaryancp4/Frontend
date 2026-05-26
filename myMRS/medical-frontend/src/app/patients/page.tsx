'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import PatientsTable from '@/components/tables/PatientsTable';

const PatientsPage = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user || user.role !== 'doctor') {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl  font-bold mb-4">Patients</h1>
      <PatientsTable doctorId={user._id} />
    </div>
  );
};

export default PatientsPage;
