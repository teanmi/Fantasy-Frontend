"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

const handleLogout = async () => {
  await signOut({ callbackUrl: "http://localhost:3001" });
};

function AuthButton() {
  const { data: session } = useSession();
  
  if (session) {
    return (
      <button
        onClick={() => handleLogout()}
        className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 w-full h-16 text-center cursor-pointer flex items-center justify-center"
      >
        Sign out
      </button>
    );
  }
  return (
    <Link href="/login">
      <div className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 w-full h-16 mb-4 text-center cursor-pointer flex items-center justify-center">
        Sign in
      </div>
    </Link>
  );
}

export default function NavBar() {
  return (
    <nav className="w-full bg-[#03045e] text-white p-4 shadow-lg flex flex-wrap justify-around">
      <h2 className="text-xl font-bold mb-4 text-center w-full">Menu</h2>
      <AuthButton />
      <div className="flex space-x-4">
        <Link href="/league/join-league" passHref>
          <div className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 text-center cursor-pointer flex items-center justify-center">
            Join League
          </div>
        </Link>
        <Link href="/league/create-league" passHref>
          <div className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 text-center cursor-pointer flex items-center justify-center">
            Create League
          </div>
        </Link>
        <Link href="/picks" passHref>
          <div className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 text-center cursor-pointer flex items-center justify-center">
            Picks
          </div>
        </Link>
        <Link href="/mock-drafts" passHref>
          <div className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 text-center cursor-pointer flex items-center justify-center">
            Mock Drafts
          </div>
        </Link>
        <Link href="/blog" passHref>
          <div className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 text-center cursor-pointer flex items-center justify-center">
            Blog
          </div>
        </Link>
        <Link href="/support" passHref>
          <div className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 text-center cursor-pointer flex items-center justify-center">
            Support
          </div>
        </Link>
        <Link href="/weekly-rankings" passHref>
          <div className="bg-[#0077b6] hover:bg-[#00b4d8] text-white font-bold py-3 px-6 rounded transition-transform transform hover:scale-105 text-center cursor-pointer flex items-center justify-center">
            Weekly Rankings
          </div>
        </Link>
      </div>
    </nav>
  );
}
