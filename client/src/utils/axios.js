import axios from 'axios';

const movieData = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

// movieData.get('/movie/550')
//   .then(function (response) {
//     console.log(response.data);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });
export default movieData