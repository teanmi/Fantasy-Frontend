"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const PlayersPage = () => {
  const { leagueID } = useParams(); // Get the leagueID from the URL parameters
  const [players, setPlayers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [position, setPosition] = useState<string>("");

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
    if (leagueID) {
      fetchPlayers();
    }
  }, [position, leagueID]); // Add leagueID as a dependency

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPosition(e.target.value);
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
        <option value="DEF">DEF</option>
      </select>
      <ul className="list-disc">
        {players?.map((player) => (
          <li key={player.playerID} className="text-lg">
            {player.playerName} - {player.position} <br />
            Team: {player.teamName ? player.teamName : "Unclaimed"} <br />
            <button>Claim</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayersPage;
