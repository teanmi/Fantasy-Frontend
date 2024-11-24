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
  const [eligibleSlots, setEligibleSlots] = useState<{ [playerID: string]: string[] }>({}); 
  const [playerSlots, setPlayerSlots] = useState<{ [playerID: string]: string }>({});

  // Slot limits for each position
  const slotLimits = {
    QB: 1,
    RB: 2,
    WR: 2,
    FLEX: 2,
    TE: 1,
    K: 1,
    "D/ST": 1,
    BE: Infinity, // No limit for Bench
  };

  // Redirect if user is not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); 
    }
  }, [status, router]);

  // Fetch team and players
  useEffect(() => {
    if (status !== "authenticated") return; 

    const fetchTeamAndPlayers = async () => {
      try {
        const teamResponse = await fetch(`http://localhost:3000/api/teams/${teamID}`);
        const teamData = await teamResponse.json();
        const playersResponse = await fetch(`http://localhost:3000/api/teams/${teamID}/players?leagueID=${leagueID}`);
        const playersData = await playersResponse.json();

        if (teamResponse.ok && playersResponse.ok) {
          setTeam(teamData.team);
          setPlayers(playersData.players);

          // Fetch eligible slots for each player and their current slot
          for (const player of playersData.players) {
            const slotsResponse = await fetch(`http://localhost:3000/api/players/${player.playerID}/eligible-slots`);
            const slotsData = await slotsResponse.json();

            if (slotsResponse.ok) {
              const sanitizedSlots = sanitizeSlots(slotsData.eligible_slots.split(","));
              setEligibleSlots((prev) => ({
                ...prev,
                [player.playerID]: sanitizedSlots,
              }));

              const slotResponse = await fetch(`http://localhost:3000/api/players/${player.playerID}/slot/${teamID}/${leagueID}`);
              const slotData = await slotResponse.json();

              if (slotResponse.ok) {
                setPlayerSlots((prev) => ({
                  ...prev,
                  [player.playerID]: slotData.slot || "BE", 
                }));
              }
            }
          }
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

  const sanitizeSlots = (slots: string[]) => {
    const uniqueSlots = new Set(
      slots
        .filter((slot) => slot !== "IR" && slot !== "OP" && slot !== "Rookie")
        .map((slot) => {
          if (slot.includes("/") && slot !== "D/ST") {
            return "FLEX";
          }
          return slot;
        })
    );
    return Array.from(uniqueSlots);
  };
  

  // Handle position change
  const handlePositionChange = async (playerID: string, newSlot: string) => {
    try {
      if (!["QB", "RB", "WR", "TE", "FLEX", "K", "D/ST", "BE"].includes(newSlot)) {
        throw new Error("Invalid slot value");
      }

      const slotCount = players.filter((player) => playerSlots[player.playerID] === newSlot).length;
      if (slotCount >= slotLimits[newSlot]) {
        throw new Error(`Cannot assign more players to ${newSlot}. Limit reached.`);
      }

      const response = await fetch("http://localhost:3000/api/player-slot", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          playerID: playerID,
          teamID: teamID,
          leagueID: leagueID,
          newSlot: newSlot,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update player slot");
      }

      setPlayerSlots((prev) => ({
        ...prev,
        [playerID]: newSlot, 
      }));

      const updatedPlayersResponse = await fetch(
        `http://localhost:3000/api/teams/${teamID}/players?leagueID=${leagueID}`
      );
      const updatedPlayersData = await updatedPlayersResponse.json();
      setPlayers(updatedPlayersData.players);

    } catch (err) {
      setError(err.message || "Failed to change position");
      console.error("Error changing slot:", err);
    }
  };

  if (loading || status === "loading") {
    return <p>Loading team details...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Group players by their current slot
  const groupPlayersBySlot = (players: any[]) => {
    const grouped = {
      QB: [],
      RB: [],
      WR: [],
      FLEX: [],
      TE: [],
      K: [],
      "D/ST": [],
      Bench: [],
    };

    players.forEach((player) => {
      const playerSlot = playerSlots[player.playerID] || "BE"; 
      if (grouped[playerSlot]) {
        grouped[playerSlot].push(player);
      } else {
        grouped["Bench"].push(player); 
      }
    });

    return grouped;
  };

  const groupedPlayers = groupPlayersBySlot(players);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">{team?.teamName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
        {Object.entries(groupedPlayers).map(([slot, players]) => {
          const slotCount = players.length; // Current number of players in the slot
          const availableSlots = slotLimits[slot] - slotCount; // Calculate available slots

          return (
            <div key={slot} className="p-6 border rounded-lg w-full max-w-xl">
              {/* Display slot header with available slots if it's not Bench */}
              <h2 className="text-2xl font-semibold mb-2">
                {slot}
                {slot !== "BE" && availableSlots >= 0 && ` (${availableSlots} ${availableSlots === 1 ? 'Slot' : 'Slots'} Available)`}
              </h2>
              {players.length > 0 ? (
                <ul className="list-disc pl-6">
                  {players.map((player) => (
                    <li key={player.playerID} className="text-lg flex justify-between items-center mb-3">
                      <span>{player.name}</span>
                      <span className="text-sm text-gray-500">{player.position}</span>
                      <select
                        onChange={(e) => handlePositionChange(player.playerID, e.target.value)}
                        value={playerSlots[player.playerID] || "BE"}
                        className="ml-4 p-2 border rounded w-full max-w-xs"
                      >
                        {eligibleSlots[player.playerID]?.map((slot: string) => {
                          const slotCount = players.filter((p) => playerSlots[p.playerID] === slot).length;
                          const isDisabled = slotCount >= slotLimits[slot];

                          return (
                            <option key={slot} value={slot} disabled={isDisabled}>
                              {slot}
                            </option>
                          );
                        })}
                      </select>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No players assigned to this slot.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TeamPage;
