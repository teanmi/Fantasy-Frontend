"use client"; // Ensure the component runs on the client side

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Pick {
  team: string;
  player: string;
  week: number;
}

const Picks: React.FC = () => {
  const [picks, setPicks] = useState<Pick[]>([]);
  const router = useRouter();

  // Simulated fetch function to get picks (replace with your actual API call)
  const fetchPicks = async () => {
    // Here you can fetch picks data from your API or database
    const simulatedPicks: Pick[] = [
      { team: "Team A", player: "Player 1", week: 1 },
      { team: "Team B", player: "Player 2", week: 2 },
      // Add more picks as needed
    ];
    setPicks(simulatedPicks);
  };

  useEffect(() => {
    fetchPicks(); // Fetch picks when the component mounts
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center create-league-background">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-center text-deep-blue">Your Picks</h1>

        {picks.length > 0 ? (
          <ul className="space-y-4">
            {picks.map((pick, index) => (
              <li key={index} className="flex justify-between border-b py-2">
                <span className="text-lg text-deep-blue">{pick.team}</span>
                <span className="text-lg text-gray-600">{pick.player}</span>
                <span className="text-lg text-gray-400">Week {pick.week}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No picks available.</p>
        )}

        {/* Home Button */}
        <button
          onClick={() => router.push("/")} // Redirect to the homepage
          className="mt-4 bg-gray-300 text-deep-blue font-bold py-2 px-6 rounded-lg shadow-md hover:bg-light-gray"
          aria-label="Go to Home"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default Picks;
