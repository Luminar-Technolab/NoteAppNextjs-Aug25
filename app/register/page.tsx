"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register(){
const router = useRouter()
  const [name,setname] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  

  const handleRegister = async (e:any)=>{
    e.preventDefault()
    if(!name || !email || !password){
      alert("Fill the form completely!!!")
    }else{
      //api call
      const userDetails = {name,email,password}
      const res = await fetch('/api/register',{
        method:"POST",
        body:JSON.stringify(userDetails)
      })
      if(res.status==201){
        alert("User added successfully")
        setname("")
        setEmail("")
        setPassword("")
        router.push('/')
      }else if(res.status==409){
        const data = await res.json()
       alert(data.message);
        router.push('/')
      }
      }
  }
     return (
  <main className="min-h-100 flex justify-center items-center flex-col">
    <h1 className="text-4xl text-blue-500">Register</h1>
    <form onSubmit={handleRegister} className="p-6 space-y-6 w-100 rounded mt-10 shadow">
        <input value={name} onChange={e=>setname(e.target.value)} type="text" placeholder="Name" className="border  border-gray-300 p-2 w-full" />
      <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="Email" className="border  border-gray-300 p-2 w-full" />
      <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" className="border  border-gray-300 p-2 w-full" />
    <button type="submit" className="bg-blue-500 text-white px-4 py-2">Register</button>
    <span className="ml-2">Already A User ? Click here to <Link href="/" className="text-blue-500 underline">Login</Link></span>
    </form>
  </main>
 
 )
}