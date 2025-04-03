export const dynamic = "force-dynamic"; // Ensure SSR and avoid Suspense issues

import ImageSearchResults from "@/components/ImageSearchResults";
import Link from "next/link";

export default async function ImageSearchPage({ searchParams }) {
  const searchTerm = searchParams?.searchTerm || "";
  const startIndex = searchParams?.start || "1";

  if (!searchTerm) {
    return (
      <div className="flex flex-col justify-center items-center pt-10">
        <h1 className="text-3xl mb-4">No search term provided</h1>
        <p className="text-lg">
          Try searching again or go{" "}
          <Link href="/" className="text-blue-500">Home</Link>
        </p>
      </div>
    );
  }

  // Fetch images from Google API
  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.CONTEXT_KEY}&q=${searchTerm}&searchType=image&start=${startIndex}`
  );

  if (!response.ok) throw new Error("Something went wrong");

  const data = await response.json();
  const results = data.items;

  if (!results) {
    return (
      <div className="flex flex-col justify-center items-center pt-10">
        <h1 className="text-3xl mb-4">No results found for "{searchTerm}"</h1>
        <p className="text-lg">
          Try searching again or go{" "}
          <Link href="/" className="text-blue-500">Home</Link>
        </p>
      </div>
    );
  }

  return <ImageSearchResults results={results} />;
}
