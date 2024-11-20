"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const TeamPage = () => {
  const { leagueID, teamID } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();

  const [team, setTeam] = useState<any>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect if user is not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to the login page
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return; // Ensure user is authenticated before fetching data

    const fetchTeamAndPlayers = async () => {
      try {
        // Fetch team details
        const teamResponse = await fetch(
          `http://localhost:3000/api/teams/${teamID}`
        );
        const teamData = await teamResponse.json();

        // Fetch players for this team
        const playersResponse = await fetch(
          `http://localhost:3000/api/teams/${teamID}/players?leagueID=${leagueID}`
        );
        const playersData = await playersResponse.json();

        if (teamResponse.ok && playersResponse.ok) {
          setTeam(teamData.team);
          setPlayers(playersData.players);
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamAndPlayers();
  }, [leagueID, teamID, status]);

  if (loading || status === "loading") {
    return <p>Loading team details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">{team?.teamName}</h1>
      {players.length > 0 ? (
        <ul className="list-disc">
          {players.map((player) => (
            <li key={player.playerID} className="text-lg">
              {player.name} - {player.position}
            </li>
          ))}
        </ul>
      ) : (
        <p>No players claimed by this team.</p>
      )}
    </div>
  );
};

export default TeamPage;
