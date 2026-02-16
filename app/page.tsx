import Link from "next/link";


export default function Home() {

 return (
  <main className="min-h-100 flex justify-center items-center flex-col">
    <h1 className="text-4xl text-blue-500">Login</h1>
    <form className="p-6 space-y-6 w-100 rounded mt-10 shadow">
    <input type="email" placeholder="Email" className="border  border-gray-300 p-2 w-full" />
    <input type="password" placeholder="Password" className="border  border-gray-300 p-2 w-full" />
    <button className="bg-blue-500 text-white px-4 py-2">Login</button>
    <span className="ml-6">New User ? Click here to <Link href="/register" className="text-blue-500 underline">Register</Link></span>
    </form>
  </main>
 
 )
}
