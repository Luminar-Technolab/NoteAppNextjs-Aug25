import { connectDB } from "@/lib/mongodb";
import users from "@/models/users";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try{
        await connectDB()
        const {name,email,password} = await req.json()
        const existingUser = await users.findOne({email})
        if(existingUser){
            return NextResponse.json({message:"User Already Exist!!! Please Login..."},{status:409})
        }else{
            const encryptPassword = await bcrypt.hash(password,10)
            const newUser = await users.create({
                name,email,password:encryptPassword
            })
            // send response client
            return NextResponse.json(newUser,{status:201})
        }
        
    }catch(err){
        console.log(err);
        return NextResponse.json(err,{status:500})
    }
}