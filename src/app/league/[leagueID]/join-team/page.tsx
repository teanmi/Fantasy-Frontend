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
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8 text-white">
        Create Your Team for {leagueName ? leagueName : "League"}
      </h1>
      <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label
            className="font-semibold text-lg text-white"
            htmlFor="teamName"
          >
            Team Name
          </label>
          <input
            type="text"
            id="teamName"
            placeholder="Enter Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="border p-2 rounded text text-black"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition-all duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Creating Team..." : "Create Team"}
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CreateTeam;
