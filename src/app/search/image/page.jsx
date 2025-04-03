"use client"; // Ensure this runs on the client side

import ImageSearchResults from "@/components/ImageSearchResults";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function ImageSearchPage() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm");
  const startIndex = searchParams.get("start") || "1";
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_API_KEY}&cx=${process.env.NEXT_PUBLIC_CONTEXT_KEY}&q=${searchTerm}&searchType=image&start=${startIndex}`
        );

        if (!response.ok) throw new Error("Something went wrong");
        const data = await response.json();
        setResults(data.items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [searchTerm, startIndex]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : results ? (
          <ImageSearchResults results={results} />
        ) : (
          <div className="flex flex-col justify-center items-center pt-10">
            <h1 className="text-3xl mb-4">
              No results found for {searchTerm}
            </h1>
            <p className="text-lg">
              Try searching for something else{" "}
              <Link href="/" className="text-blue-500">
                Home
              </Link>
            </p>
          </div>
        )}
      </div>
    </Suspense>
  );
}
