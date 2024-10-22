"use client";

import { useRouter } from "next/navigation";
import React from "react";

const Home: React.FC = () => {
  const router = useRouter();

  const handleJoinLeague = () => {
    router.push("/join-league");
  };

  const handleCreateLeague = () => {
    router.push("/create-league");
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

  return (
    <div className="flex h-screen">
      {/* Sidebar Column */}
      <aside className="w-1/4 bg-gray-800 text-white p-6">
        <button
          onClick={handleJoinLeague}
          className="bg-deep-blue hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 w-full h-16 mb-4" // Fixed height and margin
          aria-label="Join League"
        >
          Join League
        </button>
        <button
          onClick={handleCreateLeague}
          className="bg-deep-blue hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 w-full h-16 mb-4" // Fixed height and margin
          aria-label="Create League"
        >
          Create League
        </button>
        <button
          onClick={handlePicks}
          className="bg-deep-blue hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 w-full h-16 mb-4" // Fixed height and margin
          aria-label="Picks"
        >
          Picks
        </button>
        <button
          onClick={handleMockDrafts}
          className="bg-deep-blue hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 w-full h-16 mb-4" // Fixed height and margin
          aria-label="Mock Drafts"
        >
          Mock Drafts
        </button>
        <button
          onClick={handleBlog}
          className="bg-deep-blue hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 w-full h-16 mb-4" // Fixed height and margin
          aria-label="Blog"
        >
          Blog
        </button>
        <button
          onClick={handleSupport}
          className="bg-deep-blue hover:bg-blue-700 text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 w-full h-16" // Fixed height; no margin on last button
          aria-label="Support"
        >
          Support
        </button>
      </aside>

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col bg-gray-100">
        {/* Header Row */}
        <header className="bg-white shadow p-6 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Playoff Pulse
          </h1>
          <p className="text-gray-600">
            Manage your leagues, create teams, and track stats all in one place!
          </p>
        </header>

        {/* Body Content */}
        <main className="flex-1 p-10">
          {/* You can add more content here */}
          <div className="text-gray-700 text-lg">
            {/* Placeholder for body content */}
            <p>Display your league stats, create teams, or show other info</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
