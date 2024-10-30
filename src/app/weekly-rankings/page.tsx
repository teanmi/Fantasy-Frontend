"use client";

import React, { useEffect, useState } from 'react';

interface Player {
  name: string;
  team: string;
  position: string;
  points: number;
  // Add any other details you'd like to show
}

const WeeklyRankings: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRankings = async () => {
    try {
      const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard');
      if (!response.ok) {
        throw new Error(`Failed to fetch rankings: ${response.statusText}`);
      }
      const data = await response.json();
      console.log('API Response:', data); // Log the entire API response

      if (!data.events) {
        throw new Error('No events found in the API response');
      }

      // Log the structure of the first event to understand the data
      console.log('First Event:', data.events[0]);

      // Assuming the API provides player rankings in a specific structure
      const playerRankings = data.events.flatMap((event: any) =>
        event.competitions.flatMap((competition: any) =>
          competition.competitors.flatMap((competitor: any) => {
            console.log('Competitor:', competitor); // Log each competitor to understand the structure
            return (competitor.athletes || []).map((athlete: any) => ({
              name: athlete.displayName,
              team: competitor.team.shortDisplayName,
              position: athlete.position,
              points: athlete.stats.points,
            }));
          })
        )
      );

      console.log('Player Rankings:', playerRankings); // Log the mapped player rankings

      setPlayers(playerRankings);
    } catch (error) {
      console.error("Error fetching rankings:", error);
      setError(`Failed to load weekly rankings: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  console.log(players, "This is avry!");

  useEffect(() => {
    fetchRankings();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl font-extrabold text-[#03045e] mb-4">Weekly Rankings</h1>
      <p className="text-gray-700 text-lg">Here are the weekly rankings for all players.</p>
      <div className="mt-6">
        {players.length > 0 ? (
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2">Player</th>
                <th className="py-2">Team</th>
                <th className="py-2">Position</th>
                <th className="py-2">Points</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2">{player.name}</td>
                  <td className="py-2">{player.team}</td>
                  <td className="py-2">{player.position}</td>
                  <td className="py-2">{player.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No player rankings available</p>
        )}
      </div>
    </div>
  );
};

export default WeeklyRankings;