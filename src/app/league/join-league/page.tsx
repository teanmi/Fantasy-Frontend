"use client"; // Ensure the component runs on the client side

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const JoinLeague: React.FC = () => {
  const [leagueCode, setLeagueCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null>(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect if user is not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to sign-in page
    }
  }, [status, router]);

  const linkUserToLeague = async (leagueID: number) => {
    try {
      const response = await fetch("http://localhost:3000/api/league/user-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leagueID,
          userID: session?.user?.id,
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response
        throw new Error(errorData?.message || "Failed to link user to league.");
      }
    } catch (err: any) {
      console.error("Error linking user to league:", err.message);
      throw new Error(err.message || "An unexpected error occurred."); // Re-throw for parent try-catch
    }
  };
  
  const handleJoinLeague = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true while submitting
    setError(null); // Reset error state
  
    try {
      const response = await fetch(
        `http://localhost:3000/api/league/${leagueCode}/validate-code`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      const data = await response.json();
      if (response.ok) {
        // Once the league is validated, link the user to the league
        await linkUserToLeague(Number(leagueCode));
        router.push(`/league/${leagueCode}/join-team`); // Redirect to league join page
      } else {
        throw new Error(data?.message || "Failed to validate league.");
      }
    } catch (err: any) {
      console.error("Error during league join process:", err.message);
      setError(err.message || "Something went wrong. Please try again."); // Set error message
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-700 via-white to-red-600">
      {" "}
      {/* Gradient background */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-center text-deep-blue">
          Join a League
        </h1>
        <p className="text-gray-600 mb-6 text-center">
          Enter the league code provided by your league commissioner to join.
        </p>

        <form onSubmit={handleJoinLeague} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              className="font-semibold text-lg text-deep-blue"
              htmlFor="leagueCode"
            >
              League Code
            </label>
            <input
              type="text"
              id="leagueCode"
              placeholder="Enter League Code"
              value={leagueCode}
              onChange={(e) => setLeagueCode(e.target.value)}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-blue"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}{" "}
          {/* Inline error message */}
          <button
            type="submit"
            className={`bg-deep-blue text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Join League"
            disabled={loading} // Disable button while loading
          >
            {loading ? "Joining..." : "Join League"}
          </button>
        </form>

        {/* Home Button */}
        <button
          onClick={() => router.push("/")} // Redirect to the homepage
          className="mt-4 bg-gray-300 text-deep-blue font-bold py-3 px-8 rounded-lg shadow-md transition duration-200 hover:bg-light-gray"
          aria-label="Go to Home"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default JoinLeague;
