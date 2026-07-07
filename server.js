import express from "express";
import "dotenv/config"
const app = express();
app.listen(process.env.port | 2000 , () =>{
    console.log(`Your port is running on ${process.env.port} `);
})
