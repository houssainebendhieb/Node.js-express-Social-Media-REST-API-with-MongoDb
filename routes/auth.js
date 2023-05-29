const express=require('express');
const router=express.Router();
const User=require('../modules/user');
const bcrypt=require('bcrypt');

//router.use(express.json());

router.post('/register',async(req,res)=>{
   
    const salt=await bcrypt.genSalt(10);
    const hashpassword=await bcrypt.hash(req.body.password,salt);
    const newUser=new User({
        username:req.body.username,
        email:req.body.email,
        password:hashpassword
    });
    try{

        const user=await newUser.save();
        res.status(200).send(user);

    }catch(err)
    {
        res.status(400).json(err);
    }

})

router.post('/login',async(req,res)=>{

   
    try{

        const user=await User.findOne({email:req.body.email});
        if(!user)
            return res.status(400).send('not found');
        const validPassword=await bcrypt.compare(req.body.password,user.password);
        if(!validPassword)
            return res.status(400).send("wrong password");
        return res.status(200).json(user);
    }catch(err)
    {
        res.status(400).json(err);
    }

})



module.exports=router;