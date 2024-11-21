"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";

const PlayersPage = () => {
  const { leagueID } = useParams(); // Get the leagueID from the URL parameters
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [position, setPosition] = useState<string>("");
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userTeamID, setUserTeamID] = useState<string | null>(null); // Store user's team ID

  // Redirect if user is not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to sign-in page
    }
  }, [status, router]);

  // Fetch the logged-in user's teamID for the league
  useEffect(() => {
    if (status !== "authenticated" || !leagueID) return; // Wait until authentication is confirmed

    const fetchUserTeam = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user-team", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: session?.user?.id,  // Ensure userID is correctly passed
            leagueID: leagueID,
          }),
        });

        const data = await response.json();

        if (response.ok && data.teamID) {
          setUserTeamID(data.teamID); // Set the user's teamID
        } else {
          setUserTeamID(null);
        }
      } catch (err: any) {
        setError("Unable to fetch user team.");
      }
    };

    fetchUserTeam();
  }, [status, leagueID, session?.user?.id]); // Re-run when the user logs in or leagueID changes

  const fetchPlayers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3000/api/players/viewall?position=${position}&leagueID=${leagueID}`
      );
      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setPlayers(data);
      } else {
        throw new Error(data.message || "Failed to fetch players");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status !== "authenticated") return; // Wait until authentication is confirmed

    if (leagueID) {
      fetchPlayers();
    }
  }, [position, leagueID]); // Add leagueID as a dependency

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPosition(e.target.value);
  };

  const handleClaim = async (playerID: string) => {
    if (!userTeamID) {
      setError("You must have a team to claim players.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/players/${playerID}/claim`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teamID: userTeamID,  // Use the actual user's teamID
          leagueID: leagueID,  // Pass the leagueID
        }),
      });

      if (response.ok) {
        // Player claimed successfully, update UI
        await fetchPlayers();
      } else {
        throw new Error("Failed to claim player");
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <p>Loading players...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Players</h1>
      <select
        value={position}
        onChange={handleFilterChange}
        className="mb-4 border p-2 rounded"
      >
        <option value="">All Positions</option>
        <option value="QB">QB</option>
        <option value="RB">RB</option>
        <option value="WR">WR</option>
        <option value="TE">TE</option>
        <option value="FLEX">Flex</option>
        <option value="K">K</option>
        <option value="D/ST">D/ST</option>
      </select>
      <ul className="list-disc">
        {players?.map((player) => (
          <li key={player.playerID} className="text-lg">
            {player.playerName} - {player.position} <br />
            Team: {player.teamName ? player.teamName : "Unclaimed"} <br />
            {player.teamName ? "" : <button onClick={() => handleClaim(player.playerID)}>Claim</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayersPage;
