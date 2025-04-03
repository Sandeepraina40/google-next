"use client"; // Ensures this is treated as a Client Component

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import ImageSearchResults from "@/components/ImageSearchResults";
import Link from "next/link";

export default function ImageSearchPage() {
  return (
    <Suspense fallback={<p className="text-center text-gray-500">Loading...</p>}>
      <ImageSearchResultsWrapper />
    </Suspense>
  );
}

function ImageSearchResultsWrapper() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";
  const startIndex = searchParams.get("start") || "1";
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.CONTEXT_KEY}&q=${searchTerm}&searchType=image&start=${startIndex}`
        );

        if (!response.ok) throw new Error("Something went wrong");
        const data = await response.json();
        setResults(data.items);
      } catch (err) {
        setError(err.message);
      }
    }

    fetchData();
  }, [searchTerm, startIndex]);

  if (error) {
    return <p className="text-red-500 text-center">Error: {error}</p>;
  }

  if (!results) {
    return (
      <div className="flex flex-col justify-center items-center pt-10">
        <h1 className="text-3xl mb-4">No results found for {searchTerm}</h1>
        <p className="text-lg">
          Try searching for something else{" "}
          <Link href="/" className="text-blue-500">
            Home
          </Link>
        </p>
      </div>
    );
  }

  return <ImageSearchResults results={results} />;
}
