import mongoose from "mongoose";
export const dbConnect = async ()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("db connected");

    }
    catch(e){
        throw new Error ("something went wrong while connecting to db");
    }
}