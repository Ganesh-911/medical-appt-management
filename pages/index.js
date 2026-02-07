import Link from "next/link";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">
        Medical Appointment Booking System
      </h1>

      <p className="text-gray-600 mb-6">
        Book doctor appointments easily without waiting
      </p>

      {!user && (
        <div className="space-x-4">
          <Link
            href="/login"
            className="px-6 py-2 bg-blue-600 text-white rounded"
          >
            User Login
          </Link>

          <Link
            href="/admin/login"
            className="px-6 py-2 border border-blue-600 text-blue-600 rounded"
          >
            Admin Login
          </Link>
        </div>
      )}

      {user && (
        <Link
          href="/dashboard"
          className="px-6 py-2 bg-green-600 text-white rounded"
        >
          Go to Dashboard
        </Link>
      )}
    </div>
  );
}
