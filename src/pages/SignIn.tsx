import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, LogIn } from "lucide-react";
import toast from "react-hot-toast";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simple validation
      if (email === "admin@example.com" && password === "password") {
        toast.success("Signed in successfully");
        navigate("/dashboard");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="backdrop-blur-sm bg-white/5 rounded-lg shadow-xl p-8 border border-white/20 relative">
      <Link
        to="/"
        className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
      >
        <Home className="w-6 h-6" />
      </Link>
      <div className="flex justify-center mb-6">
        <div className="bg-purple-100 p-3 rounded-full">
          <LogIn className="w-6 h-6 text-purple-600" />
        </div>
      </div>
      <h2 className="text-2xl font-semibold text-center text-white mb-8">
        Sign in to your account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-normal text-white"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 bg-white/80"
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-normal text-white"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-purple-500 bg-white/80"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-white/90">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-purple-300 hover:text-purple-200"
        >
          Register here
        </Link>
      </p>
      <div className="mt-6 text-center text-sm text-white/80">
        <p>Demo credentials:</p>
        <p>Email: admin@example.com</p>
        <p>Password: password</p>
      </div>
    </div>
  );
}
