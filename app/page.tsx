"use client"

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";


export default function Home() {

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const handleLogin = async (e:any)=>{
    e.preventDefault()
    await signIn("credentials",{
      email,password, callbackUrl:'/dashboard'
    })
  }
 return (
  <main className="min-h-100 flex justify-center items-center flex-col">
    <h1 className="text-4xl text-blue-500">Login</h1>
    <form onSubmit={handleLogin} className="p-6 space-y-6 w-100 rounded mt-10 shadow">
    <input value={email} onChange={e=>setEmail(e.target.value)}  type="email" placeholder="Email" className="border  border-gray-300 p-2 w-full" />
    <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="border  border-gray-300 p-2 w-full" />
    <button type="submit" className="bg-blue-500 text-white px-4 py-2">Login</button>
    <span className="ml-6">New User ? Click here to <Link href="/register" className="text-blue-500 underline">Register</Link></span>
    </form>
  </main>
 
 )
}
