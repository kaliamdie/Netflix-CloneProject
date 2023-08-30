import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import backgroundImage from '../assets/home.jpg';
import MovieLogo from '../assets/homeTitle.webp';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, fetch } from '../data';

export default function Netflix() {
    const [scrolled, setScrolled] = useState(false);

    window.onscroll = () => {
        setScrolled(window.scrollY === 0 ? false : true);
        return () => (window.onscroll = null);
    };

    const history = useNavigate();
    //data and api
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres());
    }, []);

    useEffect(() => {
        if (genresLoaded) dispatch(fetch({ type: 'all' }));
    }, [genresLoaded]);

    // const NetflixValid = async () => {
    //     let token = localStorage.getItem("usersdatatoken");

    //     const res = await fetch("/validuser", {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": token
    //         }
    //     });

    //     const data = await res.json();

    //     if (data.status == 401 || !data) {
    //         history("*");
    //     } else {
    //         console.log("user verified");
         
    //         history("/netflix");
    //     }
    // }

      
    // useEffect(() => {
    //     NetflixValid();
    // }, []);

    return (
        <div className="relative">
            <Navbar scrolled={scrolled} />

            <div className="bg-black h-screen relative overflow-hidden">
                <img
                    src={backgroundImage}
                    alt=""
                    className="object-cover w-full h-full absolute inset-0  brightness-50"
                />

                <div className="absolute inset-0 flex flex-col items-start justify-center pl-8">
                    <div className="text-white mb-6">
                        <img src={MovieLogo} alt="" className=" mt-20 w-2/9" />
                    </div>

                    <button
                        onClick={() => history('/player')}
                        className="bg-white text-black mb-2"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 inline-block mr-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                            />
                        </svg>
                        Play
                    </button>
                    <button className="bg-white text-black">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 inline-block mr-2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                            />
                        </svg>
                        More Info
                    </button>
                </div>
            </div>
        </div>
    );
}

