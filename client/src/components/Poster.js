import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { API_KEY, requests } from '../utils/api';
import { Link } from 'react-router-dom';
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

  useEffect(() => {
    // Fetch trailer data when the movie changes
    if (movie) {
      fetchTrailerData(movie.id);
    }
  }, [movie]);

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + '...';
    }
    return text;
  }

  const playTrailer = (e) => {
    e.preventDefault();
    if (trailerKey) {
      setIsVideoVisible(true);
    }
  };

  const closeTrailer = () => {
    setIsVideoVisible(false);
  };

  return (
    <header
      className="text-white relative"
      style={{
        objectFit: 'contain',
        height: '448px',
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}
    >
      {movie && (
        <div
          className=""
          style={{
            marginLeft: '30px',
            paddingTop: '140px',
            height: '190px',
          }}
        >
          <h1 className="mb-4 text-5xl font-bold max-w-md">
            {movie.name || movie.title || movie.original_name}
          </h1>
          <div className="flex items-center space-x- cursor-pointer">
            <div>
              {/* Conditionally render the YouTube video */}
              {trailerKey && isVideoVisible && (
                <div className="relative">
                  <button
                    className="bg-red-600 text-white px-2 py-1 rounded absolute top-0 right-0 m-2 z-10"
                    onClick={closeTrailer}
                  >
                    X
                  </button>
                  <YouTube
                    videoId={trailerKey}
                    opts={{
                      width: '560',
                      height: '315',
                      playerVars: {
                        modestbranding: 1, // Remove YouTube branding
                        rel: 0,
                        showinfo: 0,
                        autoplay: 1, // Autoplay the video
                      },
                    }}
                    style={{paddingTop:"300"}}
                  />
                </div>
              )}
              {!isVideoVisible && (
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded"
                  onClick={playTrailer}
                >
                  Play
                </button>
              )}
            </div>
            <button className="bg-gray-800 text-white px-4 py-2 rounded">
              <Link to={`/more-info/${movie.id}`}>More Info</Link>
            </button>
          </div>
          {!isVideoVisible && (
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
                {truncateText(movie.overview, 120)}
              </p>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
