// import { configureStore, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { API_KEY, TMDB_BASE_URL } from "../utils/api"; // Fixed the spelling of TMDB_BASE_URL
// import axios from "axios";

// const initialState = {
//   movies: [],
//   genres: [],
// };

// export const getGenres = createAsyncThunk("netflix/genres", async () => {
//   const {
//     data: { genres },
//   } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`); // Fixed the spelling of TMDB_BASE_URL
// //   console.log(genres);
// });

// const createArrayData = (array, moviesArray, genres) => {
//   console.log(array);
//   array.forEach((movie) => {
//     const movieGenres = [];
//     movie.genre_ids.forEach((genre) => {
//       const name = genres.find(({ id }) => id === genre);
//       if (name) movieGenres.push(name.name);
//     });
//     if (movie.backdrop_path)
//       moviesArray.push({
//         id: movie.id,
//         name: movie?.original_name ? movie.original_name : movie.original_title,
//         image: movie.backdrop_path,
//         genres: movieGenres.slice(0, 3),
//       });
//   });
// };

// const getData = async (api, genres, paging) => {
//   const moviesArray = [];
//   for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
//     const {
//       data: { results },
//     } = await axios.get(`${api}${paging ? `&page=${i}` : ""}`);
//     createArrayData(results, moviesArray, genres);
//   }
//   return moviesArray;
// };

// export const fetch = createAsyncThunk("netflix/trending", async ({ type }, thunk) => {
//   const { netflix: { genres } } = thunk.getState(); // Fixed the spelling of netflix
//   const data = await getData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`, genres, true);
//   console.log(data);
// });

// const NetflixSlice = createSlice({
//   name: "netflix",
//   initialState,
//   extraReducers: (builder) => {
//     builder.addCase(getGenres.fulfilled, (state, action) => {
//       state.genres = action.payload;
//       state.genresLoaded = true;
//     });
//   },
// });

// export const store = configureStore({
//   reducer: {
//     netflix: NetflixSlice.reducer,
//   },
// });
