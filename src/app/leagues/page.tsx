"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const LeaguesPage = () => {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { data: session, status } = useSession();
  const userID = session?.user?.id;

  useEffect(() => {
    const fetchLeagues = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/user/${userID}/leagues`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch leagues.");
        }

        const data = await response.json();
        setLeagues(data.leagues);
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    if (userID) {
      fetchLeagues();
    }
  }, [userID]);

  if (loading) return <p>Loading leagues...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6">Your Leagues</h1>
  
      {leagues.length > 0 ? (
        <ul className="list-disc space-y-4">
          {leagues.map((league) => (
            <li key={league.leagueID} className="text-lg">
              <a
                href={`/league/${league.leagueID}`}
                onClick={(e) => {
                  e.preventDefault();
                  router.push(`/league/${league.leagueID}/home`);
                }}
                className="text-blue-500 hover:underline"
              >
                {league.name} ({league.current_team_count}/{league.team_count} teams)
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg text-gray-600 mt-4">
          You are not part of any leagues yet.
        </p>
      )}
    </div>
  );
  
};

export default LeaguesPage;
