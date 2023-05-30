const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds =  10;

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        maxlength: 5
    },
    lastname: {
        type: String,
        maxlength: 50
    },
    role: {
        type: Number,
        default: 0
    },
    image: String,
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
})

userSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')){
// 비밀번호 암호화
    // salt 생성
    bcrypt.genSalt(saltRounds, function(err,salt){
        if(err) return next(err)
        
        //비밀번호 생성됐다면
        bcrypt.hash(user.password, salt, function(err,hash){
            if(err) return next(err)

            //암호화 성공되면 hash된 비밀번호로 변경
            user.password = hash
            next()
        })
    })
    }
    

})

const User = mongoose.model('User', userSchema)
module.exports = { User }