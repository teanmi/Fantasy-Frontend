"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleJoinLeague = () => {
    // Navigate to Join League page (you need to create this page later)
    router.push("/join-league");
  };

  const handleCreateLeague = () => {
    // Navigate to Create League page (you need to create this page later)
    router.push("/create-league");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to the League App</h1>
      <div className="flex gap-4">
        <button
          onClick={handleJoinLeague}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Join League
        </button>
        <a href='/create-league/'>
          <button
            onClick={handleCreateLeague}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Create League
          </button>
        </a>
      </div>
    </div>
  );
}
