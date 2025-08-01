// const express= require('express');
import express from "express";
import notesRoutes from "./routes/notesRoutes.js"
import {connectDB} from "./config/db.js"
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";
import path from "path";

dotenv.config();

const app=express();
const PORT=process.env.PORT||5001;
const __dirname=path.resolve();



//middleware
if(process.env.NODE_ENV!== "production")
{
    app.use(cors(
    {
        origin:"http://localhost:5173",
    }
));
}
app.use(express.json());
app.use(rateLimiter);

// app.use((req,res,next)=>{
//     console.log(`Req method is ${req.method} and Req URL is ${req.url}`);
//     next();
// })

app.use("/api/notes",notesRoutes)
app.use(express.static(path.join(__dirname,"../frontend/vite-project/dist")));

if(process.env.NODE_ENV ==="production")
{
    app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend/vite-project","dist","index.html"))
});
}
// app.get("/api/notes",(req,res)=>{
//     res.status(200).send("you got 10 notes");
// });
// app.post("/api/notes",(req,res)=>{
//     res.status(200).json({message:"post created successfully"});
// });

// app.put("/api/notes/:id",(req,res)=>{
//     res.status(200).json({message:"post updated successfully"});
// });
// app.delete("/api/notes/:id",(req,res)=>{
//     res.status(200).json({message:"post deleted successfully"});
// });

connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log("Server started on port :", PORT);
});
});
//mongodb+srv://shifalilobo9:VccFhghpcHSPR6zp@cluster0.mr3d9by.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
