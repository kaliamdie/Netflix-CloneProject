import React, { useEffect, useState } from 'react'

import axios from '../utils/axios'
export default function Row({title,fetchUrl,isLarge}) {
    const base_url="https://image.tmdb.org/t/p/original/"
    const [movies,setMovies]=useState([])

//fetch 

const fetchData =async()=>{
    const request=await axios.get(fetchUrl)
    console.log(request.data.results)
    setMovies(request.data.results)
    return request;
}
  
console.log(movies)
useEffect(()=>{
 fetchData()
    },[fetchUrl])
  return (
    <div>
      <h2 className='text-center font-bold text-2xl'>{title}</h2>
      <div className='ml-20'>
      <div className="flex justify-center overflow-y-hidden overflow-x-scroll whitespace-nowrap overflow-auto scrollbar-hide p-20">
    {movies.map(movie => (
                  <img key={movie.id} className={`mr-10 w-40 object-contain transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 ${isLarge && "max-h-screen hover:translate-x-1"}` }
                  src={`${base_url}${ isLarge ?movie.poster_path:movie.backdrop_path}`} 
                  alt={movie.name} />
                  ))}
</div>

      </div>
    </div>
  )
}
