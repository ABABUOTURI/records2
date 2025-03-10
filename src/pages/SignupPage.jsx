"use client"; // Ensures this is a Client Component

import React, { useState, useEffect } from "react"; 
import { FaUser, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/globals.css"; 
import { useRouter } from "next/navigation"; 

const SignupPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const images = ["/assets/A1.jpg", "/assets/A2.jpg", "/assets/A3.jpg", "/assets/A4.jpg"];
  const [currentImage, setCurrentImage] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);


  //  submit data to a signup API
  // const handleSignup = async () => {
  //   const res = await fetch("/api/auth/signup", {
  //     method: "POST",
  //     body: JSON.stringify({ firstName, lastName, email, password }),
  //     headers: { "Content-Type": "application/json" },
  //   });
  
  //   if (res.ok) {
  //     router.push("/SigninPage");
  //   } else {
  //     alert("Signup failed!");
  //   }
  // };
  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill all fields");
      return;
    }
  
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        body: JSON.stringify({ firstName, lastName, email, password }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (res.ok) {
        router.push("/SigninPage");
      } else {
        const errorData = await res.json();
        alert(errorData.message || "Signup failed!");
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="flex max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Section */}
        <div
          className="relative w-1/2 hidden md:flex items-center justify-center text-white p-8 bg-cover bg-center transition-opacity duration-1000"
          style={{ backgroundImage: `url(${images[currentImage]})` }}
        >
          <div className="absolute inset-0  bg-opacity-30"></div>
          <div className="relative text-center w-full p-4 bg-opacity-20 backdrop-blur-sm rounded-md">
            <h2 className="text-xl font-bold text-white">No Hassles</h2>
            <p className="mt-2 text-white">
              Together, we rise—just like our bread. At Josh Bakery Ventures, we value teamwork, passion, and excellence in every task.
            </p>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800">Create your free account</h2>
          <p className="text-gray-500 text-sm mt-1">
            Already registered? {" "}
            <a onClick={() => router.push("/SigninPage")} className="text-green-500 cursor-pointer">Sign in</a>
          </p>
          
          {/* Signup Form */}
          <div className="mt-6">
          <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      {/* Name Fields */}
      <div className="flex gap-4">
        {[
          { label: "First Name", value: firstName, setter: setFirstName },
          { label: "Last Name", value: lastName, setter: setLastName },
        ].map(({ label, value, setter }, index) => (
          <div key={index} className="w-1/2 relative">
            <label className="text-gray-600">{label}</label>
            <div className="relative">
              <input
                type="text"
                placeholder={label}
                className="input-field pl-10"
                value={value}
                onChange={(e) => setter(e.target.value)}
              />
              <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
            </div>
          </div>
        ))}
      </div>

      {/* Email Field */}
      <div className="mt-4 relative">
        <label className="text-gray-600">Email</label>
        <div className="relative">
          <input
            type="email"
            placeholder="joshbakery@gmail.com"
            className="input-field pl-10"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPassword ? (
            <FaEye
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <FaEyeSlash
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>
      </div>
    </div>

            {/* Continue Button */}
            <button className="btn-primary w-full mt-6" onClick={handleSignup}>
              Continue
            </button>


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
