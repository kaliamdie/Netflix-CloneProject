import React from 'react';
import { useMovieContext } from './MovieContext'; // Import the hook

export default function Description({movieId}) {
  const { loading, base_url, trailer, setTrailerData } = useMovieContext();


  return (
    <div>
        <div className='text-white'>
            <h1>kdshk</h1>
        </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className='text-white'>
          <p>Base URL: {base_url}</p>
          {trailer ? (
            <div>
              <p>Trailer Name: {trailer.name}</p>
              <p>Trailer Key: {trailer.key}</p>
            </div>
          ) : (
            <p>No trailer available.</p>
          )}
          <button onClick={() => setTrailerData(movieId)}>Load Trailer</button>
        </div>
      )}
    </div>
  );
}
