const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    maxlength: 90,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
});

userSchema.pre("save", function (next) {
  var user = this;

  // 비밀번호를 변경할때만
  if (user.isModified("password")) {
    // 비밀번호 암호화
    // salt 생성
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      //비밀번호 생성됐다면
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);

        //암호화 성공되면 hash된 비밀번호로 변경
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparePassword = function (plainPassword, cb) {
  // 비밀번호 비교
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    //에러는 없고 맞으면 isMatch true
    cb(null, isMatch);
  });
};

userSchema.methods.generateToken = function (cb) {
  var user = this;

  var token = jwt.sign(user._id.toHexString(), "secretToken");
  user.token = token;
  /*
  user.save(function (err, user) {
    if (err) return cb(err);
    cb;
  });
  */
  user
    .save()
    .then((user) => {
      cb(null, user);
    })
    .catch((err) => {
      return cb(err);
    });
};

const User = mongoose.model("User", userSchema);
module.exports = { User };