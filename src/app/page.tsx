"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Home: React.FC = () => {
  const router = useRouter();

  const handleJoinLeague = () => {
    router.push("/join-league");
  };

  const handleCreateLeague = () => {
    router.push("/league/create-league");
  };

  const handlePicks = () => {
    router.push("/picks");
  };

  const handleMockDrafts = () => {
    router.push("/mock-drafts");
  };

  const handleBlog = () => {
    router.push("/blog");
  };

  const handleSupport = () => {
    router.push("/support");
  };

  const handleLogin = () => {
    router.push("/login"); // Redirect to login page
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-r from-[#0077b6] to-[#90e0ef]">
      {/* Main Content Container */}
      <div className="flex-1 flex">
        {/* Sidebar Column */}
        <aside className="w-full md:w-1/4 bg-[#03045e] text-white p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-center">Menu</h2>
          <button
            onClick={handleJoinLeague}
            className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 w-full h-16 mb-4"
            aria-label="Join League"
          >
            Join League
          </button>
          <button
            onClick={handleCreateLeague}
            className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 w-full h-16 mb-4"
            aria-label="Create League"
          >
            Create League
          </button>
          <button
            onClick={handlePicks}
            className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 w-full h-16 mb-4"
            aria-label="Picks"
          >
            Picks
          </button>
          <button
            onClick={handleMockDrafts}
            className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 w-full h-16 mb-4"
            aria-label="Mock Drafts"
          >
            Mock Drafts
          </button>
          <button
            onClick={handleBlog}
            className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 w-full h-16 mb-4"
            aria-label="Blog"
          >
            Blog
          </button>
          <button
            onClick={handleSupport}
            className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 w-full h-16"
            aria-label="Support"
          >
            Support
          </button>
        </aside>

        {/* Main Content Column */}
        <div className="flex-1 flex flex-col bg-[#caf0f8]">
          {/* Header Row */}
          <header className="bg-white shadow-lg p-6 flex justify-between items-center rounded-b-lg">
            <div className="text-center">
              <h1 className="text-5xl font-extrabold text-[#03045e] mb-2">
                Playoff Pulse
              </h1>
              <p className="text-gray-600 text-lg">
                Manage your leagues, create teams, and track stats all in one place!
              </p>
            </div>
            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-2 px-4 rounded transition-transform transform hover:scale-105"
              aria-label="Login"
            >
              Login
            </button>
          </header>

          {/* Body Content */}
          <main className="flex-1 p-10">
            <div className="text-gray-700 text-lg">
              <p>Display your league stats, create teams, or show other info</p>
              <p className="mt-4 text-center text-xl font-semibold">
                Get ready for an exciting season!
              </p>
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#03045e] text-white text-center p-4">
        <p>&copy; 2024 Playoff Pulse | All Rights Reserved</p>
        <p>
          Follow us on{" "}
          <a href="#" className="text-[#00b4d8]">
            Twitter
          </a>{" "}
          and{" "}
          <a href="#" className="text-[#00b4d8]">
            Instagram
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
