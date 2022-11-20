var express = require('express');
const Course = require('../models/course');
// const BBID = require('../models/BBid');
var app = require('../app');
var router = express.Router();

/* GET users listing. */
router.get('/all', function(req, res, next) {
    Course.getAllCourses((err,courses)=>{
    if(err){
      res.json({success: false,msg:'Failed'});
    } else{
      res.json({success:true,msg:'Downloaded',courses:courses});
    }
  });
});

router.get('/bySkill', function(req, res, next) {
    Course.getCourseByskill(req.body.skillTaught,(err,courses)=>{
    if(err) throw err;
      if(courses){
        return res.json({success: false, courses:courses});
      }
  });
});

router.get('/byLocation', function(req, res, next) {
    Course.getCourseByLocation(req.body.location,(err,courses)=>{
    if(err) throw err;
      if(courses){
        return res.json({success: false, courses:courses});
      }
  });
});

router.get('/byCourseId', function(req, res, next) {
    Course.getCourseById(req.body.courseId,(err,courses)=>{
    if(err) throw err;
      if(courses){
        return res.json({success: false, courses:courses});
      }
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
  
//   Course.getCourseById(newCourse.courseId,(err,foundCourseId)=>{
//     if(err) throw err;
//     if(!foundCourseId){
//       return res.json({success: false, msg:'CourseId doesnot exist..'});
//     }
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
// });
  


// Authenticate
// router.post('/authenticate', (req, res, next) => {
//   const username = req.body.username;
//   const password = req.body.password;

//   User.getUserByUserName(username, (err, user) => {
//     if (err) throw err;
//     if (!user) {
//       return res.json({ success: false, msg: 'User not found' });
//     }
//     User.comparePassword(password, user.password, (err, isMatch) => {
//       if (err) throw err;
//       if (isMatch) {
//         res.json({
//           success: true,
//           user: {
//             username: user.username,
//             email:user.email
//           },
//           msg: 'Logged in'
//         });
//       } else {
//         return res.json({ success: false, msg: 'Wrong password' });
//       }
//     });
//   });
// });

module.exports = router;