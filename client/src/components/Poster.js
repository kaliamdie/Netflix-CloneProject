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

  return (
    <header
      className="text-white relative"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: 'center center',
        height: '448px',
      }}
    >
      <div className="ml-30 pt-36 absolute bottom-0 left-0">
        <h1 className="text-5xl font-bold pb-1">
          {movie?.name || movie?.title || movie?.original_name}
        </h1>
        <div className="text-black space-x-4">
          <button className="bg-red-600 text-white px-4 py-2 rounded">
            Play
          </button>
          <button className="bg-gray-800 text-white px-4 py-2 rounded">
            My List
          </button>
        </div>
        <p
          className="mt-4 text-sm text-gray-300 max-w-sm"
          style={{ lineHeight: '1.3' }}
        >
          {movie?.overview}
        </p>
      </div>
    </header>
  );
}
