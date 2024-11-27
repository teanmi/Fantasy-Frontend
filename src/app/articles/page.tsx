"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Image {
  name: string;
  caption: string;
  alt: string;
  credit: string;
  url: string;
  height: number;
  width: number;
}

interface Article {
  _id: string;
  headline: string;
  description: string;
  published: string;
  images: Image[];
}

const Articles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchArticles = async (page: number) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/get-articles?page=${page}`);
      const newArticles = response.data.articles;
      
      setArticles((prevArticles) => {
        const newArticlesSet = new Set(prevArticles.map(article => article._id));
        const filteredArticles = [
          ...prevArticles,
          ...newArticles.filter((article: Article) => !newArticlesSet.has(article._id))
        ];
        return filteredArticles;
      });

      if (newArticles.length < 10) {
        setHasMore(false);
      }
    } catch (err) {
      setError('Error fetching articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(page);
  }, [page]);

  const handleLoadMore = () => {
    setLoading(true);
    setPage((prevPage) => prevPage + 1);
  };

  if (loading && page === 1) return <div className="text-center py-10 text-lg">Loading...</div>;
  if (error) return <div className="text-center py-10 text-lg text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-semibold text-center mb-6">NFL News Articles</h1>
      {articles.length === 0 ? (
        <p className="text-center text-lg">No articles found</p>
      ) : (
        <div>
          {articles.map((article) => (
            <div key={article._id} className="bg-white p-4 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-semibold mb-2">{article.headline}</h2>
              <p className="text-gray-600 mb-4">{article.description}</p>
              <p className="text-sm text-gray-500">Published on: {new Date(article.published).toLocaleDateString()}</p>
              {article.images.length > 0 && (
                <div className="mt-4">
                  <img
                    src={article.images[0].url}
                    alt={article.headline}
                    className="w-full h-auto rounded-md"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {hasMore && (
        <div className="text-center mt-6">
          <button
            onClick={handleLoadMore}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {loading ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Articles;

