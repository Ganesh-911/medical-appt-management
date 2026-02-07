import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import emailjs from "@emailjs/browser";


export default function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async () => {
    try {
      const snapshot = await getDocs(collection(db, "appointments"));
      const data = snapshot.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));
      setAppointments(data);
    } catch (err) {
      console.error("Error fetching appointments:", err);
    } finally {
      setLoading(false);
    }
  };

 const updateStatus = async (appt, status) => {
  try {
    await updateDoc(doc(db, "appointments", appt.id), { status });

    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
      {
        patient_name: appt.patientName,
        doctor: appt.doctor,
        date: appt.date,
        slot: appt.slot,
        status,
        to_email: appt.email,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    );

    fetchAppointments();
  } catch (err) {
    console.error("Email or status update failed:", err);
    alert("Status updated, but email failed");
  }
};


  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return <p className="p-6">Loading appointments...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

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
              <p><b>Patient:</b> {appt.patientName}</p>
              <p><b>Doctor:</b> {appt.doctor}</p>
              <p><b>Date:</b> {appt.date}</p>
              <p><b>Slot:</b> {appt.slot}</p>
              <p>
                <b>Status:</b>{" "}
                <span
                  className={
                    appt.status === "Approved"
                      ? "text-green-600"
                      : appt.status === "Rejected"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }
                >
                  {appt.status}
                </span>
              </p>
            </div>

            <div className="space-x-2">
              {appt.status === "Pending" && (
                <>
                  <button onClick={() => updateStatus(appt, "Approved")}>Approve</button>
                  <button onClick={() => updateStatus(appt, "Rejected")}>Reject</button>

                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
