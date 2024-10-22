"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const CreateTeam: React.FC = () => {
  const [players, setPlayers] = useState<any[]>([]); // Array to hold player data
  const [selectedPlayers, setSelectedPlayers] = useState<{ [key: string]: string[] }>({
    offense: [],
    defense: [],
  }); // Object to hold selected players by position
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [teamName, setTeamName] = useState<string>(""); // Team name
  const [searchTerm, setSearchTerm] = useState<string>(""); // Search term for filtering players
  const router = useRouter();

  // Fetch player data from ESPN API
  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await fetch("https://fantasy.espn.com/apis/v3/games/flb/players");
        const data = await response.json();
        // Assuming data is structured correctly; adapt based on actual response structure
        setPlayers(data.players);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching player data:", error);
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const handlePlayerChange = (position: string, playerId: string) => {
    setSelectedPlayers((prevSelected) => {
      const currentPositionPlayers = prevSelected[position];
      return {
        ...prevSelected,
        [position]: currentPositionPlayers.includes(playerId)
          ? currentPositionPlayers.filter((id) => id !== playerId)
          : [...currentPositionPlayers, playerId],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle the submission of selected players
    console.log("Team Name:", teamName);
    console.log("Selected Players:", selectedPlayers);
    // Here you could add code to save the selected players to your database
    router.push("/"); // Redirect to another page if needed
  };

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Categorize players by position
  const offensivePositions = ["QB", "RB", "WR", "TE"];
  const defensivePositions = ["DL", "LB", "DB"];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Create Your Team</h1>
      {loading ? (
        <p>Loading players...</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
          {/* Team Name Input */}
          <div className="flex flex-col">
            <label className="font-semibold text-lg" htmlFor="teamName">
              Team Name
            </label>
            <input
              type="text"
              id="teamName"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="border p-2 rounded"
              required
            />
          </div>

          {/* Search Bar */}
          <div className="flex flex-col">
            <label className="font-semibold text-lg" htmlFor="search">
              Search Players
            </label>
            <input
              type="text"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name"
              className="border p-2 rounded"
            />
          </div>

          {/* Offensive Positions */}
          <div className="flex flex-col mt-4">
            <h2 className="font-semibold text-lg">Select Offensive Players</h2>
            {offensivePositions.map((pos) => (
              <div key={pos}>
                <h3 className="font-semibold text-md">{pos}</h3>
                {filteredPlayers
                  .filter((player) => player.position === pos)
                  .map((player) => (
                    <label key={player.id} className="flex items-center">
                      <input
                        type="checkbox"
                        value={player.id}
                        checked={selectedPlayers.offense.includes(player.id)}
                        onChange={() => handlePlayerChange("offense", player.id)}
                        className="mr-2"
                      />
                      {player.name} {/* Adjust fields based on actual player data structure */}
                    </label>
                  ))}
              </div>
            ))}
          </div>

          {/* Defensive Positions */}
          <div className="flex flex-col mt-4">
            <h2 className="font-semibold text-lg">Select Defensive Players</h2>
            {defensivePositions.map((pos) => (
              <div key={pos}>
                <h3 className="font-semibold text-md">{pos}</h3>
                {filteredPlayers
                  .filter((player) => player.position === pos)
                  .map((player) => (
                    <label key={player.id} className="flex items-center">
                      <input
                        type="checkbox"
                        value={player.id}
                        checked={selectedPlayers.defense.includes(player.id)}
                        onChange={() => handlePlayerChange("defense", player.id)}
                        className="mr-2"
                      />
                      {player.name} {/* Adjust fields based on actual player data structure */}
                    </label>
                  ))}
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-all duration-300"
          >
            Create Team
          </button>
        </form>
      )}
    </div>
  );
};

export default CreateTeam;
