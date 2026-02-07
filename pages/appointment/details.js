import { useState } from "react";
import { useRouter } from "next/router";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useAuth } from "../../context/AuthContext";

export default function PatientDetails() {
  const router = useRouter();
  const { user } = useAuth();

  const doctor = router.isReady ? router.query.doctor : null;
  const date = router.isReady ? router.query.date : null;
  const slot = router.isReady ? router.query.slot : null;

  const bookingReady = doctor && date && slot;

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!user) {
      alert("User not logged in");
      return;
    }

    if (!bookingReady) {
      alert("Booking details not loaded yet. Please wait.");
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, "appointments"), {
        userId: user.uid,
        email: user.email, 
        doctor,
        date,
        slot,
        patientName: name,
        age,
        gender,
        status: "Pending",
        createdAt: Timestamp.now(),
      });

      router.push("/appointments");
    } catch (error) {
      console.error("Error submitting appointment:", error);
      alert("Failed to submit appointment. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Patient Details</h1>

      <p className="mb-2">Doctor: <b>{doctor}</b></p>
      <p className="mb-2">Date: <b>{date}</b></p>
      <p className="mb-4">Slot: <b>{slot}</b></p>

      <input
        type="text"
        placeholder="Patient Name"
        className="w-full border px-3 py-2 rounded mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="number"
        placeholder="Age"
        className="w-full border px-3 py-2 rounded mb-4"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <select
        className="w-full border px-3 py-2 rounded mb-6"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <button
        onClick={handleSubmit}
        disabled={loading || !bookingReady}
        className={`w-full py-2 rounded text-white ${
          loading || !bookingReady ? "bg-gray-400" : "bg-green-600"
        }`}
      >
        {loading ? "Submitting..." : "Submit Appointment Request"}
      </button>
    </div>
  );
}
