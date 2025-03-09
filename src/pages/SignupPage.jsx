"use client"; // ✅ Ensures this is a Client Component

import React, { useState } from "react";
import { FaUser, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/globals.css"; // Import global styles
import Image from "next/image";


const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="flex max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Left Section - Image and Info */}
        <div className="w-1/2 relative hidden md:flex items-center justify-center bg-gray-900 text-white p-8">
          <div className="text-center">
            <img
              src="/assets/A1.jpg"
              alt="User"
              className="rounded-full w-32 h-32 mx-auto border-4 border-white"
            />
            <h2 className="mt-4 text-xl font-bold">No Hassles</h2>
            <p className="mt-2 text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
            </p>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800">Create your free account</h2>
          <p className="text-gray-500 text-sm mt-1">
            Already registered? <a href="#" className="text-green-500">Sign in</a>
          </p>

          <div className="mt-6">
            {/* First Name & Last Name */}
            <div className="flex gap-4">
              <div className="w-1/2 relative">
                <label className="text-gray-600">First Name</label>
                <input type="text" placeholder="Joshua" className="input-field" />
                <FaUser className="icon" />
              </div>
              <div className="w-1/2 relative">
                <label className="text-gray-600">Last Name</label>
                <input type="text" placeholder="Bakare" className="input-field" />
                <FaUser className="icon" />
              </div>
            </div>

            {/* Email */}
            <div className="mt-4 relative">
              <label className="text-gray-600">Email</label>
              <input type="email" placeholder="josh.bakery@gmail.com" className="input-field" />
              <FaEnvelope className="icon" />
            </div>

            {/* Password */}
            <div className="mt-4 relative">
              <label className="text-gray-600">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="**********"
                className="input-field"
              />
              {showPassword ? (
                <FaEyeSlash
                  className="icon cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <FaEye
                  className="icon cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>

            {/* Continue Button */}
            <button className="btn-primary w-full mt-6">Continue</button>

            {/* Terms and Policy */}
            <p className="text-xs text-gray-500 mt-4 text-center">
              By signing up, you agree to our <a href="#" className="text-green-500">Terms</a> and <a href="#" className="text-green-500">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
