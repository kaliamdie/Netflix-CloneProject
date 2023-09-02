// import { API_KEY } from "../utils/api";
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios'; // Import axios
//  const TvShows = ({ fetchUrl }) => {
//   const [tvShows, setTvShows] = useState([]);
//   const base_url = 'https://image.tmdb.org/t/p/original'; // Replace with the appropriate base URL
//   const apiKey = API_KEY; // Replace with your TMDB API key

//   // Fetch TV shows data based on the specified URL
//   useEffect(() => {
//     if (fetchUrl) {
//       axios
//         .get(fetchUrl, {
//           params: {
//             api_key: apiKey,
//           },
//         })
//         .then((response) => {
//           console.log('API Response:', response.data); // Debugging: Log the API response
//           setTvShows(response.data.results);
//         })
//         .catch((error) => {
//           console.error('Error fetching TV shows:', error);
//         });
//     }
//   }, [fetchUrl, apiKey]);

//   return (
//     <div>
//       {/* Render TV shows */}
//       {tvShows && tvShows.length > 0 ? (
//         tvShows.map((show) => (
//           <div key={show.id}>
//             <img src={`${base_url}${show.poster_path}`} alt={show.title} />
//             <h3>{show.title}</h3>
//           </div>
//         ))
//       ) : (
//         <p>"No TV shows available for this genre."</p>
//       )}
//     </div>
//   );
// };
// export default TvShows