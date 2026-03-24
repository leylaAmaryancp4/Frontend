'use client';

import React from 'react';
import RecordRequestsTable from '@/components/tables/RecordRequestsTable';

const RecordRequestsPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Record Requests</h1>
      <RecordRequestsTable />
    </div>
  );
};

export default RecordRequestsPage;
