const mongoose=require('mongoose');


const Post=mongoose.model('post',{

    userId:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        max:500
    },
    img:{
        type:String
    },
    likes:{
        type:Array,
        default:[]
    }
    

});
module.exports=Post;