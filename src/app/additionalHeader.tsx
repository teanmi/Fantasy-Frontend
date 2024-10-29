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
    <header style={{ backgroundColor: '#0077b6', padding: '10px', color: '#fff' }}>
      <h2>Upcoming Football Games</h2>
      <div style={{ display: 'flex', overflowX: 'scroll' }}>
        {games.length > 0 ? (
          games.map((game, index) => (
            <div key={index} style={{ margin: '0 15px' }}>
              <p>{game.awayTeam} vs {game.homeTeam}</p>
              <p>{new Date(game.gameTime).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No upcoming games</p>
        )}
      </div>
    </header>
  );
};

export default UpcomingGamesHeader;