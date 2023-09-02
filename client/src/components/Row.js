import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import { API_KEY } from '../utils/api';

export default function Row({ title, fetchUrl, isLarge }) {
  const base_url = 'https://image.tmdb.org/t/p/original/';
  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: 'Loading Movies' });
  const [currentVideoId, setCurrentVideoId] = useState(null); // Tracking current video ID

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

  const selectMovie = (movie) => {
    if (currentVideoId) {
      // Pause the currently playing video
      setTrailer(null);
      setCurrentVideoId(null);
    }
    if (!trailer || movie.id !== trailer.key) {
      fetchMovie(movie.id);
      setMovie(movie);
      setCurrentVideoId(movie.id); // Set the current video ID
      // window.scrollTo(0, 0);
    }else if(trailer){
     setTrailer("")
    }
  };

  return (
    <div className='text-white'>
      <h2 className='text-center font-bold text-2xl'>{title}</h2>
      <div className='ml-20'>
        <div className='flex justify-center overflow-y-hidden overflow-x-scroll whitespace-nowrap overflow-auto scrollbar-hide p-20'>
          {movies.map((movie) => (
            <img
              key={movie.id}
              className={`mr-10 w-40 object-contain transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 ${
                isLarge && 'max-h-screen hover:translate-x-1'
              }`}
              src={`${base_url}${isLarge ? movie.poster_path : movie.backdrop_path}`}
              alt={movie.name}
              onClick={() => selectMovie(movie)}
            />
          ))}
        </div>
        {trailer && <YouTube videoId={trailer.key} opts={opts} />}
      </div>
    </div>
  );
}