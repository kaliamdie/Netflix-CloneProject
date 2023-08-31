import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { requests } from '../utils/api';

export default function Poster() {
  const [movie, setMovie] = useState(null);

  async function fetchData() {
    const request = await axios.get(requests.fetchNetflixOriginals);
    const randomMovieIndex = Math.floor(Math.random() * request.data.results.length);
    const randomMovie = request.data.results[randomMovieIndex];
    console.log(randomMovie);
    setMovie(randomMovie);
    return request;
  }

  useEffect(() => {
    fetchData();
  }, []);
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "...";
    }
    return text;
  }
  
  return (
    <header
      className="text-white relative bg-contain h-96 "
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
 
    }}
    >
      {movie && (
        <div className="absolute bottom-0 left-0 p-10">
          <h1 className="mb-4 text-5xl font-bold max-w-md">
            {movie.name || movie.title || movie.original_name}
          </h1>
          <div className="flex items-center space-x- cursor-pointer">
            <button className="bg-red-600 text-white px-4 py-2 rounded">
              Play
            </button>
            <button className="bg-gray-800 text-white px-4 py-2 rounded">
              My List
            </button>
          </div>
          <div className="mt-4 shadow-md" 
          style={{width:"45rem",lineHeight:"1.3",paddingTop:"1rem",fontSize:"0.9rem",maxWidth:"360px"}}>
            <p className="text-gray-300 leading-relaxed">
              {truncateText(movie.overview, 200)}
            </p>
          </div>
        </div>
      )}
    
    </header>
  );
  
    }  