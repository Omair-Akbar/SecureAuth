import mongoose from "mongoose";


export const connectDB = async ()=>{
     try {
        if(mongoose.connections && mongoose.connections[0].readyState) return
    const { connection } = await mongoose.connect(process.env.MONGO_URI as string,{dbName:"nextAuth"})
      console.log("DB connected")
    
    } catch (error) {
       return console.log(error)
    }
}