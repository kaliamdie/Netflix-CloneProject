import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import SignOut from '../pages/SignOut';
import { API_KEY, requests } from '../utils/api';
import SearchResult from './SearchResult';

export default function Navbar({ scrolled }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchQuery) {
   
      const base_url = 'https://api.themoviedb.org/3'; 
      const searchUrl = `${base_url}/search/movie?api_key=${API_KEY}&query=${searchQuery}`;
      
      fetch(searchUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setSearchResults(data.results);
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        })
      
    } else {
     
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <div className='text-black'>
      <nav
        className={`fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 ${
          scrolled ? 'bg-black' : 'bg-gray-900'
        }`}
      >
        <div className=''>
          <img src={logo} alt="" className="w-28  object-contain" />
        </div>
        <div className='flex items-center'>
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
            </div>
          </div>
          <SignOut />
        </div>
      </nav>
      {/* Display search results */}
      {searchResults.length > 0 && (
        <div className="mt-4">
          {searchResults.map((result) => (
          <SearchResult
          key={result.id}
          title={result.title}
          posterPath={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
          movieId={result.id} 
        />
        
          ))}
        </div>
      )}
    </div>
  );
}
