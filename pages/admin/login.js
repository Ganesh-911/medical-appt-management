import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "next/router";

const ADMIN_EMAILS = [
  "admin@hospital.com",
  
];


export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      if (!ADMIN_EMAILS.includes(res.user.email)) {
        setError("You are not authorized as admin");
        return;
      }

      router.push("/admin/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="max-w-md mx-auto py-20">
      <h1 className="text-2xl font-bold mb-6">Admin Login</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <input
        type="email"
        placeholder="Admin Email"
        className="w-full border px-3 py-2 mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border px-3 py-2 mb-6"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Login
      </button>
      <p
  onClick={() => router.push("/reset-password")}
  className="text-blue-600 cursor-pointer mt-4 text-sm"
>
  Forgot password?
</p>

    </div>
  );
}
