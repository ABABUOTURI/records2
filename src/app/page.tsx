// src/app/page.tsx
import React from "react";
// import SigninPage from "@/pages/SigninPage";
 import Employee from "@/models/Employee";
 import Sidebar from "@/components/Sidebar";
 import Header from "@/components/Header";

export default function Home() {
  return (
    // < SigninPage />
    <div className="flex">
       <Sidebar /> 
       {/* < SignupPage />; */}
        <div className="flex-1">
         <Header />
         <main className="p-8">
           <Employee />
         </main>
       </div> 
     </div>
  );
}
