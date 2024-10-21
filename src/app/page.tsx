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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <div className="bg-white shadow-lg rounded-lg p-10 text-center max-w-md w-full">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
          Playoff Pulse
        </h1>
        <p className="text-gray-600 mb-8">
          Manage your leagues, track stats, and organize your fantasy football experience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleJoinLeague}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded transition-colors duration-200"
          >
            Join League
          </button>
          <button
            onClick={handleCreateLeague}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded transition-colors duration-200"
          >
            Create League
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
