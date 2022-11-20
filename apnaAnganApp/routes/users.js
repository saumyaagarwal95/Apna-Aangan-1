// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;
var express = require('express');
const User = require('../models/user');
// const BBID = require('../models/BBid');
var app = require('../app');
var router = express.Router();

/* GET users listing. */
router.get('/all', function(req, res, next) {
  User.getAllUsers((err,users)=>{
    if(err){
      res.json({success: false,msg:'Failed'});
    } else{
      res.json({success:true,msg:'Downloaded',users:users});
    }
  });
});

// POST: handle SignUp Logic
router.post('/register',(req,res,next)=>{
  let newUser=new User({
    email:req.body.email,
    username:req.body.username,
    password:req.body.password,
    degree:req.body.degree
  });
  
  // BBID.getBBidByid(newUser.BBid,(err,foundBBid)=>{
  //   if(err) throw err;
  //   if(!foundBBid){
  //     return res.json({success: false, msg:'BBid not exist..'});
  //   }
    User.getUserByEmail(newUser.email,(err,foundemail)=>{
      if(err) throw err;
      if(foundemail){
        return res.json({success: false, msg:'Email already exist'});
      }
      User.getUserByUserName(newUser.username,(err,founduser)=>{
        if(err) throw err;
        if(founduser){
          return res.json({success: false, msg:'User already exist'});
        }
        User.addUser(newUser,(err,user)=>{
          if(err){
            res.json({success:false,msg:err});
          }else{
          res.json({
            success:true,
            msg:'User registered..Your User id is - '+user.username,
            user_API:user.username
          });
        }
      });
    }); 
  });
});
  
// });

// POST: handle Log In logic
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUserName(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: 'User not found' });
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        res.json({
          success: true,
          user: {
            username: user.username,
            email:user.email
          },
          msg: 'Logged in'
        });
      } else {
        return res.json({ success: false, msg: 'Wrong password' });
      }
    });
  });
});

//GET: Log Out
router.get("/logout",(req,res)=>{
  
})
module.exports = router;