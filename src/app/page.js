"use client"
import '@/app/globals.css';
import React, { useState } from 'react';
import Image from 'next/image';
import ioclLogo from "../app/img/logo.jpg";

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login with:', { username, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-4 shadow-md rounded-md w-full md:w-80">
        <div className="flex justify-center mb-4">
          <Image
            src={ioclLogo}
            width={120}
            height={140}
            alt="IOCL"
          />
        </div>
        <h2 className="text-xl font-bold mb-2">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-2">
            <label htmlFor="username" className="block text-gray-600 text-sm font-semibold mb-1">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-gray-600 text-sm font-semibold mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-2 text-blue-500">
            <a href="/register" className="hover:underline">
              Register new user
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
