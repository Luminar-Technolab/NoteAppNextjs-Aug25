import { connectDB } from "@/lib/mongodb";
import notes from "@/models/notes";
import { NextRequest, NextResponse } from "next/server";

// steps resolve add note api  - post

export async function POST(req:NextRequest) {
    try{
        await connectDB()
        const body = await req.json()
        const newNote = await notes.create(body)
        // send response client
        return NextResponse.json(newNote,{status:201})
    }catch(err){
        console.log(err);
        return NextResponse.json(err,{status:500})
    }
}
// steps resolve get all note api  - get

export async function GET() {
    try{
        await connectDB()
        const allNotes = await notes.find()
        // send response client
        return NextResponse.json(allNotes,{status:200})
    }catch(err){
        console.log(err);
        return NextResponse.json(err,{status:500})
    }
}