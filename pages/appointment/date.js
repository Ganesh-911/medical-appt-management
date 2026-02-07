import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

export default function DateSelection() {
  const router = useRouter();
  const { doctor } = router.query;
  const [date, setDate] = useState("");

  return (
    <div className="max-w-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">
        Select Date for {doctor}
      </h1>

      <input
        type="date"
        className="w-full border px-3 py-2 rounded mb-6"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {date && (
        <Link
          href={{
            pathname: "/appointment/slot",
            query: { doctor, date },
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Continue
        </Link>
      )}
    </div>
  );
}
