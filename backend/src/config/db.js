import mongoose from "mongoose";


export const connectDB = async () =>{
    try {
        const db = await mongoose.connect(process.env.MONGO_URL)

    } catch (error) {
        console.error( "Database does not connected: ", error )
    }
}