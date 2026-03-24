'use client';
import { useState } from 'react';
import { IPatient } from '@/types/patient';
import { useCreatePatientMutation, useUpdatePatientMutation, useDeletePatientMutation, useGetAllPatientsQuery } from '@/store/api/patientApi';
import { useRouter } from 'next/navigation';

interface PatientsTableProps {
  doctorId: string;
  patients?: IPatient[];
}

const PatientsTable: React.FC<PatientsTableProps> = ({ patients, doctorId }) => {
  const router = useRouter();
  const [createPatient] = useCreatePatientMutation();
  const [updatePatient] = useUpdatePatientMutation();
  const [deletePatient] = useDeletePatientMutation();
  const [selectedPatient, setSelectedPatient] = useState<IPatient | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { data: fetchedPatients = [], isLoading } = useGetAllPatientsQuery(doctorId);
  const allPatients = patients ?? fetchedPatients;
  const doctorPatients = allPatients.filter((p) => {
    const pDoctorId = typeof p.doctor === 'string' ? p.doctor : p.doctor?._id;
    return pDoctorId === doctorId;
  });

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    await createPatient({
      firstName: form.get('firstName') as string,
      lastName: form.get('lastName') as string,
      dob: form.get('dob') as string,
      gender: form.get('gender') as 'male' | 'female' | 'other',
      contact: form.get('contact') as string,
      address: form.get('address') as string,
      medicalHistory: form.get('medicalHistory') as string,
      doctor: doctorId,
    });
    setIsCreating(false);
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedPatient) return;
    const form = new FormData(e.currentTarget);
    await updatePatient({
      id: selectedPatient._id,
      body: {
        firstName: form.get('firstName') as string,
        lastName: form.get('lastName') as string,
        dob: form.get('dob') as string,
        gender: form.get('gender') as 'male' | 'female' | 'other',
        contact: form.get('contact') as string,
        address: form.get('address') as string,
        medicalHistory: form.get('medicalHistory') as string,
      },
    });
    setSelectedPatient(null);
  };

  const handleDelete = async (id: string) => {
    await deletePatient(id);
  };

  return (
  <div className="p-6 bg-blue-50 min-h-screen">

    {/* ADD BUTTON */}
    <button
      onClick={() => setIsCreating(true)}
      className="mb-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow-sm transition"
    >
      + Add Patient
    </button>

    {isLoading && !patients ? (
      <div className="text-blue-700 bg-white p-4 rounded-lg shadow">
        Loading patients…
      </div>
    ) : (

    <div className="overflow-hidden rounded-xl border border-blue-100 shadow bg-white">
      <table className="min-w-full text-sm">
        
        {/* HEADER */}
        <thead className="bg-blue-100 text-blue-900">
          <tr>
            <th className="text-left px-5 py-3 font-semibold">Name</th>
            <th className="text-left px-5 py-3 font-semibold">Gender</th>
            <th className="text-left px-5 py-3 font-semibold">Contact</th>
            <th className="text-left px-5 py-3 font-semibold">Actions</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {doctorPatients.map((p, index) => (
            <tr
              key={p._id}
              onClick={() => router.push(`/patients/${p._id}`)}
              className={`cursor-pointer transition
                ${index % 2 === 0 ? "bg-white" : "bg-blue-50"}
                hover:bg-blue-100`}
            >
              <td className="px-5 py-3 font-medium text-gray-800">
                {p.firstName} {p.lastName}
              </td>

              <td className="px-5 py-3 text-gray-600 capitalize">
                {p.gender}
              </td>

              <td className="px-5 py-3 text-gray-600">
                {p.contact}
              </td>

              <td
                className="px-5 py-3 space-x-2"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedPatient(p)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(p._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}

    {/* MODAL */}
    {(isCreating || selectedPatient) && (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-start pt-20 z-50">
        
        <div className="bg-white w-96 p-6 rounded-2xl shadow-2xl border border-blue-100">
          
          <h3 className="text-xl font-semibold text-blue-800 mb-4">
            {isCreating ? 'Create Patient' : 'Update Patient'}
          </h3>

          <form
            onSubmit={isCreating ? handleCreate : handleUpdate}
            className="space-y-3"
          >
            <input
              name="firstName"
              defaultValue={selectedPatient?.firstName}
              placeholder="First Name"
              required
              className="w-full border border-blue-100 rounded-lg px-3 py-2 text-blue-700 focus:ring-2 focus:ring-blue-200 outline-none"
            />

            <input
              name="lastName"
              defaultValue={selectedPatient?.lastName}
              placeholder="Last Name"
              required
              className="w-full border border-blue-100 rounded-lg px-3 py-2 text-blue-700 focus:ring-2 focus:ring-blue-200"
            />

            <input
              name="dob"
              type="date"
              defaultValue={selectedPatient?.dob}
              required
              className="w-full border border-blue-100 rounded-lg px-3 py-2 text-blue-700 focus:ring-2 focus:ring-blue-200"
            />

            <select
              name="gender"
              defaultValue={selectedPatient?.gender}
              required
              className="w-full border border-blue-100 rounded-lg px-3 py-2 text-blue-700 focus:ring-2 focus:ring-blue-200"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <input
              name="contact"
              defaultValue={selectedPatient?.contact}
              placeholder="Contact"
              className="w-full border border-blue-100 rounded-lg px-3 py-2 text-blue-700 focus:ring-2 focus:ring-blue-200"
            />

            <input
              name="address"
              defaultValue={selectedPatient?.address}
              placeholder="Address"
              className="w-full border border-blue-100 rounded-lg px-3 py-2 text-blue-700 focus:ring-2 focus:ring-blue-200"
            />

            <textarea
              name="medicalHistory"
              defaultValue={selectedPatient?.medicalHistory}
              placeholder="Medical History"
              className="w-full border border-blue-100 rounded-lg px-3 py-2 text-blue-700 focus:ring-2 focus:ring-blue-200"
            />

            {/* BUTTONS */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
            >
              {isCreating ? 'Create' : 'Update'}
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedPatient(null);
                setIsCreating(false);
              }}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-semibold transition"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    )}
  </div>
);
}
export default PatientsTable;