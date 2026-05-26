'use client';

import RoleGuard from '@/app/dashboard/roleGuard';
import { useGetPatientByIdQuery, useUpdatePatientMutation } from '@/store/api/patientApi';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type FormState = {
  firstName: string;
  lastName: string;
  dob: string;
  gender: 'male' | 'female' | 'other';
  contact: string;
  address?: string;
  medicalHistory?: string;
};

export default function PatientDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const patientId = params?.id;

  const { data: patient, isLoading, isError } = useGetPatientByIdQuery(patientId!, { skip: !patientId });
  const [updatePatient, { isLoading: saving }] = useUpdatePatientMutation();

  const initialForm = useMemo<FormState | null>(() => {
    if (!patient) return null;
    return {
      firstName: patient.firstName ?? '',
      lastName: patient.lastName ?? '',
      dob: (patient.dob ?? '').slice(0, 10),
      gender: patient.gender ?? 'other',
      contact: patient.contact ?? '',
      address: patient.address ?? '',
      medicalHistory: patient.medicalHistory ?? '',
    };
  }, [patient]);

  const [form, setForm] = useState<FormState>({
    firstName: '',
    lastName: '',
    dob: '',
    gender: 'other',
    contact: '',
    address: '',
    medicalHistory: '',
  });

  useEffect(() => {
    if (initialForm) setForm(initialForm);
  }, [initialForm]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId) return;
    await updatePatient({ id: patientId, body: form }).unwrap();
  };

  return (
    <RoleGuard allowedRole="doctor">
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-3xl px-4 py-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {patient ? `${patient.firstName} ${patient.lastName}` : 'Patient'}
              </h1>
              <p className="text-slate-600">Update patient demographics and contact details.</p>
            </div>
            <button
              onClick={() => router.push('/patients')}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
            >
              Back to patients
            </button>
          </div>

          <div className="mt-6">
            {isLoading && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-700 shadow-sm">
                Loading…
              </div>
            )}
            {isError && (
              <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
                Failed to load patient.
              </div>
            )}

            {patient && (
              <form onSubmit={onSubmit} className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="p-6 border-b border-slate-100">
                  <h2 className="font-semibold text-slate-900">Patient profile</h2>
                  <p className="text-sm text-slate-600">Fields marked * are required.</p>
                </div>

                <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label className=" block text-blue-700 text-sm">
                    <div className="mb-1 font-medium  text-slate-700">First name *</div>
                    <input
                      className="w-full rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                      value={form.firstName}
                      onChange={(e) => setForm((s) => ({ ...s, firstName: e.target.value }))}
                    />
                  </label>

                  <label className="block text-blue-700 text-sm">
                    <div className="mb-1 font-medium text-slate-700">Last name *</div>
                    <input
                      className="w-full rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                      value={form.lastName}
                      onChange={(e) => setForm((s) => ({ ...s, lastName: e.target.value }))}
                    />
                  </label>

                  <label className="block text-blue-700 text-sm">
                    <div className="mb-1 font-medium text-slate-700">Date of birth *</div>
                    <input
                      type="date"
                      className="w-full rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                      value={form.dob}
                      onChange={(e) => setForm((s) => ({ ...s, dob: e.target.value }))}
                    />
                  </label>

                  <label className="block text-blue-700 text-sm">
                    <div className="mb-1 font-medium text-slate-700">Gender *</div>
                    <select
                      className="w-full rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                      value={form.gender}
                      onChange={(e) => setForm((s) => ({ ...s, gender: e.target.value as FormState['gender'] }))}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </label>

                  <label className="block text-blue-700 text-sm sm:col-span-2">
                    <div className="mb-1 font-medium text-slate-700">Contact *</div>
                    <input
                      className="w-full rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                      value={form.contact}
                      onChange={(e) => setForm((s) => ({ ...s, contact: e.target.value }))}
                    />
                  </label>

                  <label className="block text-blue-700 text-sm sm:col-span-2">
                    <div className="mb-1 font-medium text-slate-700">Address</div>
                    <input
                      className="w-full rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      value={form.address ?? ''}
                      onChange={(e) => setForm((s) => ({ ...s, address: e.target.value }))}
                    />
                  </label>

                  <label className="block text-blue-700 text-sm sm:col-span-2">
                    <div className="mb-1 font-medium text-slate-700">Medical history</div>
                    <textarea
                      className="w-full rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      rows={4}
                      value={form.medicalHistory ?? ''}
                      onChange={(e) => setForm((s) => ({ ...s, medicalHistory: e.target.value }))}
                    />
                  </label>
                </div>

                <div className="p-6 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl bg-blue-600 px-5 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:bg-slate-300"
                  >
                    {saving ? 'Saving…' : 'Save changes'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </RoleGuard>
  );
}

