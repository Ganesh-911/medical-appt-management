import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user, router]);

  if (user === undefined) return null;
  if (!user) return null;

  return (
    <div>
      <h1>User Dashboard</h1>

      <Link href="/doctors">Book Appointment</Link>
      <br />
      <Link href="/appointments">My Appointments</Link>
    </div>
  );
}
