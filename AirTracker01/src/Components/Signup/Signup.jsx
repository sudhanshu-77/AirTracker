import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { database } from '../Config/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    createUserWithEmailAndPassword(database, email, password)
    .then((data) => {
      console.log(data, 'authData');
      alert("Thank You For Sign Up")
      history('/login');
    })
    .catch((error) => {
      alert(error.code);
    });
  }

  return (
    <div className="flex justify-center items-center h-screen"
    
    style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1531329818183-bba7e80bfecd?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
     
    }}
  >
    
      <div className="bg-white p-8 m-4  rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
          >
           Sign Up
          </button>
        </form>
        <p className="mt-4 text-center">
        Already registered? Click to{' '}
          <Link to="/login" className="text-orange-500 font-bold">
           Log In
          </Link>
        </p>
      </div>
    </div>
  );
}