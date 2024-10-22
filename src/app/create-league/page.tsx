"use client"; // Ensure the component runs on the client side

import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateLeague: React.FC = () => {
  const [leagueName, setLeagueName] = useState<string>("");
  const [numTeams, setNumTeams] = useState<number>(2);
  const router = useRouter();

  const handleCreateLeague = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here, implement your league creation logic (e.g., saving to a database)
    localStorage.setItem("leagueName", leagueName); // Save league name
    localStorage.setItem("numTeams", numTeams.toString()); // Save number of teams
    router.push("/"); // Navigate to homepage or league page
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-700 via-white to-red-600"> {/* Gradient background */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-center text-deep-blue">Create a League</h1>
        <form onSubmit={handleCreateLeague} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="font-semibold text-lg text-deep-blue" htmlFor="leagueName">
              League Name
            </label>
            <input
              type="text"
              id="leagueName"
              placeholder="Enter League Name"
              value={leagueName}
              onChange={(e) => setLeagueName(e.target.value)}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-blue"
              required
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-lg text-deep-blue" htmlFor="numTeams">
              Number of Teams
            </label>
            <input
              type="number"
              id="numTeams"
              min="2"
              max="16"
              value={numTeams}
              onChange={(e) => setNumTeams(Number(e.target.value))}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-blue"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-deep-blue text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-200 hover:bg-bright-red"
            aria-label="Create League"
          >
            Create League
          </button>
        </form>

        {/* Home Button */}
        <button
          onClick={() => router.push("/")} // Redirect to the homepage
          className="mt-4 bg-gray-300 text-deep-blue font-bold py-3 px-8 rounded-lg shadow-md hover:bg-light-gray"
          aria-label="Go to Home"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default CreateLeague;
