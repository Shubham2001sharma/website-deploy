'use client'
import React from 'react'
import { useRouter } from "next/navigation";
import { useEffect } from 'react';


function Dashbaord() {
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/adminSigninForm"); // Redirect to sign-in if token is not present
        }
      }, [router]);

      const Logout=()=>{
        localStorage.clear();
        router.push('/adminSigninForm');
      }
    
  return (
    <>
        <div>Dashbaord</div>
        <button onClick={Logout}>LOGOUT</button>

    </>
    
  )
}

export default Dashbaord