"use client";

import React, { useState, useEffect } from "react";

export function DebugBlogData() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        console.log("Debug: Fetching from URL:", `${API_BASE}/api/v1/content/posts/?page=1&limit=12`);
        
        const response = await fetch(`${API_BASE}/api/v1/content/posts/?page=1&limit=12`);
        console.log("Debug: Response status:", response.status);
        console.log("Debug: Response ok:", response.ok);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Debug: Data received:", data);
        setData(data);
        setLoading(false);
      } catch (error) {
        console.error("Debug: Error fetching data:", error);
        setError(error instanceof Error ? error.message : 'Unknown error');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h2 className="text-lg font-bold mb-2">Debug Blog Data</h2>
      {error && <p className="text-red-500">Error: {error}</p>}
      {data ? (
        <div>
          <p className="text-sm text-gray-600 mb-2">Total posts: {data.count}</p>
          <p className="text-sm text-gray-600 mb-2">Results length: {data.results?.length || 0}</p>
          {data.results && data.results.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold">First post:</h3>
              <pre className="text-xs bg-white p-2 rounded overflow-auto max-h-40">
                {JSON.stringify(data.results[0], null, 2)}
              </pre>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
}