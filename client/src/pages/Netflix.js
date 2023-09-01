import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

import { requests } from '../utils/api';
import Row from '../components/Row';
import Poster from '../components/Poster';

export default function Netflix() {
    const [scrolled, setScrolled] = useState(false);
 ;
    window.onscroll = () => {
        setScrolled(window.scrollY === 0 ? false : true);
        return () => (window.onscroll = null);
    };


    const history = useNavigate();


    const NetflixValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();
      
        if (data.status === 401 || !data) {
            history("*");
        } else {
            console.log("user verified");
         
            history("/netflix");
        }
    }

      
    useEffect(() => {
        NetflixValid();
    }, []);
   
    return (
        <div className='bg-black'>
             <Navbar scrolled={scrolled}  />
           

              <Poster/>  
  {/* row */}
  <div>
            <Row title={"Netflix Originals"} fetchUrl={requests.fetchNetflixOriginals}
            isLarge
            />
            {/* <Row title={"Top Rated"} fetchUrl={requests.fetchTopRated}/> */}
            <Row title={"Trending Now"} fetchUrl={requests.fetchTrending} />
            <Row title={"Animation"} fetchUrl={requests.fetchAnimation} />
            <Row title={"Comdey Movie "} fetchUrl={requests.fetchComedyMovies} />
            <Row title={"Horror Movie"} fetchUrl={requests.fetchHorrorMovies} />
            <Row title={"Action Movie"} fetchUrl={requests.fetchActionMovies} />
            <Row title={"Thriller"} fetchUrl={requests.fetchThriller} />
          
            
          
         
            </div>
        </div>
    );
}

