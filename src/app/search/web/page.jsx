import WebSearchResults from '@/components/WebSearchResults';
import Link from 'next/link';

export default async function WebSearchPage({ searchParams }) {
  // Ensure searchParams is awaited before using its properties
  const params = await searchParams;
  const startIndex = params?.start?.toString() || '1';

  await new Promise((resolve) => setTimeout(resolve, 1000));

  const response = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.CONTEXT_KEY}&q=${params?.searchTerm}&start=${startIndex}`
  );

  if (!response.ok) throw new Error('Something went wrong');
  const data = await response.json();
  const results = data.items;

  if (!results) {
    return (
      <div className="flex flex-col justify-center items-center pt-10">
        <h1 className="text-3xl mb-4">
          No results found for {params?.searchTerm}
        </h1>
        <p className="text-lg">
          Try searching the web or images for something else{' '}
          <Link href="/" className="text-blue-500">
            Home
          </Link>
        </p>
      </div>
    );
  }

  return <div>{results && <WebSearchResults results={data} />}</div>;
}
