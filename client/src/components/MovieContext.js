// MovieContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // Import axios
import { API_KEY } from '../utils/api';

const MovieContext = createContext();

export const useMovieContext = () => {
  return useContext(MovieContext);
};

export const MovieProvider = ({ children }) => {
  const base_url = 'https://image.tmdb.org/t/p/original/';

  // Define genre URLs as an array
  const genres = [
    '/discover/movie?api_key=YOUR_API_KEY&with_genres=28', // Action
    '/discover/movie?api_key=YOUR_API_KEY&with_genres=35', // Comedy
    '/discover/movie?api_key=YOUR_API_KEY&with_genres=27', // Horror
    // Add more genres as needed
  ];

  const [loading, setLoading] = useState(true);
  const [trailer, setTrailer] = useState(null); // Trailer state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1`
        );
        // Set loading to false after data is fetched
        setLoading(false);
        // Set movies data in your state here
      } catch (error) {
        console.error('Error fetching data:', error);
        // Set loading to false in case of an error
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to set trailer data
  const setTrailerData = async (id) => {
    try {
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
    } catch (error) {
      console.error('Error fetching trailer data:', error);
    }
  };

  const contextValue = {
    genres,
    loading,
    base_url,
    trailer, // Trailer state
    setTrailerData, // Function to set trailer data
  };

  return (
    <MovieContext.Provider value={contextValue}>
      {children}
    </MovieContext.Provider>
  );
};
