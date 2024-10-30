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
      {/* Upcoming Games Header */}
      <UpcomingGamesHeader />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-1/4 bg-[#03045e] text-white p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-center">Menu</h2>
          <Link href="/league/join-league" passHref>
            <div className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 w-full h-16 mb-4 text-center cursor-pointer flex items-center justify-center">
              Join League
            </div>
          </Link>
          <Link href="/league/create-league" passHref>
            <div className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 w-full h-16 mb-4 text-center cursor-pointer flex items-center justify-center">
              Create League
            </div>
          </Link>
          <Link href="/picks" passHref>
            <div className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 w-full h-16 mb-4 text-center cursor-pointer flex items-center justify-center">
              Picks
            </div>
          </Link>
          <Link href="/mock-drafts" passHref>
            <div className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 w-full h-16 mb-4 text-center cursor-pointer flex items-center justify-center">
              Mock Drafts
            </div>
          </Link>
          <Link href="/blog" passHref>
            <div className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 w-full h-16 mb-4 text-center cursor-pointer flex items-center justify-center">
              Blog
            </div>
          </Link>
          <Link href="/support" passHref>
            <div className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 w-full h-16 text-center cursor-pointer flex items-center justify-center">
              Support
            </div>
          </Link>
          <Link href="/weekly-rankings" passHref>
            <div className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 w-full h-16 text-center cursor-pointer flex items-center justify-center">
              Weekly Rankings
            </div>
          </Link>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-[#caf0f8]">
          {/* Header */}
          <header className="relative bg-white shadow-lg p-4 flex items-center rounded-b-lg w-full">
            <div className="absolute top-4 right-4">
              {isLoggedIn ? (
                <div className="flex items-center">
                  <span className="mr-2">{`Welcome, ${user.name}!`}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleLogin}
                  className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
                  aria-label="Login"
                >
                  Login
                </button>
              )}
            </div>
            <div className="flex-1 flex justify-center">
              <div className="text-center">
                <h1 className="text-4xl font-extrabold text-[#03045e] mb-2">Playoff Pulse</h1>
                <p className="text-gray-600 text-md">Manage your leagues, create teams, and track stats all in one place!</p>
              </div>
            </div>
          </header>

          {/* Main Section */}
          <main className="flex-1 p-10 overflow-y-auto">
            <div className="text-gray-700 text-lg">
              <p>Display your league stats, create teams, or show other info</p>
              <p className="mt-4 text-center text-xl font-semibold">Get ready for an exciting season!</p>
            </div>

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