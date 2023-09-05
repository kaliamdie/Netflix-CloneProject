import React from 'react';
import { Link } from 'react-router-dom';

export default function SearchResult({ title, posterPath, movieId }) {
  return (
    <div className="flex items-center mb-2">
      <Link to={`/moreinfo/${movieId}`}> 
        <img
          src={posterPath}
          alt={title}
          className="w-10 h-16 object-cover m-2"
        />
      </Link>
      <p className="text-white">{title}</p>
    </div>
  );
}
