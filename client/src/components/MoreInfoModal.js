import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { API_KEY } from '../utils/api';
import { Link, useParams } from 'react-router-dom';

export default function MoreInfoModalPage() {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [castAndCrew, setCastAndCrew] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`/movie/${movieId}`, {
          params: {
            api_key: API_KEY,
          },
        });
        setMovieDetails(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    const fetchCastAndCrew = async () => {
      try {
        const response = await axios.get(`/movie/${movieId}/credits`, {
          params: {
            api_key: API_KEY,
          },
        });
        console.log('Cast and Crew Data:', response.data); // Debugging statement
        setCastAndCrew(response.data.cast); // Assuming you want the cast members
      } catch (error) {
        console.error('Error fetching cast and crew:', error);
      }
    };

    if (movieId) {
      fetchMovieDetails();
      fetchCastAndCrew();
    }
  }, [movieId]);

  return (
    <div className="text-white bg-black h-screen relative">
      {/* Background Image */}
      <img
        src={`https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path}`}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-50"
      />
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="w-64 md:w-96 text-center">
            {/* Movie Poster */}
            <img
              src={`https://image.tmdb.org/t/p/w300/${movieDetails?.poster_path}`}
              alt=""
              className="mx-auto rounded-lg shadow-lg"
            />
            {/* Movie Title */}
            <h2 className="text-3xl md:text-4xl mt-4 font-semibold">
              {movieDetails?.title}
            </h2>
            {/* Movie Overview */}
            <p className="mt-2 text-sm md:text-base text-gray-300">
              {movieDetails?.overview}
            </p>
            {/* Movie Rating */}
            <p className="mt-2 text-sm md:text-base text-yellow-500">
              Rating: {movieDetails?.vote_average}
            </p>
          </div>
        </div>
        {/* Cast and Crew */}
        <div className="mt-4 p-4 bg-black text-white">
          <h3 className="text-3xl mb-2 font-semibold">Cast</h3>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {castAndCrew.map((castMember) => (
              <li
                key={castMember.id}
                className="text-sm md:text-base whitespace-nowrap overflow-hidden overflow-ellipsis"
                title={castMember.name}
              >
                {castMember.name}
              </li>
            ))}
          </ul>
        </div>
        {/* Go Back Button */}
        <div className="absolute top-4 left-4">
          <button className="bg-red-600 text-white px-4 py-2 rounded">
            <Link to="/netflix">Go Back</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
