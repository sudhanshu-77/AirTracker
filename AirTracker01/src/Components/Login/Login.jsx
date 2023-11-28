import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { database } from '../Config/firebaseConfig';
import {useAuth} from "../../auth.jsx"
export default function Login() {
  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
const {setAuth} = useAuth();
  // Navigation hook
  const history = useNavigate();

  // Form submit handler
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
      signInWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, 'authData');
          history('/home');
          localStorage.setItem("auth", JSON.stringify(data))
          setAuth(data)
        })
        .catch((err) => {
          alert(err.code);
        });
   
    }
  


  return (
    <div
      className="flex justify-center items-center h-screen"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1592985684811-6c0f98adb014?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
          >
           Sign In
          </button>
        </form>
        <p className="mt-4 text-center">
            Not a user?
           <NavLink className="text-orange-500" to="/signup">
              Sign Up
            </NavLink>
          </p>
        {/* {login ? (
          <p className="mt-4 text-center">
            Not a user?
            <button className="text-orange-500" onClick={() => setLogin(false)}>
              Sign Up
            </button>
          </p>
        ) : (
          <p className="mt-4 text-center">
            Already a user?
            <button className="text-orange-500" onClick={() => setLogin(true)}>
              Sign In
            </button>
          </p>
        )} */}
      </div>
    </div>
  );
}