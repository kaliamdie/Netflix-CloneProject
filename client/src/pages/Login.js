import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Login() {
  const history = useNavigate();
  const [inpval, setInpval] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = inpval;

    if (email === "" || password === "") {
      setError("Please fill all fields");
      return;
    }

    const data = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const res = await data.json();
    console.log(res);
    if (res.status === 201) {
      history("/netflix");
      localStorage.setItem("usersdatatoken", res.result.token);
      setInpval({ ...inpval, email: "", password: "" });
    } else if (res.error === "Incorrect password" || res.error === "User not found") {
      setError("Incorrect email or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-800 p-6 rounded shadow-md max-w-xs w-full" style={{ background: "rgba(0, 0, 0, 0.85)" }}>
        <h1 className="text-3xl font-semibold text mb-4 text-center text-white">
          Log In
        </h1>
        <form>
          <div className="mb-4">
            <label htmlFor="email" className="text-white">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              className="border text-white border-black w-full px-3 py-2 rounded"
              value={inpval.email}
              onChange={setVal}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-white">
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              name="password"
              className="border border-black w-full px-3 py-2 rounded text-black"
              value={inpval.password}
              onChange={setVal}
            />
          </div>
          <button
            onClick={loginUser}
            className="block bg-red-600 hover:bg-red-700 text-white text-center px-4 py-2 rounded w-full"
          >
            Log In
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
          <p className="mt-4 text-white">
            Don't have an account?
            <Link
              to="/signup"
              className="text-decoration-underline ml-1 text-white underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
