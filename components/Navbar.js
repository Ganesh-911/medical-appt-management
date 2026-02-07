import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/router";

export default function Navbar() {
  const { user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <Link href="/" className="text-xl font-bold">
        Medical Appointment
      </Link>

      <div className="space-x-4 flex items-center">
        {!user && (
          <>
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
            <Link href="/admin/login" className="text-blue-600 hover:underline">
              Admin Login
            </Link>
          </>
        )}

        {user && (
          <>
            <span className="text-sm text-gray-600">
              {user.email}
            </span>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
