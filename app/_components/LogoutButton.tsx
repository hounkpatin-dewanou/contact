"use client"
import React from 'react'
import { logoutAction } from '../actions/auth';
import { redirect, useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();
  const handlelogout = async () => {
    try {
        await logoutAction();
        //The redirect happens in the server action
        //The client-side redirect is a fallback
        //redirect("/login");
        router.push("/login");
        router.refresh();
    } catch (error) {
      console.log('Logout failed: ', error)
    }
  }
  return (
     <button 
      onClick={handlelogout} 
      className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors cursor-pointer'>
        Logout
      </button>
  )
}

export default LogoutButton