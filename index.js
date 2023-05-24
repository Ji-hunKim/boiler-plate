const express = require('express')
const app = express()
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://okol4561:okpo0513@first.2owuq.mongodb.net/?retryWrites=true&w=majority', {}).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))

const  { User } = require("./models/User");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register', (req,res) => {
  const user = new User(req.body);
  user.save((err, userInfo)=>{
    if(err) return res.json({ success: false, err})
    else res.status(200).json({ success: true })
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})