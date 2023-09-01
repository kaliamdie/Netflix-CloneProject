import React from 'react'
import { Link } from 'react-router-dom'

export default function Error() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-black text-white">
  
      <h1 className="text-4xl font-bold mb-4">You need to sign up or log in to get access to this page</h1>
      <div className="flex space-x-4">
     
         <Link to="signup" className="bg-red-600 px-8 py-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500">Sign Up</Link> 
       
        <Link to="/login"className="bg-gray-800 px-8 py-4 rounded-lg hover:bg-white hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-500">Log In</Link>
      </div>
    </div>
  )
}
