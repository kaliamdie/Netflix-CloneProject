import {configureStore,createAsyncThunk,createSlice} from "@reduxjs/toolkit"
import { API_KEY, TMDN_BASE_URL } from "../utils/api"
import axios from "axios"

const initialState={
    movies:[],
    genres:false,
    genres:[],
}
export const getGeneres=createAsyncThunk("netflix/genres" ,async()=>{
    const {data:{genres},
}=await axios.get((`${TMDN_BASE_URL}/genre/movie/list?api_key=${API_KEY}`)) 
console.log(genres);
// return genres 
})
const createArrayData= (array, moviesArray, genres) => {
  console.log(array)
    array.forEach((movie) => {
      const movieGenres = [];
      movie.genre_ids.forEach((genre) => {
        const name = genres.find(({ id }) => id === genre);
        if (name) movieGenres.push(name.name);
      });
      if (movie.backdrop_path)
        moviesArray.push({
          id: movie.id,
          name: movie?.original_name ? movie.original_name : movie.original_title,
          image: movie.backdrop_path,
          genres: movieGenres.slice(0, 3),
        });
    });
  };
  
const getData= async (api,genres,paging)=>{
const moviesArray=[]
for(let i=1; moviesArray.length<60 && i<10 ;i++){
    const {
        data: { results },
      } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
      createArrayData(results, moviesArray, genres);
    }
   
    return moviesArray;
   
  };
export const fetch=createAsyncThunk("netflix/trending",async({type},thunk)=>{
const {NetflixSlice:{genres}} =thunk.getState()
const data= getData(`${TMDN_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,genres,true )
console.log(data)
// return getData(`${TMDN_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genres}`)
})
const NetflixSlice= createSlice({
    name:"netflix",
    initialState,
    extraReducers:(builder)=>{
        builder.addCase(getGeneres.fulfilled,(state,action)=>{
state.genres=action.payload
state.generesLoaded=true;
        })
    },
})


export const store= configureStore({
    reducer:{
        netflix:NetflixSlice.reducer,
    }
})