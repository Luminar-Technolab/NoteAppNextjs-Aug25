"use client"

import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

interface Note{
  _id:string,
  title:string,
  description:string
}

export default function Notes(props:any){
  console.log(props.loginSession);
  const loginUser = props.loginSession
    const [allNotes,setAllNotes] = useState<Note[]>([])
      const [title,setTitle] = useState("")
      const [description,setDescription] = useState("")
      const [updateClickStatus,setUpdateClickStatus] = useState(false)
      const [updateNoteId,setUpdateNoteId] = useState("")
 
  useEffect(()=>{
    fetchNotes()
  },[])

  const fetchNotes = async ()=>{
    const res = await fetch('/api/notes')
    setAllNotes(await res.json())
   
  }

  const addNote = async ()=>{
    if(!title || !description){
      alert("Fill the form completely!!!")
    }else{
      //api call
      const noteDetails = {title,description}
      const res = await fetch('/api/notes',{
        method:"POST",
        body:JSON.stringify(noteDetails)
      })
      if(res.status==201){
        alert("Note added successfully")
        setTitle("")
        setDescription("")
        fetchNotes()
      }
      }
  }

  const viewNote = async (id:string)=>{
    const res = await fetch(`/api/notes/${id}`)
    const noteDetails = await res.json()
    setTitle(noteDetails.title)
    setDescription(noteDetails.description)
    setUpdateClickStatus(true)
    setUpdateNoteId(id)
  }

  const updateNote = async ()=>{
     if(!title || !description){
      alert("Fill the form completely!!!")
    }else{
      //api call
      const noteDetails = {title,description}
      const res = await fetch(`/api/notes/${updateNoteId}`,{
        method:"PUT",
        body:JSON.stringify(noteDetails)
      })
       alert("Note updated successfully")
        setTitle("")
        setDescription("")
        setUpdateClickStatus(false)
        fetchNotes()
      }
  }

  const removeNote = async (id:string)=>{
    const res = await fetch(`/api/notes/${id}`,{
      method:"DELETE"
    })
    const noteDetails = await res.json()
    alert("Note removed!!!")
    fetchNotes()
  }


  return (
    <main className="min-h-screen bg-gray-100 p-10">
      <div className="flex justify-between items-center m-5">
              <h1 className="text-3xl text-blue-500">Welcome {loginUser.user?.name}</h1>
              <button onClick={()=>signOut({callbackUrl:'/'})} className="bg-amber-500 text-white px-4 py-2 rounded">Logout</button>
            </div>
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl text-blue-600 font-bold mb-4 text-center">Note Manager</h1>
        <input value={title} onChange={e=>setTitle(e.target.value)} className="border p-2 w-full border-gray-200 mb-2 " placeholder="Title" type="text" />
        <textarea value={description} onChange={e=>setDescription(e.target.value)} className="border p-2 w-full border-gray-200 mb-2" placeholder="Description"  />
        {
          updateClickStatus ?
          <button onClick={updateNote}  className="bg-orange-500 text-white px-4 py-2 rounded">Update NOTE</button>
          :
          <button onClick={addNote} className="bg-green-500 text-white px-4 py-2 rounded">ADD NOTE</button>
        }
        <div className="mt-6 space-y-6">
          {/* notes tobe duplicated */}
          {
            allNotes?.length>0 ?
              allNotes?.map((note:Note)=>(
                <div key={note?._id} className="border border-gray-300 p-3 rounded">
                  <h3 className="font-semibold">{note?.title}</h3>
                  <p className="text-sm text-gray-600">{note?.description}</p>
                  <button onClick={()=>viewNote(note?._id)} className="text-orange-600 text-sm mt-2 me-5">Update</button>
                  <button onClick={()=>removeNote(note?._id)} className="text-red-600 text-sm mt-2">Delete</button>
                </div>
              ))
            :
            <p>Nothing to display...</p>
          }
        </div>
      </div>
    </main>
  );
}