"use client"; // Ensure the component runs on the client side

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const router = useRouter();

  // Simulated fetch function to get blog posts (replace with your actual API call)
  const fetchBlogPosts = async () => {
    // Here you can fetch blog data from your API or database
    const simulatedPosts: BlogPost[] = [
      {
        id: 1,
        title: "Top 10 Fantasy Football Tips for 2024",
        excerpt: "Get ready for the upcoming season with these essential tips...",
        date: "2024-10-15",
      },
      {
        id: 2,
        title: "Understanding Player Stats and Projections",
        excerpt: "Learn how to analyze player performance for better drafting...",
        date: "2024-10-01",
      },
      // Add more posts as needed
    ];
    setPosts(simulatedPosts);
  };

  useEffect(() => {
    fetchBlogPosts(); // Fetch blog posts when the component mounts
  }, []);

  const handleReadMore = (id: number) => {
    // Navigate to the blog post details page (implement your routing logic)
    router.push(`/blog/${id}`); // Replace with your actual route for the blog post details
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 via-white to-red-600"> {/* Updated gradient background */}
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold mb-4 text-center text-deep-blue">Blog</h1>

        {posts.length > 0 ? (
          <ul className="space-y-4">
            {posts.map((post) => (
              <li key={post.id} className="border-b py-4">
                <h2 className="text-lg text-deep-blue font-bold">{post.title}</h2>
                <p className="text-gray-600">{post.excerpt}</p>
                <span className="text-gray-400 text-sm">{post.date}</span>
                <button
                  onClick={() => handleReadMore(post.id)}
                  className="mt-2 bg-deep-blue text-white font-bold py-1 px-4 rounded-md hover:bg-bright-red"
                >
                  Read More
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No blog posts available.</p>
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

export default Blog;
