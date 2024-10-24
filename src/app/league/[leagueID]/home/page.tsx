// src/app/leagues/[leagueID]/page.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

const LeagueHomePage = ({ params }: { params: { leagueID: string } }) => {
  const leagueID = params.leagueID;
  const [teams, setTeams] = useState<any[]>([]);
  const [leagueName, setLeagueName] = useState<string>("");
  const [teamCount, setTeamCount] = useState<number>(0); // max number of teams
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Function to fetch both the league details and the teams
    const fetchLeagueData = async () => {
      try {
        // Fetch league details by ID to get the league name and max team count
        const leagueResponse = await fetch(
          `http://localhost:3000/api/league/${params.leagueID}`
        );
        const leagueData = await leagueResponse.json();

        if (!leagueResponse.ok) {
          throw new Error(
            leagueData.message || "Failed to fetch league details"
          );
        }

        setLeagueName(leagueData.league.name); // Assuming "Name" is the league's name field
        setTeamCount(leagueData.league.team_count); // Assuming "team_count" is the max number of teams

        // Fetch teams associated with the leagueID
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

    fetchLeagueData();
  }, [params.leagueID]);

  if (loading) {
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
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No teams found for this league.</p>
      )}

      {/* Link to the search page */}
      <div className="mt-8">
        <Link
          href={`/league/${leagueID}/search`}
          className="text-blue-500 hover:underline"
        >
          Search Players
        </Link>
      </div>
    </div>
  );
};

export default LeagueHomePage;
