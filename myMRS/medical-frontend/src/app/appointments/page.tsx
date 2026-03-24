'use client';

import RoleGuard from '@/app/dashboard/roleGuard';
import { useGetAllPatientsQuery } from '@/store/api/patientApi';
import { useCreateAppointmentMutation, useGetAppointmentsQuery } from '@/store/api/appointmentApi';
import { RootState } from '@/store/store';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

export default function AppointmentsPage() {
  const user = useSelector((state: RootState) => state.auth.user);

  const doctorId = user?.role === 'doctor' ? user._id : undefined;
  const { data: patients = [] } = useGetAllPatientsQuery(doctorId!, { skip: !doctorId });
  const { data: appointments = [], isLoading, isError } = useGetAppointmentsQuery(doctorId ? { doctorId } : undefined, { skip: !doctorId });

  const [createAppointment, { isLoading: creating }] = useCreateAppointmentMutation();

  const [form, setForm] = useState({
    patientId: '',
    date: '',
    time: '',
    reason: '',
  });

  const patientOptions = useMemo(() => {
    return patients.map((p) => ({
      id: p._id,
      label: `${p.firstName} ${p.lastName}`,
    }));
  }, [patients]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!doctorId) return;
    await createAppointment({
      doctorId,
      patientId: form.patientId,
      date: form.date,
      time: form.time,
      reason: form.reason,
    }).unwrap();
    setForm({ patientId: '', date: '', time: '', reason: '' });
  };

  return (
    <RoleGuard allowedRole="doctor">
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Appointments</h1>
              <p className="text-slate-600">Create and manage your upcoming appointments.</p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Create */}
            <div className="lg:col-span-1">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="p-5 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-900">Create appointment</h2>
                  <p className="text-sm text-slate-600">All fields are required.</p>
                </div>
                <form onSubmit={onSubmit} className="p-5 space-y-4">
                  <label className="block">
                    <div className="text-sm font-medium text-slate-700 mb-1">Patient</div>
                    <select
                      className="w-full rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                      value={form.patientId}
                      onChange={(e) => setForm((s) => ({ ...s, patientId: e.target.value }))}
                    >
                      <option value="" disabled>Select a patient…</option>
                      {patientOptions.map((p) => (
                        <option key={p.id} value={p.id}>{p.label}</option>
                      ))}
                    </select>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <label className="block">
                      <div className="text-sm font-medium text-slate-700 mb-1">Date</div>
                      <input
                        type="date"
                        className="w-full rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                        value={form.date}
                        onChange={(e) => setForm((s) => ({ ...s, date: e.target.value }))}
                      />
                    </label>
                    <label className="block">
                      <div className="text-sm font-medium text-slate-700 mb-1">Time</div>
                      <input
                        type="time"
                        className="w-full rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                        required
                        value={form.time}
                        onChange={(e) => setForm((s) => ({ ...s, time: e.target.value }))}
                      />
                    </label>
                  </div>

                  <label className="block">
                    <div className="text-sm font-medium text-slate-700 mb-1">Reason</div>
                    <input
                      className="w-full rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                      placeholder="e.g. Follow-up consultation"
                      value={form.reason}
                      onChange={(e) => setForm((s) => ({ ...s, reason: e.target.value }))}
                    />
                  </label>

                  <button
                    disabled={creating}
                    className="w-full rounded-xl bg-blue-600 text-white py-2.5 font-semibold hover:bg-blue-700 disabled:bg-slate-300"
                    type="submit"
                  >
                    {creating ? 'Creating…' : 'Create'}
                  </button>
                </form>
              </div>
            </div>

            {/* List */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-900">Your appointments</h2>
                </div>

                {isLoading && <div className="p-6 text-slate-700">Loading…</div>}
                {isError && <div className="p-6 text-red-600">Failed to load appointments.</div>}

                {!isLoading && !isError && (
                  <div className="overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="bg-slate-50 text-left text-sm text-slate-600">
                        <tr>
                          <th className="px-5 py-3 font-medium">Patient</th>
                          <th className="px-5 py-3 font-medium">Date</th>
                          <th className="px-5 py-3 font-medium">Time</th>
                          <th className="px-5 py-3 font-medium">Reason</th>
                          <th className="px-5 py-3 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-sm">
                        {appointments.map((a) => {
                          const p = typeof a.patient === 'string' ? undefined : a.patient;
                          const patientName = p ? `${p.firstName} ${p.lastName}` : '—';
                          return (
                            <tr key={a._id} className="hover:bg-slate-50">
                              <td className="px-5 py-3 font-medium text-slate-900">{patientName}</td>
                              <td className="px-5 py-3 text-slate-700">{a.date ? new Date(a.date).toLocaleDateString() : '—'}</td>
                              <td className="px-5 py-3 text-slate-700">{a.time}</td>
                              <td className="px-5 py-3 text-slate-700">{a.reason}</td>
                              <td className="px-5 py-3">
                                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 capitalize">
                                  {a.status}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                        {appointments.length === 0 && (
                          <tr>
                            <td colSpan={5} className="px-5 py-10 text-center text-slate-600">
                              No appointments yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}

