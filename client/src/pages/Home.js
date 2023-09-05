import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Login from "./Login";
import Header from "../components/Header";

export default function Home() {
  const [signin, setSignin] = useState(false);

  
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        className="object-cover w-full h-full absolute inset-0"
        src="https://www.okynemedialab.com/wp-content/uploads/2019/11/netflix-background-50-Black-1024x576.jpg"
        alt=""
      />

      <div className="absolute top-0 left-0 mt-4 ml-4">
        <img src={logo} alt="Netflix Logo" className="w-32 h-16" />

      
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        {signin ? (
           <Login />
        ) : (
          <div className="body flex flex-col items-center justify-center mt-30">
            <div className="text flex flex-col">
              <h1 className="m-auto font-bold text-4xl text-center">
                Unlimited movies,
                <br /> TV shows and more
              </h1>
              <h4 className="m-auto text-xl mt-3 text-center">
                Watch anywhere. Cancel anytime.
              </h4>
              <h6 className="mt-4 text-center">
                Ready to watch? Enter your email to create or restart membership
              </h6>
            </div>

            <div className="flex flex-col items-center mt-4">
              <div className="flex">
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="border border-black text-black px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Enter your email"
                />
                <button
                  onClick={() => setSignin(true)}
                  className="bg-red p-4 bg-red-600 text-white hover:bg-red-dark focus:outline-none focus:ring-2 focus:ring-red ml-2"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
