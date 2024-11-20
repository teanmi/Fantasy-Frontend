// src/app/leagues/[leagueID]/page.tsx
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const LeagueHomePage = ({ params }: { params: { leagueID: string } }) => {
  const leagueID = params.leagueID;
  const { data: session, status } = useSession();
  const router = useRouter();

  const [teams, setTeams] = useState<any[]>([]);
  const [leagueName, setLeagueName] = useState<string>("");
  const [teamCount, setTeamCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Redirect if user is not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to sign-in page
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return; // Wait until authentication is confirmed

    const fetchLeagueData = async () => {
      try {
        const leagueResponse = await fetch(
          `http://localhost:3000/api/league/${params.leagueID}`
        );
        const leagueData = await leagueResponse.json();

        if (!leagueResponse.ok) {
          throw new Error(
            leagueData.message || "Failed to fetch league details"
          );
        }

        setLeagueName(leagueData.league.name);
        setTeamCount(leagueData.league.team_count);

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
  }, [params.leagueID, status]);

  if (loading || status === "loading") {
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
