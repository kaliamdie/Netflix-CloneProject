// SignOut.js 
import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignOut() {
  const history = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('usersdatatoken'); // Remove the token
    history('/'); // Navigate back to the homepage or any other desired page
  };

  return (
    <div>
      <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded">
        Log Out
      </button>
    </div>
  );
}

export default SignOut;
