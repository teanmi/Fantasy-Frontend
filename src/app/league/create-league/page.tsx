"use client"; // Ensure the component runs on the client side

import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateLeague: React.FC = () => {
  const [leagueName, setLeagueName] = useState<string>("");
  const [numTeams, setNumTeams] = useState<number>(8); // Default to 8 teams
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Error state
  const [showModal, setShowModal] = useState<boolean>(false);
  const [leagueId, setLeagueId] = useState<number | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true while submitting
    setError(null); // Reset error state
    try {
      const response = await fetch("http://localhost:3000/api/leagues/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leagueName,
          numTeams,
        }),
      });

      if (response.ok) {
        const { leagueId } = await response.json();
        setLeagueId(leagueId);
        setShowModal(true);
        setLeagueName(""); // Reset form fields
        setNumTeams(8); // Reset to default number of teams
      } else {
        throw new Error("Failed to create league.");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again."); // Handle errors
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {showModal && leagueId && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-white">
              League Created!
            </h2>
            <p className="mb-4 text-gray-300">
              Your league has been created successfully. Copy the link below or
              click the button to create your team.
            </p>

            {/* Link to Copy */}
            <div className="mb-4 p-2 bg-gray-900 border border-gray-700 rounded">
              <input
                type="text"
                value={`${window.location.origin}/league/${leagueId}/create-team`}
                readOnly
                className="w-full bg-transparent border-none text-gray-300 outline-none"
              />
            </div>

            {/* Button to Redirect */}
            <button
              onClick={() => router.push(`/league/${leagueId}/create-team`)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full transition-all duration-300"
            >
              Create Your Team
            </button>

            {/* Close Modal Button */}
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-gray-400 underline hover:text-white transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <h1 className="text-4xl font-bold mb-8">Create a New League</h1>
      <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="font-semibold text-lg" htmlFor="leagueName">
            League Name
          </label>
          <input
            type="text"
            id="leagueName"
            placeholder="Enter League Name"
            value={leagueName}
            onChange={(e) => setLeagueName(e.target.value)}
            className="border p-2 rounded text text-black"
            required
          />
        </div>

        {/* Number of Teams Selector */}
        <div className="flex flex-col mt-4">
          <label className="font-semibold text-lg" htmlFor="numTeams">
            Number of Teams
          </label>
          <select
            id="numTeams"
            value={numTeams}
            onChange={(e) => setNumTeams(parseInt(e.target.value))}
            className="border p-3 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            required
          >
            <option value={4}>4 Teams</option>
            <option value={8}>8 Teams</option>
            <option value={12}>12 Teams</option>
            <option value={16}>16 Teams</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-all duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading} // Disable button when loading
        >
          {loading ? "Creating League..." : "Create League"}
        </button>
      </form>
    </div>
  );
};

export default CreateLeague;
