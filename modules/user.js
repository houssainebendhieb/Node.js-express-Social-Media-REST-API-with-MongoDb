const mongoose=require('mongoose');

const user=mongoose.model('user',{

    username:{
        type:String,
        require:true
        ,min:3,
        max:20,
        unique:true
    },
    email:{
        type:String,
        require:true,
        max:49,
        unique:true
    },
    password: {
        type:String,
        require:true,
        min:5,
        
    },
    profilePicture:{
        type:String
        ,default:""
    
    },
    coverPicture:{
        type:String
        ,default:""
    },
    followers:{
        type:Array
        ,default:[]
    },
    following:{
        type:Array
        ,default:[]
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    desc:{
        type:String,
        max:50
    },
    city:{
        type:String,max:50
    },
    from:{
        type:String,
        max:50
    },
    relationship:{
        type:Number,
        enum:[1,2,3]
    }


});

module.exports=user;