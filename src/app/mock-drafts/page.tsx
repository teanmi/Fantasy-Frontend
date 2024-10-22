"use client"; // Ensure the component runs on the client side

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Draft {
  id: number;
  title: string;
  date: string;
  participants: number;
}

const MockDrafts: React.FC = () => {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const router = useRouter();

  // Simulated fetch function to get drafts (replace with your actual API call)
  const fetchDrafts = async () => {
    // Here you can fetch draft data from your API or database
    const simulatedDrafts: Draft[] = [
      { id: 1, title: "2024 Fantasy Football Mock Draft", date: "2024-10-01", participants: 10 },
      { id: 2, title: "Week 1 Mock Draft", date: "2024-09-15", participants: 8 },
      // Add more drafts as needed
    ];
    setDrafts(simulatedDrafts);
  };

  useEffect(() => {
    fetchDrafts(); // Fetch drafts when the component mounts
  }, []);

  const handleJoinDraft = (id: number) => {
    // Navigate to the draft details or join page (you can implement your routing logic)
    router.push(`/drafts/${id}`); // Replace with your actual route for the draft details
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center create-league-background">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-center text-deep-blue">Mock Drafts</h1>

        {drafts.length > 0 ? (
          <ul className="space-y-4">
            {drafts.map((draft) => (
              <li key={draft.id} className="flex justify-between border-b py-2">
                <span className="text-lg text-deep-blue">{draft.title}</span>
                <span className="text-lg text-gray-600">{draft.date}</span>
                <span className="text-lg text-gray-400">{draft.participants} Participants</span>
                <button
                  onClick={() => handleJoinDraft(draft.id)}
                  className="bg-deep-blue text-white font-bold py-1 px-4 rounded-md hover:bg-bright-red"
                >
                  Join
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No mock drafts available.</p>
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

export default MockDrafts;
