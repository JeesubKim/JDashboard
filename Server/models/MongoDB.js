const mongoose = require('mongoose');
const config = require('../config/key');
const UserSchema = require('./User');
class MongoDBManager{

    constructor(){
        this.db = mongoose.connection;
        this.db.on('error',console.error);
        this.db.once('open',()=>{
            console.log("mongodb connected");
            
        })
    }

    connect(){
        
        mongoose.connect(config.mongoDBPath,{ useNewUrlParser: true,  useUnifiedTopology: true ,useCreateIndex:true,useFindAndModify:false});
    }
    find(keyword,callback){
        console.log("find");
        return UserSchema.find(keyword);

    }
}

module.exports = MongoDBManager;