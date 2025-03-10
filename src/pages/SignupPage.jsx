"use client"; // ✅ Ensures this is a Client Component

import React, { useState } from "react";
import { FaUser, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/globals.css"; // Import global styles
import Image from "next/image";
import {  useEffect } from "react";
import { useRouter } from "next/router";

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const images = ["/assets/A1.jpg", "/assets/A2.jpg", "/assets/A3.jpg", "/assets/A4.jpg"];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="flex max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Left Section - Image and Info */}
        <div
      className="w-1/2 relative hidden md:flex items-center justify-center text-white p-8 bg-cover bg-center transition-opacity duration-1000"
      style={{ backgroundImage: `url(${images[currentImage]})` }}
    >
      <div className="absolute inset-0  bg-opacity-30 "></div>
      <div className="absolute bottom-4 text-center w-full p-4  bg-opacity-20 backdrop-blur-sm rounded-md">
        <h2 className="text-xl font-bold text-white">No Hassles</h2>
        <p className="mt-2 text-black">
        Together, we rise—just like our bread. At Josh Bakery Ventures, we value teamwork, passion, and excellence in every task.
        </p>
      </div>
    </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800">Create your free account</h2>
          {/* <p className="text-gray-500 text-sm mt-1">
            Already registered? <a href="#" className="text-green-500">Sign in</a>
          </p> */}
           <p className="text-gray-500 text-sm mt-1">
           Already registered?{" "}
      <a
        onClick={() => router.push("/SigninPage")}
        className="text-green-500 cursor-pointer"
      >
        Create an account
      </a>
    </p>

          <div className="mt-6">
            {/* First Name & Last Name */}
            <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Name Fields */}
      <div className="flex gap-4">
        {/* First Name */}
        <div className="w-1/2 relative">
          <label className="text-gray-600">First Name</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Joshua"
              className="input-field pl-10"
            />
            <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
          </div>
        </div>
        
        {/* Last Name */}
        <div className="w-1/2 relative">
          <label className="text-gray-600">Last Name</label>
          <div className="relative">
            <input
              type="text"
              placeholder="Bakare"
              className="input-field pl-10"
            />
            <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
          </div>
        </div>
      </div>

      {/* Email Field */}
      <div className="mt-4 relative">
        <label className="text-gray-600">Email</label>
        <div className="relative">
          <input
            type="email"
            placeholder="joshbakery@gmail.com"
            className="input-field pl-10"
          />
          <FaEnvelope className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
        </div>
      </div>

      {/* Password Field */}
      <div className="mt-4 relative">
        <label className="text-gray-600">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="**********"
            className="input-field pl-10 pr-10"
          />
          <FaEyeSlash
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg cursor-pointer ${
              showPassword ? "hidden" : "block"
            }`}
            onClick={() => setShowPassword(true)}
          />
          <FaEye
            className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg cursor-pointer ${
              showPassword ? "block" : "hidden"
            }`}
            onClick={() => setShowPassword(false)}
          />
        </div>
      </div>
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
