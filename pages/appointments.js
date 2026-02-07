import { useEffect, useState } from "react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function Appointments() {
  const { user } = useAuth();
  const router = useRouter();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchAppointments = async () => {
      try {
        const q = query(
          collection(db, "appointments"),
          where("userId", "==", user.uid),
          orderBy("createdAt", "desc")
        );

        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setAppointments(data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user, router]);

  if (loading) return <p className="p-6">Loading appointments...</p>;

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">My Appointments</h1>

      {appointments.length === 0 && (
        <p className="text-gray-600">No appointments found.</p>
      )}

      <div className="space-y-4">
        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <p><b>Doctor:</b> {appt.doctor}</p>
              <p><b>Date:</b> {appt.date}</p>
              <p><b>Slot:</b> {appt.slot}</p>
            </div>

            <span
              className={`px-3 py-1 rounded text-sm font-semibold ${
                appt.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : appt.status === "Approved"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {appt.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
