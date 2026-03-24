// app/dashboard/patients/page.tsx
import PatientsTable from '../../../components/tables/PatientsTable';
import { IPatient } from '@/types/patient';

async function fetchPatients(): Promise<IPatient[]> {
  const res = await fetch('http://localhost:5000/api/patients', {
    cache: 'no-store', // no caching
    headers: {
      // pass token if needed
      'Authorization': `Bearer ${process.env.AUTH_TOKEN}`,
    },
  });

  if (!res.ok) throw new Error('Failed to fetch patients');
  return res.json();
}

export default async function PatientsPage() {
  const patients = await fetchPatients();

  // For demo, doctorId is hardcoded or fetch from session if you implement auth
  const doctorId = 'doctor-id-here'; 
  const doctorPatients = patients.filter(p => p.doctor === doctorId);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Patients</h2>
      {/* Pass patients to Client Component */}
      <PatientsTable patients={doctorPatients} doctorId={doctorId} />
    </div>
  );
}