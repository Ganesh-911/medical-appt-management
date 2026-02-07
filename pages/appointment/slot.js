import { useRouter } from "next/router";
import Link from "next/link";

export default function SlotSelection() {
  const router = useRouter();
  const { doctor, date } = router.query;

  const slots = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  if (!doctor || !date) return <p>Loading...</p>;

  return (
    <div>
      <h1>Select Slot</h1>

      {slots.map((slot) => (
        <div key={slot}>
          <Link
            href={{
              pathname: "/appointment/details",
              query: { doctor, date, slot },
            }}
          >
            {slot}
          </Link>
        </div>
      ))}
    </div>
  );
}
