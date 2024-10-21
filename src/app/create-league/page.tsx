"use client"; // Ensure the component runs on the client side

import { useState } from "react";
import { useRouter } from "next/navigation";

const CreateLeague: React.FC = () => {
  const [leagueName, setLeagueName] = useState<string>("");
  const [numTeams, setNumTeams] = useState<number>(8); // Changed to number type
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/leagues/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        leagueName,
        numTeams, // Sending number of teams instead of leagueType
      }),
    });

    if (response.ok) {
      alert("League created successfully!");
      router.push("/"); // Redirect to the homepage or another page after creating a league
    } else {
      alert("Failed to create league.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Create a New League</h1>
      <form className="flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="font-semibold text-lg" htmlFor="leagueName">
            League Name
          </label>
          <input
            type="text"
            id="leagueName"
            placeholder="Enter League Name"
            value={leagueName}
            onChange={(e) => setLeagueName(e.target.value)}
            className="border p-2 rounded"
            required
          />
        </div>

        <div className="flex flex-col mt-4">
          {" "}
          {/* Add margin-top to create spacing between form fields */}
          <label className="font-semibold text-lg" htmlFor="numTeams">
            Number of Teams
          </label>
          <select
            id="numTeams"
            value={numTeams}
            onChange={(e) => setNumTeams(parseInt(e.target.value))}
            className="border p-2 rounded text-black bg-white"
            required
          >
            <option value={4}>4 Teams</option>
            <option value={8}>8 Teams</option> {/* Default selected */}
            <option value={12}>12 Teams</option>
            <option value={16}>16 Teams</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Create League
        </button>
      </form>
    </div>
  );
};

export default CreateLeague;
