import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState<string>(""); // TypeScript: specify type for email
  const [password, setPassword] = useState<string>(""); // TypeScript: specify type for password
  const [error, setError] = useState<string>(""); // TypeScript: specify type for error
  const [loading, setLoading] = useState<boolean>(false); // TypeScript: specify type for loading
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Simple validation for empty fields
    if (!email || !password) {
      setError("Please enter both email and password.");
      setLoading(false);
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password.");
      } else {
        router.push("/dashboard"); // Redirect to dashboard or home page on success
      }
    } catch (err) {
      // Handle any unexpected errors (e.g., network issues)
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded"
          disabled={loading}
        >
          {loading ? "Logging In..." : "Log In"}
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <a href="/auth/signup" className="text-blue-500">
          Sign Up here
        </a>
      </p>
    </div>
  );
};

export default Login;
