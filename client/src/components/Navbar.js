import React from 'react';
import logo from "../assets/logo.png";
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ scrolled }) {
    const links = [
        { name: "Home", link: "/" },
        { name: "Tv Shows", link: "/tv" },
        { name: "Movies", link: "/movies" },
        { name: "My List", link: "/mylist" },
    ];
   const navigate=useNavigate()
    return (
        <div className='text-black'>
             <nav
            className={`fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 ${
                scrolled ? 'bg-black' : 'bg-gray-900'
            }`}
        >
              
                    <div className=''>
                        <img src={logo} alt="" className="w-20 ml-2 object-contain" />
                </div>
                <ul className="flex space-x-6">
                    {links.map(({ name, link }) => {
                        return (
                            <li key={name}>
                                <Link to={link} className="text-white hover:text-blue-500 transition">{name}</Link>
                            </li>
                        );
                    })}
                </ul>
                <div className=''>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search"
                            className="px-4 py-2 pr-10 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <button>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>
                </button>
 

                        </div>
                    </div>
                    <button onClick={()=>navigate("/login")} className="text-black hover:text-blue-500 transition ml-4">
                     sign out
                    </button>
                </div>
            </nav>
        </div>
    );
}
