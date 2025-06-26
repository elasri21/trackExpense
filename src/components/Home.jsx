import React from 'react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl w-3/4 font-bold mb-4 text-center">SmartSpend – Your Personal Expense Manager</h1>
      <p className="mb-6 w-3/4 text-center">
        Track your expenses effortlessly. Log in to monitor your spending, manage your budget, and take control of your financial future.
      </p>
      <Link to="/login" className="bg-blue-500 w-1/4 text-center text-white px-4 py-2 mb-3 rounded hover:bg-blue-600">
        Login
      </Link>
      <Link to="/signup" className="bg-blue-500 w-1/4 text-center text-white px-4 py-2 rounded hover:bg-blue-600">
        Sign Up
      </Link>
    </div>
  );
}

export default Home