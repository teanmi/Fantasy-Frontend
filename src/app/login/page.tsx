"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

const Login: React.FC = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirming password
  const [email, setEmail] = useState(""); // State for email
  const [error, setError] = useState("");
  const [isCreatingAccount, setIsCreatingAccount] = useState(false); // State to toggle between forms

  // Handle login process
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Call NextAuth's signIn function with the credentials provider
    const result = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });
  
    if (result?.error) {
      setError("Invalid username or password"); // Display error message
    } else {
      // Fetch session data with updated userID
      const response = await fetch("/api/auth/session");
      const session = await response.json();
  
      if (session?.user) {
        console.log("UserID:", session.user.id); // Verify userID in session
      }
  
      router.push("/"); // Redirect to dashboard or desired route on success
    }
  };  

  // Handle account creation process
  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const result = await signIn("credentials", {
            redirect: false,
            username,
            password,
          });
       
          if (result?.error) {
            setError("Invalid username or password"); // Display error message
          } else {
            router.push("/"); // Redirect to dashboard or desired route on success
          }
      } else {
        // Handle errors from account creation
        setError(data.error || "Failed to create account");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-[#0077b6] to-[#90e0ef] justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isCreatingAccount ? "Create an Account" : "Login"}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        {/* Registration Form */}
        {isCreatingAccount ? (
          <form onSubmit={handleCreateAccount}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 mb-2">
                Username
              </label>
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
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Email
              </label>
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
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
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
              <label htmlFor="confirm-password" className="block text-gray-700 mb-2">
                Confirm Password
              </label>
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
          // Login Form
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 mb-2">
                Username
              </label>
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
              <label htmlFor="password" className="block text-gray-700 mb-2">
                Password
              </label>
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
