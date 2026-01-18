import React, { useState } from 'react';
import axios from 'axios';

// onLogin කියන ෆන්ෂන් එක App.js එකෙන් මෙහාට එනවා
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username,
        password,
      });
      // සාර්ථක නම් App.js එකට කියනවා
      onLogin(res.data);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50">
      <div className="bg-white p-10 rounded-lg shadow-lg border border-gray-100 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login to Databox</h2>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
            Login
          </button>

          {error && <span className="text-red-500 text-center text-sm font-bold mt-2">Wrong Username or Password!</span>}
        </form>
      </div>
    </div>
  );
};

export default Login;