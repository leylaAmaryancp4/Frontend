'use client';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import RoleGuard from '@/app/dashboard/roleGuard';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useGetAllPatientsQuery} from '@/store/api/patientApi';
import { useGetAppointmentsQuery } from '@/store/api/appointmentApi';

export default function DoctorProfilePage() {
  const doctor = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  const params = useParams<{ id: string }>();

  if (!doctor) return <div className="text-center text-black mt-10">Doctor not found</div>;

  // If someone visits a different id than the logged-in doctor, keep UI safe.
  const requestedId = params?.id;
  const isSelf = !requestedId || requestedId === doctor._id || requestedId === 'me';

  const { data: patients = [], isLoading: patientsLoading } = useGetAllPatientsQuery(
    doctor._id,
    { skip: !isSelf }
  );

  const { data: appointments = [], isLoading: appointmentsLoading } = useGetAppointmentsQuery(
    { doctorId: doctor._id },
    { skip: !isSelf }
  );

  const appointmentData = [
    { name: 'Jan', appointments: 0 },
    { name: 'Feb', appointments: 0 },
    { name: 'Mar', appointments: 0 },
    { name: 'Apr', appointments: 0 },
    { name: 'May', appointments: 0 },
    { name: 'Jun', appointments: 0 },
  ];

  const goToPatients =() =>{
    router.push('/patients');
  }

  const goToAppointments = () => {
    router.push('/appointments');
  };

  return (
    <RoleGuard allowedRole="doctor">
      <div className="container mx-auto p-4">

        {/* Doctor Info */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex items-center">
          <img
            className="w-32 h-32 rounded-full mr-6 object-cover bg-gray-100"
            src={doctor.profilePicture || '/next.svg'}
            alt="Doctor Profile"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/next.svg';
            }}
          />
          <div>
            <h1 className="text-3xl text-blue-500 font-bold">{doctor.name} {doctor.lastName}</h1>
            <p className="text-gray-600">{doctor.speciality || 'Not set'}</p>
            <p className="text-gray-600">{doctor.email}</p>
            {!isSelf && (
              <p className="text-sm text-red-600 mt-2">
                You can only view your own profile.
              </p>
            )}
          </div>
        </div>

        {/* Stats */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div
            className="bg-white rounded-lg shadow-lg p-6 text-center cursor-pointer hover:bg-gray-100"
            onClick={goToPatients}
          >
            <p className="text-3xl font-bold">{patientsLoading ? '…' : patients.length}</p>
            <p className="text-gray-600">Patients</p>
          </div>

          <div
            className="bg-white rounded-lg shadow-lg p-6 text-center cursor-pointer hover:bg-gray-100"
            onClick={goToAppointments}
          >
            <p className="text-3xl font-bold">{appointmentsLoading ? '…' : appointments.length}</p>
            <p className="text-gray-600">Appointments</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <p className="text-3xl font-bold">5+</p>
            <p className="text-gray-600">Years of Experience</p>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-xl text-blue-500 font-bold mb-4">Monthly Appointments</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appointmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="appointments" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </RoleGuard>
  );
}