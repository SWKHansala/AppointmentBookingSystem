/* import React, { useState } from 'react'
// import {assets} from '../assets/assets'

const Login = () => {
    const [state, setState] = useState('Admin')

    // Reusable Tailwind class strings
    const inputClasses = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out";
    const buttonClasses = "w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-150 ease-in-out mt-4"; 

    return (
        <form className='min-h-screen flex items-center justify-center bg-gray-50'>
            { CRITICAL CHANGE: 
              - max-w-sm (sets a max width of 24rem/384px) 
              - mx-auto (centers the block within the flex parent)
            }
            <div className='flex flex-col gap-5 p-10 w-full max-w-sm bg-white rounded-xl shadow-2xl text-gray-700 mx-auto'>
                
                { Header }
                <p className='text-3xl font-bold text-center mb-2'>
                    <span className='text-blue-600'> {state} </span> Login
                </p>

                {Email Input Group }
                <div className='w-full'>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        className={inputClasses}
                        required 
                    />
                </div>

                {/* Password Input Group }
                <div className='w-full'>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        className={inputClasses}
                        required 
                    />
                </div>
                
                {/* Login Button }
                <button type="submit" className={buttonClasses}>
                    Login
                </button>
            </div>
        </form>
    )
}

export default Login 
*/

import React, { useState } from 'react'

const Login = () => {
  const [state, setState] = useState('Admin')

  // Reusable Tailwind class strings
  const inputClasses = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
  const buttonClasses = "w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-150 ease-in-out mt-4"

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {state} Login
        </h1>

        <div className="bg-white p-8 rounded-lg shadow-lg">
          <input
            type="email"
            placeholder="Email"
            className={inputClasses}
          />

          <input
            type="password"
            placeholder="Password"
            className={inputClasses + " mt-4"}
          />

          <button className={buttonClasses}>
            Login
          </button>

          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{' '}
            <button
              onClick={() => setState(state === 'Admin' ? 'Doctor' : 'Admin')}
              className="text-blue-600 hover:underline font-semibold"
            >
              Switch to {state === 'Admin' ? 'Doctor' : 'Admin'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login