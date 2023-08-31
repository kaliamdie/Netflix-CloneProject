import React from 'react';
import logo from "../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';

export default function Header(props) {
    const navigate = useNavigate();

    // function for the button
  

    return (
        <header className="absolute top-0 left-0 right-0 p-4 z-10">
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <img src={logo} alt="Netflix Logo" className="w-40 h-20 mr-4" />
            </div>
            {/* <button
                className="text-bold px-4 py-2 rounded bg-red text-white"
               
            >
                <Link to="/login">Log In</Link>
            </button> */}
              <button className='text-white' onClick={() => navigate(props.login ? "/login" : "/signup")}>
        {props.login ? "Log In" : "Sign Up"}
      </button>
        </div>
    </header>

    );
}
