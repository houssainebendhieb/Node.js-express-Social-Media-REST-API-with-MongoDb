const router=require('express').Router();
const Post=require('../modules/post');
//create post

router.post('/',async(req,res)=>{

    try{
        const newPost=new Post(req.body);
        const result=await newPost.save();
        res.status(200).json(result);

    }catch(err)
    {
        res.json(err).status(400);
    }




})

//update post 

router.put('/:id',async(req,res)=>{

    try{
        const post=await Post.findById(req.params.id);
        if(req.body.userId===req.params.id)
        {
            const result=await post.updateOne({$set:req.body});
            return res.status(200).json("the post has been updated");

        }else{

            res.status(400).json("you cat update only your post");
        }


    }catch(err)
    {
        res.json(err).status(400);
    }




})


//deleta post



router.delete('/:id',async(req,res)=>{

    try{
        const post=await Post.findById(req.params.id);
        if(req.body.userId===req.params.id)
        {
            const result=await post.deleteOne();
            return res.status(200).json("the post has been deleted");

        }else{

            res.status(400).json("you cat delete only your post");
        }


    }catch(err)
    {
        res.json(err).status(400);
    }




})


//like post

router.put('/:id/like',async(req,res)=>{

    try{
        const post=await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){

            await post.updateOne({$push:{likes:req.body.userId}});
            res.json('post liked').status(200);
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.json('the post has been  disliked').status(200);           
        }
    }catch(err)
    {
        res.status(400).json(err);
    }





})



//get a post


router.get('/:id',async(req,res)=>{

    try{

        const post=await Post.findById(req.params.id)
        res.status(200).json(post);
    }catch(err)
    {
        res.status(400).json(err);
    }
})



//get timeline post



module.exports=router;
