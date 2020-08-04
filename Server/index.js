const express = require("express")
const app = express();
const MongoDBManager = require("./models/MongoDB")

const port = 5000
const User = require("./models/User");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth')

const mongodb = new MongoDBManager();
mongodb.connect();


//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
//application/json
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req,res)=> res.send("Hello JBoilerPlate!"));


//화원 가입을 위한 router
app.post("/api/v1/users/register",(req,res)=>{    
    //회원가입시 필요한 정보를 client에서 가져와서 DB에 넣어주기
    const user = new User(req.body);
    
    user.save((err,userInfo)=>{
        if(err) return res.json({success:false, err})
        return res.status(200).json({
            success:true
        });
    })
})


app.post('/api/v1/users/login',(req,res)=>{

    //1.DB에서 email 찾기
    User.findOne({email:req.body.email},function(err,user){
        if(!user){
            return res.json({
                loginSuccess:false,
                message:"no user"
            })
        }
    
        console.log(user);
        //2. 비밀번호 비교하기
        user.comparePassword(req.body.password,(err,isMatched)=>{
            if(!isMatched){
                return res.json({
                    loginSuccess:false,
                    message:"invalid password"
                })
            }
            else{
    //3. 비밀번호가 맞다면 token 생성
                user.generateToken((err,user)=>{
                    if(err) res.status(400).send(err);
                    //토큰을 쿠키에 저장
                    res.cookie("x_auth", user.token).status(200).json({loginSuccess:true,userId:user._id});
                })
            }
        })
    })

});


app.get('/api/v1/users/auth', auth, (req,res)=>{ //auth --> middleware

    res.status(200).json({
        _id:req.user._id,
        isAdmin:req.user.role === 0 ? true : false,
        isAuth:true,
        institution:req.user.institution,
        email:req.user.email,
        firstname:req.user.firstname,
        lastname:req.user.lastname,
        image:req.user.image
    })
})


app.get('/api/v1/users/logout',auth,(req,res)=>{
    console.log("logout request");
    User.findOneAndUpdate({_id: req.user._id},{token:""},(err,user)=>{
        if(err) return res.json({success:false,err});
        return res.status(200).send({
            success:true
        })
    })
})

app.get('/api/test/CORP',(req,res)=>{
    res.send("api/test/corp TEST")
})

app.listen(port,()=>console.log("Started"));