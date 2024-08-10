import mongoose from "mongoose";

export const connection =()=>{
    mongoose.connect(process.env.MONGO_URI,
        {
            dbName:"JOB_PORTAL"
        }
    ).then(()=>{
        console.log("connected to database")
    }).catch((error) => {
        console.error(`Error connecting to database:${error}`)
    })
}