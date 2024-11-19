import React, { useEffect, useState } from 'react';

interface Game {
  homeTeam: string;
  awayTeam: string;
  gameTime: string;
  // Add any other details you'd like to show
}

const UpcomingGamesHeader: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGames = async () => {
    try {
      const response = await fetch('https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard');
      if (!response.ok) {
        throw new Error('Failed to fetch games');
      }
      const data = await response.json();
      console.log('API Response:', data); // Log the entire API response

      if (!data.events) {
        throw new Error('No events found in the API response');
      }

      const upcomingGames = data.events.map((event: any) => ({
        homeTeam: event.competitions[0].competitors.find((team: any) => team.homeAway === 'home').team.shortDisplayName,
        awayTeam: event.competitions[0].competitors.find((team: any) => team.homeAway === 'away').team.shortDisplayName,
        gameTime: event.date,
      }));

      console.log('Upcoming Games:', upcomingGames); // Log the mapped games

      // Filter games within the next week
      const currentDate = new Date();
      const oneWeekFromNow = new Date();
      oneWeekFromNow.setDate(currentDate.getDate() + 7);
      const futureGames = upcomingGames.filter((game: Game) => {
        const gameDate = new Date(game.gameTime);
        console.log('Game Date:', gameDate, 'Current Date:', currentDate, 'One Week From Now:', oneWeekFromNow); // Log the dates
        return gameDate > currentDate && gameDate <= oneWeekFromNow;
      });

      console.log('Filtered Future Games:', futureGames); // Log the filtered games

      setGames(futureGames);
    } catch (error) {
      console.error("Error fetching games:", error);
      setError("Failed to load upcoming games");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames();
    const interval = setInterval(fetchGames, 86400000); // Fetch data once a day

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <header className="bg-white shadow p-4 rounded mb-4">
      <div className="flex space-x-6 overflow-x-auto">
        {games.length > 0 ? (
          games.map((game, index) => (
            <div
              key={index}
              className="bg-[#caf0f8] p-4 rounded shadow flex-shrink-0"
              style={{ minWidth: '200px' }}
            >
              <p className="text-lg font-semibold text-gray-800">{game.awayTeam} vs {game.homeTeam}</p>
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