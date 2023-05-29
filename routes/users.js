const express=require('express');
const router=express.Router();
const User=require('../modules/user');
const bcyrpt=require('bcrypt');
//update user
router.put('/:id',async(req,res)=>{

    try{
        if(req.body.userId===req.params.id|| req.user.isAdmin){

            if(req.body.password){
                try{
                    const salt=await bcyrpt.genSalt(10);
                    req.body.password=await bcyrpt.hash(req.body.password,salt);

                }catch(err)
                {
                    res.json(err).status(400);
                }
            }
            try{
                const user=await User.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                });
                res.status(200).json("Account has been update");
            } catch(err)
            {
                res.json(err);
            }


        }else{
            return res.status(400).json("you can update only your account !")
        }
    }catch(err)
    {
        res.json(err).status(400);
    }
})



//get a user
router.get('/:id',async(req,res)=>{

    try{

        const user=await User.findById(req.params.id);
        res.status(200).json(user);

    }catch(err)
    {
        res.json(err).status(400);
    }




})



//delete user


router.delete('/:id',async(req,res)=>{

    try{
        if(req.body.userId===req.params.id|| req.body.isAdmin){

            try{
                const user=await User.findByIdAndDelete({_id:req.params.id});
                
                res.status(200).json("Account has been deleted");
            } catch(err)
            {
                res.json(err);
            }


        }else{
            return res.status(400).json("you can delete only your account !")
        }
    }catch(err)
    {
        res.json(err).status(400);
    }
})

//follow user

router.put("/:id/follow",async(req,res)=>{

   
    if(req.body.userId!==req.params.id)
    {
        try{
            
            const user=await User.findById({_id:req.params.id});
            const currentUser=await User.findById({_id:req.body.userId});
            console.log('hll')
            if(!user.followers.includes(req.body.userId))
            {
                    await user.updateOne({$push:{followers:req.body.userId}})
                    await currentUser.updateOne({$push:{following:req.params.id}});
                    return res.status(200).json('uses has been followed');
                    
            }else{
                res.status(403).json('you already follow this user');
            }
        }catch(err)
        {
            res.status(400).json(err);
        }

    }else{
        res.status(400).json("you can't follow yourself");
    }





})

//unfollow user



router.put("/:id/unfollow",async(req,res)=>{

   
    if(req.body.userId!==req.params.id)
    {
        try{
            
            const user=await User.findById({_id:req.params.id});
            const currentUser=await User.findById({_id:req.body.userId});
            if(user.followers.includes(req.body.userId))
            {
                    await user.updateOne({$pull:{followers:req.body.userId}})
                    await currentUser.updateOne({$pull:{following:req.params.id}});
                    return res.status(200).json('uses has been unfollowed');
                    
            }else{
                res.status(403).json("you already don't follow this user");
            }
        }catch(err)
        {
            res.status(400).json(err);
        }

    }else{
        res.status(400).json("you can't unfollow yourself");
    }





})


module.exports=router;