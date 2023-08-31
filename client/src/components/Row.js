import React, { useEffect, useState } from 'react'
import axios from '../utils/axios'
import YouTube from "react-youtube"
import movieTrailer from "movie-trailer"
export default function Row({title,fetchUrl,isLarge}) {
    const base_url="https://image.tmdb.org/t/p/original/"
    const [movies,setMovies]=useState([])
    const [trailerUrl,setTrailerUrl]=useState("")

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

    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
      },
    };
    const handleClick = (movie) => {
      if (trailerUrl) {
        setTrailerUrl("");
      } else {
        movieTrailer(movie?.name || "", { multi: false })
          .then(url => {
            if (!url) {
              // If no trailer URL was found with the original title, try a modified title
              const modifiedTitle = `${movie?.name || ""} trailer`;
              movieTrailer(modifiedTitle, { multi: false })
                .then(modifiedUrl => {
                  if (modifiedUrl) {
                    const urlParams = new URLSearchParams(new URL(modifiedUrl).search);
                    if (urlParams.has("v")) {
                      setTrailerUrl(urlParams.get("v"));
                    } else {
                      console.log("Video ID not found in URL");
                    }
                  } else {
                    console.log("No trailer URL found.");
                  }
                })
                .catch(error => console.log(error));
            } else {
              const urlParams = new URLSearchParams(new URL(url).search);
              if (urlParams.has("v")) {
                setTrailerUrl(urlParams.get("v"));
              } else {
                console.log("Video ID not found in URL");
              }
            }
          })
          .catch(error => console.log(error));
      }
    };
    
    
    
  return (
    <div className='text-white'>
      <h2 className='text-center font-bold text-2xl'>{title}</h2>
      <div className='ml-20'>
      <div className="flex justify-center overflow-y-hidden overflow-x-scroll whitespace-nowrap overflow-auto scrollbar-hide p-20">
    {movies.map(movie => (
                  <img 
                  onClick={()=>handleClick(movie)}
                  key={movie.id} className={`mr-10 w-40 object-contain transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110 hover:bg-gray-100 ${isLarge && "max-h-screen hover:translate-x-1"}` }
                  src={`${base_url}${ isLarge ?movie.poster_path:movie.backdrop_path}`} 
                  alt={movie.name} />
                  ))}
                  
</div>
{trailerUrl && <YouTube videoId={trailerUrl} opts={opts}/>}
      </div>
    </div>
  )
}
