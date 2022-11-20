var express = require('express');
const Admin = require('../models/admin');
const Course = require('../models/course');
// const BBID = require('../models/BBid');
var app = require('../app');
var router = express.Router();

/* GET users listing. */
router.get('/all', function(req, res, next) {
    Admin.getAllUsers((err,admins)=>{
    if(err){
      res.json({success: false,msg:'Failed'});
    } else{
      res.json({success:true,msg:'Downloaded',admins:admins});
    }
  });
});

// POST Admin
router.post('/register',(req,res,next)=>{
  let newAdmin=new Admin({
    email:req.body.email,
    username:req.body.username,
    password:req.body.password,
    role:req.body.role
  });
  
  // BBID.getBBidByid(newUser.BBid,(err,foundBBid)=>{
  //   if(err) throw err;
  //   if(!foundBBid){
  //     return res.json({success: false, msg:'BBid not exist..'});
  //   }
  Admin.getAdminByEmail(newAdmin.email,(err,foundemail)=>{
      if(err) throw err;
      if(foundemail){
        return res.json({success: false, msg:'Email already exist'});
      }
      Admin.geAdminByUserName(newAdmin.username,(err,founduser)=>{
        if(err) throw err;
        if(founduser){
          return res.json({success: false, msg:'Admin already exist'});
        }
        Admin.addAdmin(newUser,(err,admin)=>{
          if(err){
            res.json({success:false,msg:err});
          }else{
          res.json({
            success:true,
            msg:'Admin registered..Your User id is - '+admin.username,
            user_API:user.username
          });
        }
      });
    }); 
  });
});

// POST course listing
router.post('/addCourse',(req,res,next)=>{
    let newCourse=new Course({
      courseId:req.body.courseId,
      nameOfCourse:req.body.nameOfCourse,
      description:req.body.description,
      startDate:req.body.startDate,
      endDate:req.body.endDate,
      courseFees:req.body.courseFees,
      location:req.body.location,
      skillTaught:req.body.skillTaught
    });
    
    Course.getCourseById(newCourse.courseId,(err,foundCourseId)=>{
      if(err) throw err;
      if(foundCourseId){
        return res.json({success: false, msg:'CourseId exist..'});
      }
      Course.addCourse(newCourse,(err,course)=>{
        if(err){
            res.json({success:false,msg:err});
            }else{
              res.json({
                success:true,
                msg:'course registered..Your Course id is - '+course.courseId
              });
            }
        });
    }); 
});

router.post('/addCourse',(req,res,next)=>{
    let newCourse=new Course({
        courseId:req.body.courseId,
        nameOfCourse:req.body.nameOfCourse,
        description:req.body.description,
        startDate:req.body.startDate,
        endDate:req.body.endDate,
        courseFees:req.body.courseFees,
        location:req.body.location,
        skillTaught:req.body.skillTaught
    });
        
    Course.getCourseById(newCourse.courseId,(err,foundCourseId)=>{
        if(err) throw err;
        if(foundCourseId){
           return res.json({success: false, msg:'CourseId exist..'});
        }
        Course.addCourse(newCourse,(err,course)=>{
            if(err){
                res.json({success:false,msg:err});
            }else{
                res.json({
                success:true,
                msg:'course registered..Your Course id is - '+course.courseId
              });
            }
        });
    }); 
});
    

module.exports=router;