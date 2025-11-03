const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const cors=require('cors');
const app=express();
const connectTodb=require('./db/db.js');
app.use(cors());

connectTodb();
app.get('/home',(req,res)=>{
    res.send("hii");
});


module.exports=app;
