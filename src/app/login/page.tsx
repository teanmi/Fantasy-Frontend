"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

const Login: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming password
  const [error, setError] = useState("");
  const [isCreatingAccount, setIsCreatingAccount] = useState(false); // State to toggle between forms

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", {
        redirect: false, // Prevent redirection after login
        username,
        password,
    });

    // Handle login response
    if (result?.error) {
        setError("Invalid username or password"); // Display error message
    } else {
        router.push("/"); // Redirect to homepage or desired route on success
    }
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Mock account creation logic
    console.log("Account created for:", username, email); // Replace with your account creation logic
    setUsername("");
    setEmail(""); // Reset email
    setPassword("");
    setConfirmPassword(""); // Reset confirm password
    setIsCreatingAccount(false); // Reset to login after account creation
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-[#0077b6] to-[#90e0ef] justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">{isCreatingAccount ? "Create an Account" : "Login"}</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        {isCreatingAccount ? (
          <form onSubmit={handleCreateAccount}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirm-password" className="block text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-2 px-4 rounded w-full"
            >
              Create Account
            </button>
            <p className="mt-4 text-center">
              Already have an account?{" "}
              <button 
                type="button" 
                onClick={() => setIsCreatingAccount(false)} 
                className="text-[#0077b6] underline"
              >
                Sign In
              </button>
            </p>
          </form>
        ) : (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-gray-300 p-2 w-full rounded"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-2 px-4 rounded w-full"
            >
              Login
            </button>
            <p className="mt-4 text-center">
              Don't have an account?{" "}
              <button 
                type="button" 
                onClick={() => setIsCreatingAccount(true)} 
                className="text-[#0077b6] underline"
              >
                Create Account
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
