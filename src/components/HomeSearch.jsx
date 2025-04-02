'use client'
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import { useRouter } from 'next/navigation';

export default function HomeSearch() {
    const [input, setInput] = useState('');
    const [randomSearchLoading, setRandomSearchLoading] = useState(false); // ✅ Fixed state
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        router.push(`/search/web?searchTerm=${input}`);
    };

    const randomSearch = async (e) => {
        setRandomSearchLoading(true);
        const response = await fetch('https://random-word-api.herokuapp.com/word')
            .then((res) => res.json())
            .then((data) => data[0]);
        if (!response) return;
        router.push(`/search/web?searchTerm=${response}`);
        setRandomSearchLoading(false);
    };

    return (
        <div className="flex flex-col items-center mt-10">
            {/* Search Bar */}
            <form
                onSubmit={handleSubmit}
                className="flex w-full mx-auto max-w-[90%] sm:max-w-xl lg:max-w-2xl border border-gray-300 px-5 py-3 rounded-full
                hover:shadow-xl focus-within:shadow-lg transition-shadow bg-white/20 backdrop-blur-lg"
            >
                <AiOutlineSearch className="text-2xl text-gray-500 mr-3" />
                <input
                    type="text"
                    className="flex-grow bg-transparent outline-none text-lg placeholder-gray-400"
                    placeholder="Search Google..."
                    onChange={(e) => setInput(e.target.value)}
                />
                <BsFillMicFill className="text-xl text-gray-500 cursor-pointer hover:text-blue-500 transition" />
            </form>

            {/* Buttons */}
            <div className="flex flex-col space-y-3 sm:space-y-0 justify-center sm:flex-row mt-8 sm:space-x-4">
                {/* Google Search Button */}
                <button
                    className="relative bg-gradient-to-r from-blue-400 to-purple-500 text-white font-medium px-6 py-2 rounded-md 
                    hover:from-purple-500 hover:to-blue-400 transition-all duration-300 ease-in-out shadow-md w-40 h-12"
                    onClick={handleSubmit}
                >
                    Google Search
                </button>

                {/* Feeling Lucky Button */}
                <button
                    disabled={randomSearchLoading}
                    onClick={randomSearch}
                    className="relative bg-[#f8f9fa] text-gray-800 rounded-md font-medium px-6 py-2 transition-all 
                    hover:ring-gray-200 active:ring-gray-300 hover:shadow-md w-40 h-12 disabled:opacity-50"
                >
                    {randomSearchLoading ? 'Loading...' : 'I am feeling lucky'}
                </button>

            </div>
        </div>
    );
}
