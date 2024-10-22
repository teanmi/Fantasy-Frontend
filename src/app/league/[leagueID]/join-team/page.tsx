"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const CreateTeam = () => {
  const [teamName, setTeamName] = useState<string>("");
  const [leagueName, setLeagueName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams(); // Access dynamic route params

  useEffect(() => {
    const fetchLeague = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/league/${params.leagueID}`
        );
        
        if (!response.ok) {
          throw new Error("Failed to fetch league data.");
        }

        const data = await response.json();

        if (data.league) {

          setLeagueName(data.league.name); // Assuming `result[0]` contains the `Name` field
        } else {
          throw new Error("League not found.");
        }
      } catch (err: any) {
        setError("Unable to fetch league information.");
      }
    };

    if (params.leagueID) {
      fetchLeague();
    }
  }, [params.leagueID]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/api/league/${params.leagueID}/create-team`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            teamName,
            leagueID: params.leagueID,
          }),
        }
      );
      
      const data = await response.json();

      if (response.ok) {
        router.push(`/league/${params.leagueID}/home`); // Redirect to the league page
      } else {
        throw new Error(data?.message ? data.message : "Failed to create team.");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-700 via-white to-red-600"> {/* Gradient background */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-center text-deep-blue">
          Create Your Team for {leagueName ? leagueName : "League"}
        </h1>
        
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="font-semibold text-lg text-deep-blue" htmlFor="teamName">
              Team Name
            </label>
            <input
              type="text"
              id="teamName"
              placeholder="Enter Team Name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-blue"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`mt-6 bg-deep-blue text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Creating Team..." : "Create Team"}
          </button>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>} {/* Inline error message */}
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

export default CreateTeam;
