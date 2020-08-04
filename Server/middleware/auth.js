const User = require('../models/User')
let auth = (req,res,next)=>{
    //authentication here.

    //1. get token from client cookie

    let token = req.cookies.x_auth;
    //2. Decript token and get user
    User.findByToken(token,function(err,user){
        if(err)throw err;
        if(!user) return res.json({isAuth:false,error:true})
        req.token = token;// Middleware 다음에 실행되는곳에서 req.token, req.user를 사용할 수 있도록 넣어줌
        req.user = user; //
        next();
    })
    //3. if user is in DB, auth okay

    //
}

module.exports = auth;