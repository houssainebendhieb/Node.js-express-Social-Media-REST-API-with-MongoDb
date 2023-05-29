const express=require('express');
const app=express();
const dotenv=require('dotenv');
const userRoute=require('./routes/users');
const authRoute=require('./routes/auth');
const postRoute=require('./routes/posts');
//connexion datebase 
require('./config');


//use middleware

app.use(express.json());


app.use('/api/users',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/posts',postRoute);


app.listen(3000,()=>{
    console.log(`hello we are in port `)
});