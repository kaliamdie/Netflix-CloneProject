import React, { useEffect, useState, useRef } from 'react';
import axios from '../utils/axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import { API_KEY } from '../utils/api';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'; 

export default function Row({ title, fetchUrl, isLarge }) {
  const scrollRef = useRef(null);
  const base_url = 'https://image.tmdb.org/t/p/original/';
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: 'Loading Movies' });
  const [currentVideoId, setCurrentVideoId] = useState(null); // Tracking current video ID
  const [scrollPosition, setScrollPosition] = useState(0); // Track scroll position
  const [showVideo, setShowVideo] = useState(false); // State variable to control video visibility

  const fetchData = async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
    return request;
  };

  useEffect(() => {
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
      showinfo: 0,
      rel: 0,
    },
  };

  const fetchMovie = async (id) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`
    );
    const data = response.data;
    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === 'Official Trailer'
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }
    setMovie(data);
  };

  // Function to toggle video visibility
  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  const selectMovie = (movie) => {
    if (currentVideoId) {
      setTrailer(null);
      setCurrentVideoId(null);
    }
    if (!trailer || movie.id !== trailer.key) {
      fetchMovie(movie.id);
      setMovie(movie);
      setCurrentVideoId(movie.id); // Set the current video ID which is on the background
      setShowVideo(true); // Show the video when a movie is selected
    } else if (trailer) {
      setTrailer('');
      setShowVideo(false); // Hide the video when the same movie is clicked again
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 200;
      setScrollPosition(scrollRef.current.scrollLeft); 
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 200; 
      setScrollPosition(scrollRef.current.scrollLeft); 
    }
  };

   return (
    <div className="text-white">
      <h2 className="text-center font-bold text-2xl">{title}</h2>
      <div className="ml-20 relative">
        <div
          className="flex overflow-x-scroll p-20 scrollbar-hide"
          ref={scrollRef}
          onScroll={(e) => setScrollPosition(e.target.scrollLeft)} 
        >
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`mr-10 w-40 object-contain transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 `}
              src={`${base_url}${isLarge ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => selectMovie(movie)}
            />
          ))}
        </div>
        {showVideo && trailer && (
          <div className="relative">
            <button
              className="absolute top-2 right-2 z-10 text-white bg-red-500 rounded-full p-2"
              onClick={toggleVideo}
            >
              X
            </button>
            <div style={{ position: 'relative' }}>
              <YouTube videoId={trailer.key} opts={opts} />
            </div>
          </div>
        )}
        {/* Scroll buttons */}
        {scrollPosition > 0 && ( 
          <button
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 p-2 rounded-full text-white cursor-pointer hover:bg-opacity-75"
            onClick={scrollLeft}
          >
            <ChevronLeftIcon className="h-9 w-9 bg-white text-black hover:bg-black hover:text-white" />
          </button>
        )}
        {scrollRef.current &&
          scrollPosition < scrollRef.current.scrollWidth - scrollRef.current.clientWidth && (
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 p-2 rounded-full text-white cursor-pointer hover:bg-opacity-75"
              onClick={scrollRight}
            >
              <ChevronRightIcon className="h-9 w-9 bg-white text-black hover:bg-black hover:text-white" />
            </button>
          )}
      </div>
    </div>
  );
}