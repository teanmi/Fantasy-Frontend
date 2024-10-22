"use client"; // Ensure the component runs on the client side

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaUsers, FaCalendarAlt } from "react-icons/fa"; // Import icons

interface Draft {
  id: number;
  title: string;
  date: string;
  participants: number;
}

const MockDrafts: React.FC = () => {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const fetchDrafts = async () => {
    setLoading(true);
    try {
      const simulatedDrafts: Draft[] = [
        { id: 1, title: "2024 Fantasy Football Mock Draft", date: "2024-10-01", participants: 10 },
        { id: 2, title: "Week 1 Mock Draft", date: "2024-09-15", participants: 8 },
      ];
      setDrafts(simulatedDrafts);
    } catch (error) {
      console.error("Error fetching drafts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  const handleJoinDraft = (id: number) => {
    router.push(`/drafts/${id}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-700 via-white to-red-600"> {/* Gradient background */}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-deep-blue">Mock Drafts</h1>

        {loading ? (
          <p className="text-center text-gray-600">Loading drafts...</p>
        ) : drafts.length > 0 ? (
          <div className="space-y-4">
            {drafts.map((draft) => (
              <div
                key={draft.id}
                className="bg-gray-50 border border-gray-300 rounded-lg p-4 transition-transform transform hover:scale-105"
              >
                <h2 className="text-xl font-semibold text-deep-blue">{draft.title}</h2>
                <div className="flex items-center justify-between mt-2 text-gray-600">
                  <span className="flex items-center">
                    <FaCalendarAlt className="mr-1" />
                    {draft.date}
                  </span>
                  <span className="flex items-center">
                    <FaUsers className="mr-1" />
                    {draft.participants} Participants
                  </span>
                </div>
                <button
                  onClick={() => handleJoinDraft(draft.id)}
                  className="mt-4 bg-deep-blue text-white font-bold py-2 px-4 rounded-lg transition duration-200 hover:bg-bright-red"
                >
                  Join Draft
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No mock drafts available.</p>
        )}

        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-gray-300 text-deep-blue font-bold py-2 px-6 rounded-lg shadow-md transition duration-200 hover:bg-light-gray"
          aria-label="Go to Home"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default MockDrafts;
