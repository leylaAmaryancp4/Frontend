'use client';

import React from 'react';
import {
  useApproveRequestMutation,
  useGetRecordRequestsQuery,
  useRejectRequestMutation,
} from '@/store/api/recordRequestApi';

export default function RecordRequestsTable() {
  const { data = [], isLoading, isError } = useGetRecordRequestsQuery();
  const [approveRequest, { isLoading: approving }] = useApproveRequestMutation();
  const [rejectRequest, { isLoading: rejecting }] = useRejectRequestMutation();

  if (isLoading) return <div className="text-gray-700">Loading requests…</div>;
  if (isError) return <div className="text-red-600">Failed to load requests.</div>;

  return (
    <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="py-2 pr-4">Patient</th>
            <th className="py-2 pr-4">Hospital</th>
            <th className="py-2 pr-4">Message</th>
            <th className="py-2 pr-4">Status</th>
            <th className="py-2 pr-4">Created</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((r) => (
            <tr key={r._id} className="border-b">
              <td className="py-2 pr-4">
                {r.patient?.firstName} {r.patient?.lastName}
              </td>
              <td className="py-2 pr-4">{r.hospital?.name ?? '—'}</td>
              <td className="py-2 pr-4">{r.message ?? '—'}</td>
              <td className="py-2 pr-4 capitalize">{r.status}</td>
              <td className="py-2 pr-4">
                {r.createdAt ? new Date(r.createdAt).toLocaleString() : '—'}
              </td>
              <td className="py-2">
                <div className="flex gap-2">
                  <button
                    disabled={r.status !== 'pending' || approving || rejecting}
                    onClick={() => approveRequest(r._id)}
                    className="bg-green-600 disabled:bg-gray-300 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    disabled={r.status !== 'pending' || approving || rejecting}
                    onClick={() => rejectRequest(r._id)}
                    className="bg-red-600 disabled:bg-gray-300 text-white px-3 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={6} className="py-6 text-center text-gray-600">
                No record requests yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

