"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UpcomingGamesHeader from "./additionalHeader";

const Home: React.FC = () => {
  const router = useRouter();
  const [userStats, setUserStats] = useState({ wins: 0, losses: 0, draws: 0 });
  const [recentTrades, setRecentTrades] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const user = { name: "The Frank" };

  const handleLogin = () => {
    setIsLoggedIn(true);
    router.push("/login");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    console.log("Logged out");
    router.push("/");
  };

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await fetch("/api/user/stats");
        if (!response.ok) throw new Error("Failed to fetch stats");
        const data = await response.json();
        setUserStats(data);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    const fetchRecentTrades = async () => {
      try {
        const response = await fetch("/api/recent-trades");
        if (!response.ok) throw new Error("Failed to fetch trades");
        const data = await response.json();
        setRecentTrades(data);
      } catch (error) {
        console.error("Error fetching recent trades:", error);
      }
    };

    if (isLoggedIn) {
      fetchUserStats();
      fetchRecentTrades();
    }
  }, [isLoggedIn]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-[#0077b6] to-[#90e0ef]">
      <div className="flex flex-1">
        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-[#caf0f8]">
          <main className="flex-1 p-10 overflow-y-auto">
            {/* Upcoming Games Section */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold mb-4">Important Games</h2>
              <UpcomingGamesHeader />
            </section>
  
            {/* Recent Activity Section */}
            {isLoggedIn && (
              <section className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
                <div className="bg-white p-4 rounded shadow">
                  <h3 className="font-semibold">Your Stats</h3>
                  <p>Wins: {userStats.wins}</p>
                  <p>Losses: {userStats.losses}</p>
                  <p>Draws: {userStats.draws}</p>
                  <h3 className="font-semibold mt-4">Recent Trades</h3>
                  <ul>
                    {recentTrades.map((trade, index) => (
                      <li key={index}>
                        <p>{trade.date}</p>
                        <p>{trade.description}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}
          </main>
  
          {/* Footer */}
          <footer className="bg-[#03045e] text-white p-4 text-center">
            <p>© 2024 Playoff Pulse. All rights reserved.</p>
            <Link href="/privacy-policy" passHref>
              <span className="underline cursor-pointer">Privacy Policy</span>
            </Link>
            <span> | </span>
            <Link href="/terms-of-service" passHref>
              <span className="underline cursor-pointer">Terms of Service</span>
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
  
  
  
};

export default Home;