'use client';  // Ensure it's a client component
import { useSearchParams } from 'next/navigation';
import { Suspense, useState, useEffect } from 'react';
import ImageSearchResults from '@/components/ImageSearchResults';
import Link from 'next/link';

function ImageSearchComponent() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('searchTerm');
  const startIndex = searchParams.get('start') || '1';

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch(
          `https://www.googleapis.com/customsearch/v1?key=${process.env.NEXT_PUBLIC_API_KEY}&cx=${process.env.NEXT_PUBLIC_CONTEXT_KEY}&q=${searchTerm}&searchType=image&start=${startIndex}`
        );

        if (!response.ok) throw new Error('Something went wrong');

        const data = await response.json();
        setResults(data.items);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [searchTerm, startIndex]);

  if (loading) {
    return <p className="text-center text-xl">Loading...</p>;
  }

  if (!results) {
    return (
      <div className="flex flex-col justify-center items-center pt-10">
        <h1 className="text-3xl mb-4">No results found for {searchTerm}</h1>
        <p className="text-lg">
          Try searching again or go back to{' '}
          <Link href="/" className="text-blue-500">Home</Link>
        </p>
      </div>
    );
  }

  return <ImageSearchResults results={results} />;
}

export default function ImageSearchPage() {
  return (
    <Suspense fallback={<p className="text-center text-xl">Loading search...</p>}>
      <ImageSearchComponent />
    </Suspense>
  );
}
