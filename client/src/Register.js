import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);
    try {
      // Backend එකට දත්ත යැවීම (Port 5000)
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
      // සාර්ථක වූ විට
      res.data && setSuccess(true);
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50">
      <div className="bg-white p-10 rounded-lg shadow-lg border border-gray-100 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create New Account</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Username</label>
            <input 
              type="text" 
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter username"
              onChange={e => setUsername(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Email</label>
            <input 
              type="email" 
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Password</label>
            <input 
              type="password" 
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button 
            type="submit" 
            className="bg-blue-600 text-white font-bold py-2 rounded mt-4 hover:bg-blue-700 transition"
          >
            Register Now
          </button>

          {/* පණිවිඩ පෙන්වීම */}
          {success && <span className="text-green-500 text-center text-sm font-bold mt-2">Registration Successful!</span>}
          {error && <span className="text-red-500 text-center text-sm font-bold mt-2">Something went wrong! Try again.</span>}
        </form>
      </div>
    </div>
  );
};

export default Register;