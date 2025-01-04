"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import bcrypt from "bcryptjs";
import Link from "next/link";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setPending(false);
      return;
    }

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Send user data to the backend to create the user (you can adjust this to use an API call)
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: hashedPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create an account");
      }

      router.push("/auth/login");
      toast.success("Account created successfully");
    } catch (error) {
      setError(error.message);
      setPending(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#1b0918]">
      <div className="w-[80%] sm:w-[420px] p-4 sm:p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-xl font-semibold mb-4">Sign Up</h2>
        <p className="text-center text-sm text-gray-500 mb-4">
          Create a new account
        </p>

        {!!error && (
          <div className="bg-red-500/10 p-3 rounded-md flex items-center gap-x-2 text-sm text-red-500 mb-6">
            <TriangleAlert />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            disabled={pending}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            disabled={pending}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            disabled={pending}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md"
            disabled={pending}
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <Link
            className="text-blue-500 ml-4 hover:underline cursor-pointer"
            href="/app/Login"
          >
           Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
