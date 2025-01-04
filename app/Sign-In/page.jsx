"use client";

import { useState } from "react";
import { SignIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    const res = await SignIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.ok) {
      router.push("/");
      toast.success("Login successful");
    } else if (res?.status === 401) {
      setError("Invalid Credentials");
      setPending(false);
    } else {
      setError("Something went wrong");
    }
  };

  const handleProvider = (event, value) => {
    event.preventDefault();
    SignIn(value, { callbackUrl: "/" });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#1b0918]">
      <div className="w-[80%] sm:w-[420px] p-4 sm:p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-xl font-semibold mb-4">Sign in</h2>
        <p className="text-center text-sm text-gray-500 mb-4">
          Use email or Google to sign in
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md"
            disabled={pending}
          >
            Continue
          </button>
        </form>

        <div className="my-4 text-center">
          <span className="text-gray-500">Or sign in with</span>
        </div>
        <div className="flex justify-center items-center gap-4">
          <button
            disabled={false}
            onClick={(e) => handleProvider(e, "google")}
            className="bg-slate-300 hover:bg-slate-400 p-2 rounded-md"
          >
            <FcGoogle className="text-2xl" />
          </button>
        </div>

        <p className="text-center text-sm mt-4 text-gray-600">
          Create new account
          <Link
            className="text-blue-500 ml-4 hover:underline cursor-pointer"
            href="/sign-up"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
