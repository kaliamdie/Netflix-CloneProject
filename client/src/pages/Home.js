import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Home() {

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
    <div className="body flex flex-col items-center justify-center mt-30">
      <div className="text flex flex-col">
        <h1 className="m-auto font-bold text-4xl text-center">
          Unlimited movies,<br /> TV shows and more
        </h1>
        <h4 className="m-auto text-xl mt-3 text-center">
          Watch anywhere. Cancel anytime.
        </h4>
        <h6 className="mt-4 text-center mb-5">
          Ready to watch? Enter your email to create membership
        </h6>
      </div>
      <div className="flex flex-col space-y-4 items-center mt-4">
        <div className="flex space-x-2">
        <div className="absolute top-0 right-0 mt-4 mr-4">
       <Link  className=" p-4 rounded-xl bg-red-600 text-white hover:bg-red-dark focus:outline-none focus:ring-2 focus:ring-red"
       to="/login">Log In</Link>

  </div>
          <form>
          
            {/* Use only the Link component and style it to look like a button */}
            <Link
              to="/signup"
              // onClick={handleClick}
              className=" px-6 py-4 rounded-md text-white bg-red-600 hover:bg-red-dark focus:outline-none focus:ring-2 focus:ring-red"
            >
              Get Started
            </Link>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
);
}
