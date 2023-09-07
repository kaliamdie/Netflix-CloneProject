import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { requests } from '../utils/api';
import Row from '../components/Row';
import Poster from '../components/Poster';

export default function Netflix() {
  const [scrolled, setScrolled] = useState(false);
  const history = useNavigate();

  window.onscroll = () => {
    setScrolled(window.scrollY === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const NetflixValid = async () => {
    let token = localStorage.getItem("usersdatatoken");

    if (!token) {
      history("/error"); // Redirect to the home page if token is missing
      return; // Return early to avoid making the fetch request
    }

    const res = await fetch("https://netflix-clone-enaf.onrender.com/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await res.json();

    if (data.status === 401 || !data) {
      history("/error");
    } else {
      console.log("user verified");
      console.log("User Data:", data.ValidUserOne); 
      history("/netflix");
    }
  };

  useEffect(() => {
    NetflixValid();
  },[]);

  return (
    <div className='bg-black'>
      <Navbar scrolled={scrolled} />
      <Poster />
      <div>
        <Row title={"Netflix Originals"} fetchUrl={requests.fetchNetflixOriginals} isLarge={true} />
        <Row title={"Trending Now"} fetchUrl={requests.fetchTrending} />
        <Row title={"Animation"} fetchUrl={requests.fetchAnimation} />
        <Row title={"Comedy Movie"} fetchUrl={requests.fetchComedyMovies} />
        <Row title={"Horror Movie"} fetchUrl={requests.fetchHorrorMovies} />
        <Row title={"Action Movie"} fetchUrl={requests.fetchActionMovies} />
        <Row title={"Thriller"} fetchUrl={requests.fetchThriller} />
      </div>
    </div>
  );
}
