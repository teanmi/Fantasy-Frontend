import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import axios from 'axios';

interface Game {
  homeTeam: string;
  homeTeamAbbreviation: string;
  awayTeam: string;
  awayTeamAbbreviation: string;
  gameTime: string;
}

const UpcomingGamesHeader: React.FC = () => {
  const { data: session } = useSession();
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = async () => {
    try {
      setLoading(true);
  
      // Fetch games from ESPN API
      const { data: espnData } = await axios.get('https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard');
      
      const upcomingGames = espnData.events.map((event: any) => ({
        homeTeam: event.competitions[0].competitors.find((team: any) => team.homeAway === 'home').team.shortDisplayName,
        homeTeamAbbreviation: event.competitions[0].competitors.find((team: any) => team.homeAway === 'home').team.abbreviation,
        awayTeam: event.competitions[0].competitors.find((team: any) => team.homeAway === 'away').team.shortDisplayName,
        awayTeamAbbreviation: event.competitions[0].competitors.find((team: any) => team.homeAway === 'away').team.abbreviation,
        gameTime: event.date,
      }));
  
      // Fetch user player teams from the backend using axios
      const { data: userPlayersData } = await axios.get(
        `http://localhost:3000/api/pro-teams/${session?.user?.id}`
      );
  
      // Extract team abbreviations safely
      const userPlayerTeams: string[] = Array.isArray(userPlayersData)
        ? userPlayersData
        : userPlayersData?.data || [];
  
      // Filter games
      const filteredGames = upcomingGames.filter(
        (game: Game) =>
          userPlayerTeams.includes(game.homeTeamAbbreviation) ||
          userPlayerTeams.includes(game.awayTeamAbbreviation)
      );
  
      setGames(filteredGames);
    } catch (error) {
      console.error('Error fetching games:', error);
      setError('Failed to load upcoming games');
    } finally {
      setLoading(false);
    }
  };
  


  useEffect(() => {
    if (session?.user?.id) {
      fetchGames();
    }
    const interval = setInterval(fetchGames, 86400000); // Fetch data once a day

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [session?.user?.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <header className="bg-white shadow p-4 rounded mb-4">
      <div className="flex flex-wrap gap-4 justify-start">
        {games.length > 0 ? (
          games.map((game, index) => (
            <div
              key={index}
              className="bg-[#caf0f8] p-4 rounded shadow"
              style={{
                width: '300px',
                flex: '0 0 auto',
              }}
            >
              <p className="text-lg font-semibold text-gray-800">
                {game.awayTeam} vs {game.homeTeam}
              </p>
              <p className="text-gray-600">{new Date(game.gameTime).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No upcoming games</p>
        )}
      </div>
    </header>
  );
};

export default UpcomingGamesHeader;
