"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
  const router = useRouter();
  const [leagues, setLeagues] = useState([]);
  const user = { name: "John Doe" }; // Replace with actual user state

  const handleLogin = () => {
    router.push("/login"); // Redirect to login page
  };

  const handleLogout = () => {
    // Implement logout functionality here
    console.log("Logged out"); // Placeholder for actual logout functionality
  };

  useEffect(() => {
    const fetchLeagues = async () => {
      const response = await fetch('/api/leagues'); // Replace with your API endpoint
      const data = await response.json();
      setLeagues(data);
    };

    fetchLeagues();
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-r from-[#0077b6] to-[#90e0ef]"> {/* Gradient background */}
      {/* Sidebar Column */}
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
      </aside>

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col bg-[#caf0f8]">
        {/* Header Row */}
        <header className="bg-white shadow-lg p-6 flex justify-between items-center rounded-b-lg">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-[#03045e] mb-2">Playoff Pulse</h1>
            <p className="text-gray-600 text-lg">Manage your leagues, create teams, and track stats all in one place!</p>
          </div>

          {/* User Info / Login Button */}
          {user ? (
            <div className="flex items-center">
              <span className="mr-2">{`Welcome, ${user.name}!`}</span>
              <button onClick={handleLogout} className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105">
                Logout
              </button>
            </div>
          ) : (
            <button onClick={handleLogin} className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105" aria-label="Login">
              Login
            </button>
          )}
        </header>

        {/* Body Content */}
        <main className="flex-1 p-10">
          <div className="text-gray-700 text-lg">
            <p>Display your league stats, create teams, or show other info</p>
            <p className="mt-4 text-center text-xl font-semibold">Get ready for an exciting season!</p>
          </div>

          {/* Recent Activity Section */}
          <section className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold">Last Game Results</h3>
                <p>Team A vs Team B: 24-17</p>
              </div>
              <div className="bg-white p-4 rounded shadow">
                <h3 className="font-semibold">Upcoming Matches</h3>
                <p>Team C vs Team D - Next Monday</p>
              </div>
            </div>
          </section>
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
  );
};

export default Home;
