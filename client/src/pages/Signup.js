import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";


export default function Signup() {
  const history = useNavigate();
  const [inpval, setInpval] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const addUserdata = async (e) => {
    e.preventDefault();

    const { fname, lname, email, password } = inpval;

    if (fname === "" || lname === "" || password === "") {
      setError("Please fill in all required fields.");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    } else {
      setEmailError(null);
    }

    try {
      const data = await fetch("https://netflix-clone-enaf.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fname,
          lname,
          email,
          password,
        }),
      });

      const res = await data.json();

      if (res.status === 201) {
        if (res.result && res.result.token) {
          localStorage.setItem("usersdatatoken", res.result.token);
        }
        setInpval({ ...inpval, email: "", password: "", fname: "", lname: "" });
        setSuccessMessage("User registered successfully!"); 
        setTimeout(() => {
          setSuccessMessage(null); 
          history("/netflix")
        }, 2000); 
      } else if (res.error === "Incorrect password" || res.error === "User not found") {
        setError("Incorrect email or password");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
    
      <div className="w-screen h-screen flex justify-center items-center bg-black">
        <div className="bg-white rounded-lg p-20 shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
          {successMessage && (
            <div className="text-green-500 mb-4">{successMessage}</div>
          )}
          <div className="space-y-4">
            <div>
              <label htmlFor="fname">First Name:</label>
              <br />
              <input
                type="text"
                id="fname"
                name="fname"
                className="border border-gray-300 p-2 rounded focus:outline-none"
                onChange={setVal}
                value={inpval.fname}
                placeholder="First name"
              />
            </div>
            <div>
              <label htmlFor="lname">Last Name:</label>
              <br />
              <input
                type="text"
                id="lname"
                name="lname"
                className="border border-gray-300 p-2 rounded focus:outline-none"
                onChange={setVal}
                value={inpval.lname}
                placeholder="Last name"
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <br />
              <input
                type="email"
                id="email"
                name="email"
                className={`border border-gray-300 p-2 rounded focus:outline-none ${
                  emailError ? "border-red-500" : ""
                }`}
                onChange={setVal}
                value={inpval.email}
                placeholder="Email"
              />
              {emailError && (
                <div className="text-red-500 mt-1">{emailError}</div>
              )}
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <br />
              <input
                type="password"
                id="password"
                name="password"
                className="border border-gray-300 p-2 rounded focus:outline-none"
                onChange={setVal}
                value={inpval.password}
                placeholder="Password"
              />
            </div>
          </div>
          <button
            onClick={addUserdata}
            className="mt-4 bg-red-600  text-white hover:bg-blue-600 text-center px-8 py-4 rounded"
          >
            Sign Up
          </button>
          {error && (
            <div className="text-red-500 mt-2">{error}</div>
          )}
        </div>
      </div>
    </>
  );
}