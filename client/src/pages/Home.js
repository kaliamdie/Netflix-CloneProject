import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/logo.png";

export default function Home() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail(email) && !email) {
      alert('Please enter a valid email address');
      return;
    }
    
  };

  const validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };
  // const handleClick=()=>{
  //   if(!email){
  //     alert("please enter your email address")
  //   }
  // }
  return (

    <div className="relative w-screen h-screen overflow-hidden">
      
      <img
        className="object-cover w-full h-full absolute inset-0"
        src="https://www.okynemedialab.com/wp-content/uploads/2019/11/netflix-background-50-Black-1024x576.jpg"
        alt=""
      />
      <div className="absolute top-0 right-0 mt-4 mr-4">
        <button className=" p-4 rounded-xl bg-red-600 text-white hover:bg-red-dark focus:outline-none focus:ring-2 focus:ring-red">
        <Link to="/signup">sign up</Link>
        </button>
      </div>
      <div className="absolute top-0 left-0 mt-4 ml-4">
        <img src={logo} alt="Netflix Logo" className="w-32 h-16" />
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="body flex flex-col items-center justify-center mt-30">
          <div className="text flex flex-col">
            <h1 className='m-auto font-bold text-4xl text-center'>Unlimited movies,<br/> TV shows and more</h1>
            <h4 className='m-auto text-xl mt-3 text-center'>Watch anywhere. Cancel anytime.</h4>
            <h6 className='mt-4 text-center'>Ready to watch? Enter your email to create or restart membership</h6>
          </div>
          <div className="flex flex-col space-y-4 items-center mt-4">
            <div className="flex space-x-2">
              <form onSubmit={handleSubmit}>
              <input
                type="email"
                id="email"
                name="email"
                className='border border-black text-black px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black'
                placeholder='Enter your email'
                onChange={handleEmailChange}
              />
              <button className=" p-3 rounded-md text-white bg-red-600 hover:bg-red-dark focus:outline-none focus:ring-2 focus:ring-red">
                <Link to={email ? "/login" : "#"}>Get Started</Link>
              </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
