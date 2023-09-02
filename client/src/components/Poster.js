import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { API_KEY, requests } from '../utils/api';
import YouTube from 'react-youtube';

export default function Poster() {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  async function fetchData() {
    const request = await axios.get(requests.fetchNetflixOriginals);
    const randomMovieIndex = Math.floor(Math.random() * request.data.results.length);
    const randomMovie = request.data.results[randomMovieIndex];
    setMovie(randomMovie);
    return request;
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Fetch trailer data when the movie changes
    if (movie) {
      fetchTrailerData(movie.id);
    }
  }, [movie]);

  // Fetch trailer data function
  const fetchTrailerData = async (movieId) => {
    try {
      const response = await axios.get(`/movie/${movieId}/videos`, {
        params: { api_key: API_KEY },
      });

      const officialTrailer = response.data.results.find(
        (video) => video.type === 'Trailer' && video.site === 'YouTube'
      );

      if (officialTrailer) {
        setTrailerKey(officialTrailer.key);
      } else if (response.data.results.length > 0) {
        // If no official trailer found, use the first video in the results
        setTrailerKey(response.data.results[0].key);
      }
    } catch (error) {
      console.error('Error fetching trailer data:', error);
    }
  };

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text;
  }

  const playTrailer = (e) => {
    e.preventDefault()
    if (trailerKey) {
      setIsVideoVisible(true);
    }
  };

  const closeTrailer = () => {
    setIsVideoVisible(false);
    setTrailerKey(null);
  };

  return (
    <header
      className="text-white relative bg-contain h-96"
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
            <button
              className="bg-red-600 text-white px-4 py-2 rounded"
              onClick={playTrailer}
            >
              Play
            </button>
            <button className="bg-gray-800 text-white px-4 py-2 rounded">
           More Info
            </button>
          </div>
          <div
            className="mt-4 shadow-md"
            style={{
              width: '45rem',
              lineHeight: '1.3',
              paddingTop: '1rem',
              fontSize: '0.9rem',
              maxWidth: '360px',
            }}
          >
            <p className="text-gray-300 leading-relaxed">
              {truncateText(movie.overview, 200)}
            </p>
          </div>
          {isVideoVisible && trailerKey && (
            <div className="mt-4 relative">
              <YouTube
                videoId={trailerKey}
                opts={{ width: '560', height: '315' }}
              />
              <button
                className="bg-red-600 pt-10 text-white px-2 py-1 rounded absolute top-0 right-0 m-2 z-10"
                onClick={closeTrailer}
              >
                X
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
