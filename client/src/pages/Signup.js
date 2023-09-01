import React, { useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  
  const history=useNavigate()
  const [inpval, setInpval] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const addUserdata = async (e) => {
    e.preventDefault();
  
    const { fname, lname, email, password } = inpval;
  
    if (fname === "" || email === "" || lname === "" || password === "") {
      alert("Please fill all fields");
    } else {
      try {
        const data = await fetch("/signup", {
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
        console.log(res); // Log the response from the server
  
        if (res.status === 201) {
        alert("User registration successful"); // Log a success message
          history("/netflix");
          localStorage.setItem("usersdatatoken", res.result.token);
          setInpval({ ...inpval, email: "", password: "" });
        } else {
          alert("User registration failed")
          console.log("User registration failed"); // Log a failure message
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };
  return (
    <>
      <Header login />
      <div className="w-screen h-screen flex justify-center items-center bg-black">
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
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
                className="border border-gray-300 p-2 rounded focus:outline-none"
                onChange={setVal}
                value={inpval.email}
                placeholder="Email"
              />
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
        className="mt-4 bg-black text-white hover:bg-blue-600 text-center px-4 py-2 rounded"
      >
        Sign Up
      </button>
        </div>
      </div>
    </>
  );
}
