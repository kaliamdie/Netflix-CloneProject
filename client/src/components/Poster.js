import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { requests } from '../utils/api';

export default function Poster() {
  const [movie, setMovie] = useState(null); // Change initial state to null or an empty object

  async function fetchData() {
    const request = await axios.get(requests.fetchNetflixOriginals);
    const randomMovieIndex = Math.floor(Math.random() * request.data.results.length);
    const randomMovie = request.data.results[randomMovieIndex];
    console.log(randomMovie); // Check if the fetched random movie object is valid
    setMovie(randomMovie); // Set the random movie object in the state
    return request;
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log(movie);

  return (
    <header
      className=""
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: 'center center',
      }}
    >
      <div className='banner'>
        <h1> {movie?.name || movie?.title || movie?.original_name}</h1>
      </div>
      <div className='buttons'>
        <button>Play</button>
        <button>My List</button>
      </div>
    </header>
  );
}
