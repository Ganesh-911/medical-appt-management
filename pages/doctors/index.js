import Link from "next/link";

const doctors = [
  {
    id: 1,
    name: "Dr. Ramesh",
    department: "Cardiology",
  },
  {
    id: 2,
    name: "Dr. Sita",
    department: "Dermatology",
  },
  {
    id: 3,
    name: "Dr. Kumar",
    department: "Orthopedics",
  },
];

export default function Doctors() {
  return (
    <div>
  <h1 className="text-2xl font-semibold mb-2">
    Choose a Doctor
  </h1>

  <p className="text-gray-600 mb-8">
    Select a specialist to book your hospital appointment.
  </p>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {doctors.map((doc) => (
      <div
        key={doc.id}
        className="bg-white rounded-xl shadow p-6 hover:shadow-md transition"
      >
        <h2 className="text-lg font-semibold mb-1">
          {doc.name}
        </h2>

        <p className="text-sm text-gray-500 mb-4">
          {doc.department}
        </p>

        <Link
          href={{
            pathname: "/appointment/date",
            query: { doctor: doc.name },
          }}
          className="block text-center bg-blue-100 text-blue-700 py-2 rounded-lg hover:bg-blue-200 text-sm font-medium"
        >
          Select Doctor
        </Link>
      </div>
    ))}
  </div>
</div>

  );
}
