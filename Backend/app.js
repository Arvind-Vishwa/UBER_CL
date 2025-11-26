const dotenv=require('dotenv');
dotenv.config();
const express=require('express');
const cors=require('cors');
const cookieParser=require('cookie-parser');
const app=express();
const connectTodb=require('./db/db.js');
const userRoutes=require('./routes/user.routes.js');
connectTodb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser);

app.get('/home',(req,res)=>{
    res.send("hii");
});

app.use('/users',userRoutes);


module.exports=app;
