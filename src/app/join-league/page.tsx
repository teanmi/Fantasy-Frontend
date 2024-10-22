"use client"; // Ensure the component runs on the client side

import { useState } from "react";
import { useRouter } from "next/navigation";

const JoinLeague: React.FC = () => {
  const [leagueCode, setLeagueCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleJoinLeague = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error state

    // Simulate league joining logic (e.g., fetching from API or database)
    const isValidLeague = await validateLeagueCode(leagueCode); // Replace with actual function

    if (isValidLeague) {
      localStorage.setItem("leagueCode", leagueCode); // Save league code
      router.push("/"); // Navigate to homepage or league page
    } else {
      setError("Invalid league code. Please try again."); // Set error message
    }

    setLoading(false);
  };

  const validateLeagueCode = async (code: string): Promise<boolean> => {
    return code === "TESTCODE"; // Replace with your validation logic
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-700 via-white to-red-600"> {/* Gradient background */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-center text-deep-blue">Join a League</h1>
        <p className="text-gray-600 mb-6 text-center">
          Enter the league code provided by your league commissioner to join.
        </p>

        <form onSubmit={handleJoinLeague} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="font-semibold text-lg text-deep-blue" htmlFor="leagueCode">
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

          {error && <p className="text-red-500 text-sm">{error}</p>} {/* Inline error message */}

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
