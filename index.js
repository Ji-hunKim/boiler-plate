const express = require("express");
const app = express();
const port = 3000;

const config = require("./config/key");

const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {})
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

const { User } = require("./models/User");
const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");

const { auth } = require("./middleware/auth");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/users/register", (req, res) => {
  //회원가입할 때 필요한 정보들을 client에서 가져오면,
  //그 정보들을 DB에 넣어준다.
  const user = new User(req.body);
  //user모델에 정보가 저장됨
  //실패 시, 실패한 정보를 보내줌
  user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      return res.json({ success: false, err });
    });
});

// mongo db doesn't support cb function in 'findone'
/*
app.post("/login", (req, res) => {
  // 요청된 이메일을 데이터베이스에 있는지 찾는다
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!userInfo) {
      return res.json({
        loginSuccess: false,
        message: "없는 아이디입니다.",
      });
    }

    // 요청된 이메일이 데이터베이스에 있다면, 비밀번호가 일치하는지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      // 비밀번호까지 맞다면 토큰 생성하기
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 쿠키에 토큰 저장
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});
*/

app.post("/api/users/login", (req, res) => {
  // 요청된 이메일을 데이터베이스에 있는지 찾는다
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.json({
          loginSuccess: false,
          message: "없는 아이디입니다.",
        });
      }

      // 요청된 이메일이 데이터베이스에 있다면, 비밀번호가 일치하는지 확인
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (!isMatch)
          return res.json({
            loginSuccess: false,
            message: "비밀번호가 틀렸습니다.",
          });
        // 비밀번호까지 맞다면 토큰 생성하기
        user.generateToken((err, user) => {
          if (err) return res.status(400).send(err);
          // 쿠키에 토큰 저장
          res
            .cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id });
        });
      });
    })
    .catch((err) => {
      return res.status(400).send(err);
    });
});

app.get("/api/users/auth", auth, (req, res) => {
  // 여기 왔다는 건 auth 통과했다는 의미
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" })
    .then((user) => {
      return res.status(200).send({ success: true });
    })
    .catch((err) => {
      return res.json({ success: false, err });
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
