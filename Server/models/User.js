const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const saltRounds = 10;

const { urlencoded } = require("body-parser");
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        maxlength: 50,
    },
    lastName:{
        type: String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        minlength:5
    },
    institution : {
        type:String
    },
    role:{
        type: Number,
        default:0
    },
    image:String,
    token:{//토큰을 이용해서 유효성 관리
        type:String
    },
    tokenExp:{
        type:Number
    }
})

userSchema.pre('save',function(next){//여긴 왜 화살표 함수가 안되는지 의문점...

    let user = this;    
    if(user.isModified('password')){//0. Password가 변환될 때만 변경해 준다.
        console.log("isModified:password")
        //1. 비밀 번호를 암호화 시킨다.
        bcrypt.genSalt(saltRounds,(err,salt)=>{
            if(err) return next(err);
            
            bcrypt.hash(this.password,salt,(err,encrypted)=>{
                if(err) 
                {
                    console.log(err);
                    return next(err);
                }
                console.log(encrypted);
                user.password = encrypted;
                next();
            })
            
        })
    }else{
        next();
    }
})//mongoose method, 저장하기 전에 진행

userSchema.method('comparePassword',function(plainPassword, callback){
    bcrypt.compare(plainPassword,this.password,function(err,isMatched){
        if(err) return callback(err);
        callback(null,isMatched);
    })
});

userSchema.method('generateToken',function(callback){
    let user = this;
    user.token = jwt.sign(user._id.toHexString(),'secretToken'
    // ,{},function(err, decoded){
    //     if(err) {
    //         console.log("Error failed: " + err);
    //         return;
    //     }
    //     console.log("decoded");
    //     console.log(decoded);
    //     }
        );
    user.save(function(err,user){
        if(err)callback(err);
        callback(null,user);
    })
});
userSchema.statics.findByToken =function(token, callback){
    var user = this;

    //Decode token here
    jwt.verify(token, 'secretToken',function(err,decoded){
        if (err) return callback(err);
        //User를 찾은 후 db상의 token과 현재 token이 일치하는지 확인
        user.findOne({"_id":decoded,"token":token},function(err,user){
            if(err)return callback(err);
            callback(null,user);
        })
    })
}

// userSchema.method('findByToken',function(token, callback){
//     var user = this;

//     //Decode token here
//     jwt.verify(token, 'secretToken',function(err,decoded){
//         if (err) return callback(err);
//         //User를 찾은 후 db상의 token과 현재 token이 일치하는지 확인
//         user.findOne({"_id":decoded,"token":token},function(err,user){
//             if(err)return callback(err);
//             callback(null,user);
//         })
//     })
// });
const User = mongoose.model('User',userSchema);

module.exports= User;