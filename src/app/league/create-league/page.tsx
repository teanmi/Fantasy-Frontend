"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

const CreateLeague: React.FC = () => {
  const [leagueName, setLeagueName] = useState<string>("");
  const [numTeams, setNumTeams] = useState<number>(8); // Default to 8 teams
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Error state
  const [showModal, setShowModal] = useState<boolean>(false);
  const [leagueID, setLeagueId] = useState<number | null>(null);
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect if user is not logged in
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to sign-in page
    }
  }, [status, router]);

  const linkUserToLeague = async (leagueID: number) => {
    try {
      const response = await fetch("http://localhost:3000/api/league/user-link", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leagueID,
          userID: session?.user?.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to link user to league.");
      }
    } catch (err: any) {
      console.error("Error linking user to league:", err.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true while submitting
    setError(null); // Reset error state
    try {
      const response = await fetch("http://localhost:3000/api/league/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leagueName,
          numTeams,
        }),
      });

      if (response.ok) {
        const { leagueID } = await response.json();
        setLeagueId(leagueID);
        setShowModal(true);

        // Link the user to the created league
        await linkUserToLeague(leagueID);

        setLeagueName(""); // Reset form fields
        setNumTeams(8); // Reset to default number of teams
      } else {
        throw new Error("Failed to create league.");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again."); // Handle errors
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-700 via-white to-red-600">
      {showModal && leagueID && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-75">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-bold mb-4 text-white">
              League Created!
            </h2>
            <p className="mb-4 text-gray-300">
              Your league has been created successfully. Copy the link below or
              click the button to create your team.
            </p>
            <div className="mb-4 p-2 bg-gray-900 border border-gray-700 rounded">
              <input
                type="text"
                value={`${window.location.origin}/league/${leagueID}/join-team`}
                readOnly
                className="w-full bg-transparent border-none text-gray-300 outline-none"
              />
            </div>
            <Link
              href={`/league/${leagueID}/join-team`}
              passHref
              className="block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded w-full transition-all duration-300"
            >
              Create Your Team
            </Link>
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 text-gray-400 underline hover:text-white transition-all duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-center text-deep-blue">
          Create a League
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label
              className="font-semibold text-lg text-deep-blue"
              htmlFor="leagueName"
            >
              League Name
            </label>
            <input
              type="text"
              id="leagueName"
              placeholder="Enter League Name"
              value={leagueName}
              onChange={(e) => setLeagueName(e.target.value)}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-blue"
              required
            />
          </div>
          <div className="flex flex-col">
            <label
              className="font-semibold text-lg text-deep-blue"
              htmlFor="numTeams"
            >
              Number of Teams
            </label>
            <select
              id="numTeams"
              value={numTeams}
              onChange={(e) => setNumTeams(parseInt(e.target.value))}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-blue"
              required
            >
              <option value={4}>4 Teams</option>
              <option value={8}>8 Teams</option>
              <option value={12}>12 Teams</option>
              <option value={16}>16 Teams</option>
            </select>
          </div>
          <button
            type="submit"
            className={`mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg shadow-md transition-all duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Creating League..." : "Create League"}
          </button>
        </form>
        <button
          onClick={() => router.push("/")}
          className="mt-4 bg-gray-300 text-deep-blue font-bold py-3 px-8 rounded-lg shadow-md hover:bg-light-gray"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default CreateLeague;
