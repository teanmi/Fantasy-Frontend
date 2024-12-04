"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const LeagueHomePage = ({ params }: { params: { leagueID: string } }) => {
  const leagueID = params.leagueID;
  const { data: session, status } = useSession();
  const router = useRouter();

  const [teams, setTeams] = useState<any[]>([]);
  const [leagueName, setLeagueName] = useState<string>("");
  const [teamCount, setTeamCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [userTeamID, setUserTeamID] = useState<string | null>(null); // Store the user's team ID

  const handleDeleteLeague = async () => {
    setLoading(true); // Set loading state to true while submitting
    setError(null); // Reset error state

    console.log("Deleting league with ID:", leagueID);
    
    try {
      const response = await fetch("http://localhost:3000/api/league/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leagueID
        }),
      });

      if (response.ok) {
        router.push("/"); // Redirect to the homepage
      } else {
        throw new Error("Failed to delete league.");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again."); // Handle errors
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Redirect if user is not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to sign-in page
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return; // Wait until authentication is confirmed

    const fetchUserTeam = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user-team", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: session?.user?.id,
            leagueID: params.leagueID,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          setUserTeamID(data.teamID);
        } else {
          setUserTeamID(null);
        }
      } catch (err: any) {
        setError("Unable to fetch user team.");
      }
    };

    const fetchLeagueData = async () => {
      try {
        const leagueResponse = await fetch(
          `http://localhost:3000/api/league/${params.leagueID}`
        );
        const leagueData = await leagueResponse.json();

        if (!leagueResponse.ok) {
          throw new Error(
            leagueData.message || "Failed to fetch league details"
          );
        }

        setLeagueName(leagueData.league.name);
        setTeamCount(leagueData.league.team_count);

        const teamsResponse = await fetch(
          `http://localhost:3000/api/league/${params.leagueID}/teams`
        );
        const teamsData = await teamsResponse.json();

        if (teamsResponse.ok) {
          setTeams(teamsData.teams);
        } else {
          throw new Error(teamsData.message || "Failed to fetch teams");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTeam(); // Fetch the user's team
    fetchLeagueData(); // Fetch league data and teams
  }, [params.leagueID, session?.user?.id, status]);

  if (loading || status === "loading") {
    return <p>Loading league details and teams...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">Teams in League: {leagueName}</h1>
      <p className="text-lg mb-8">
        Current Teams: {teams.length} / {teamCount}
      </p>

      {teams.length > 0 ? (
        <ul className="list-disc">
          {teams.map((team) => (
            <li key={team.id} className="text-lg">
              <Link
                href={`/league/${leagueID}/${team.teamID}`}
                className="text-blue-500 hover:underline"
              >
                {team.teamName}
                {/* If the user is linked to this team, display (Your Team) */}
                {userTeamID === team.teamID && (
                  <span className="ml-2 text-green-500">(Your Team)</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No teams found for this league.</p>
      )}

      <div className="mt-8">
        <Link
          href={`/league/${leagueID}/search`}
          className="text-blue-500 hover:underline"
        >
          Search Players
        </Link>
      </div>

      <div className="mt-4">
        <button
            onClick={handleDeleteLeague}
            className="bg-red-400 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-red-600"
            aria-label="Create League"
          >
            Delete League
          </button>
      </div>
    </div>
  );
};

export default LeagueHomePage;
