import { useState } from "react";
import {Link, useNavigate} from "react-router-dom"
import Header from "../components/Header";
function Login() {
  const history=useNavigate()
    const [inpval,setInpval]=useState({
        
        
        email:"",
        password:""
      })
      const setVal=(e)=>{
        const {name,value}=e.target
        setInpval(()=>{
            return{
                ...inpval,
                [name]:value
            }
        })
      }
      const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = inpval;
      
        if (email === "" || password === "") {
          alert("Please fill all fields");
          return;
        }
      
        
          const data = await fetch("/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email,
              password
            })
          });
      
          const res=await data.json()
          console.log(res)
          if(res.status ===201){
            history("/netflix")
            localStorage.setItem("usersdatatoken",res.result.token)
            setInpval({...inpval,email:"",password:""})
          }
        }
  return (
    <>
     <Header />
     <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
          <h1 className="text-3xl font-semibold text-black mb-4 text-center">Log In</h1>
  <form>
             
                <br /><br />
                <label htmlFor="email">Email:</label>
                <br />
                <input 
                    type="email" 
                     id="email"
                    name="email"
                    className='border border-black'
                   value={inpval.email}
                   onChange={setVal}
                />
                <br /><br />
                <label htmlFor="password">Password:</label>
                <br />
                <input 
                    type="password" 
                    id="password"
                    name="password"
                    className='border border-black'
                    value={inpval.password}
                    onChange={setVal}
                />
                <br /><br />
              
                <button onClick={loginUser}className='block bg-black text-white hover:bg-blue-600 text-black text-center px-4 py-2 rounded' >Log In</button>
                <p className="mt-2">
  Don't have an account?
  <Link to="/signup" className="text-decoration-underline ml-1">
    Sign Up
  </Link>
</p>

            </form>
    </div>
    </div>
    </>
  )
}
export default Login;