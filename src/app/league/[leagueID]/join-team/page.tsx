"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";

const CreateTeam = () => {
  const [teamName, setTeamName] = useState<string>("");
  const [leagueName, setLeagueName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams(); // Access dynamic route params
  const { data: session, status } = useSession();

  // Redirect if user is not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to sign-in page
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return; // Wait until authentication is confirmed

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
      // Step 1: Create the team in the league
      const createTeamResponse = await fetch(
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
      const createTeamData = await createTeamResponse.json();

      if (!createTeamResponse.ok) {
        throw new Error(
          createTeamData?.message ? createTeamData.message : "Failed to create team."
        );
      }

      // Step 2: Link the team to the user
      const linkTeamResponse = await fetch(
        `http://localhost:3000/api/teams/link`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: session?.user?.id,
            teamID: createTeamData.teamId, // Assuming the API response includes the new team's ID
            leagueID: params.leagueID,
          }),
        }
      );

      const linkTeamData = await linkTeamResponse.json();

      if (!linkTeamResponse.ok) {
        throw new Error(
          linkTeamData?.message
            ? linkTeamData.message
            : "Failed to link team to user."
        );
      }

      // Redirect to the league page
      router.push(`/league/${params.leagueID}/home`);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-700 via-white to-red-600">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-center text-deep-blue">
          Create Your Team for {leagueName ? leagueName : "League"}
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label
              className="font-semibold text-lg text-deep-blue"
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
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-blue"
              required
            />
          </div>

          <button
            type="submit"
            className={`mt-6 bg-deep-blue text-white font-bold py-3 px-8 rounded-lg shadow-md transition duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Creating Team..." : "Create Team"}
          </button>

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>

        <button
          onClick={() => router.push("/")}
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
