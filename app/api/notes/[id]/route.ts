//get single note details
import { connectDB } from "@/lib/mongodb";
import notes from "@/models/notes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest,{ params }: { params: Promise<{ id: string }>}) {
    try{
        await connectDB()
        const {id} = await params
        const noteDeatils = await notes.findById({_id:id})
        // send response client
        return NextResponse.json(noteDeatils,{status:200})
    }catch(err){
        console.log(err);
        return NextResponse.json(err,{status:500})
    }
} 
//updating a note
export async function PUT(req:NextRequest,{ params }: { params: Promise<{ id: string }>}) {
    try{
        await connectDB()
        const {id} = await params
        const reqBody = await req.json()
        const updatedNoteDeatils = await notes.findByIdAndUpdate({_id:id},reqBody,{new:true})
        // send response client
        return NextResponse.json(updatedNoteDeatils,{status:200})
    }catch(err){
        console.log(err);
        return NextResponse.json(err,{status:500})
    }
} 

//delete a note
export async function DELETE(req:NextRequest,{ params }: { params: Promise<{ id: string }>}) {
    try{
        await connectDB()
        const {id} = await params
        const removeNoteDeatils = await notes.findByIdAndDelete({_id:id})
        // send response client
        return NextResponse.json(removeNoteDeatils,{status:200})
    }catch(err){
        console.log(err);
        return NextResponse.json(err,{status:500})
    }
} 