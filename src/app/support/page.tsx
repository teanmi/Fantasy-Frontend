"use client"; // Ensure the component runs on the client side

import { useState } from "react";
import { useRouter } from "next/navigation";

const Support: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle the support message submission (replace with your actual API call)
    alert(`Message sent from ${email}: ${message}`);
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 via-white to-red-600"> {/* Updated gradient background */}
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-center text-deep-blue">Support</h1>
        <p className="text-gray-600 mb-6 text-center">
          If you have any questions or need assistance, please fill out the form below:
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="font-semibold text-lg text-deep-blue" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-blue"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="font-semibold text-lg text-deep-blue" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-deep-blue"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-deep-blue text-white font-bold py-3 px-8 rounded-lg shadow-md"
            aria-label="Send Message"
          >
            Send Message
          </button>
        </form>

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

export default Support;
