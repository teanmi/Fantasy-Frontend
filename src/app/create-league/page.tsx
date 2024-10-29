"use client"; // Ensure the component runs on the client side

import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateLeague: React.FC = () => {
  const [leagueName, setLeagueName] = useState<string>("");
  const [numTeams, setNumTeams] = useState<number>(8); // Default to 8 teams
  const router = useRouter();

  const handleCreateLeague = () => {
    localStorage.setItem("leagueName", leagueName);
    localStorage.setItem("numTeams", numTeams.toString());
    router.push("/"); // Navigate back to the homepage
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center create-league-background">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-center text-deep-blue">Create a New League</h1>
        <p className="text-gray-600 mb-6 text-center">
          Create your custom league by entering a name and selecting the number of teams.
        </p>

        <div className="flex flex-col gap-4">
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
            <select
              id="numTeams"
              value={numTeams}
              onChange={(e) => setNumTeams(parseInt(e.target.value))}
              className="border border-gray-300 p-3 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-deep-blue"
              required
            >
              <option value={4}>4 Teams</option>
              <option value={8}>8 Teams</option>
              <option value={12}>12 Teams</option>
              <option value={16}>16 Teams</option>
            </select>
          </div>

          <button
            onClick={handleCreateLeague}
            className="bg-deep-blue text-white font-bold py-3 px-8 rounded-lg shadow-md"
            aria-label="Create League"
          >
            Create League
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateLeague;
