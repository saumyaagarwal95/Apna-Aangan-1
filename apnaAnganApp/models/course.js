const mongoose = require('mongoose');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

// User Schema--------------
const CourseSchema=mongoose.Schema({
    courseId:{
        type:String,
        required:true,
    },
    nameOfCourse:{
        type:String,
        required:true
    },
     description:{
        type:String,
        required:true
    },
     startDate:{
        type:Date,
        required:true
    },
     endDate:{
        type:Date,
        required:true
     },
     courseFees:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
        required:true
    },
    skillTaught:{
        type:String,
        required:true
    }
});

const Course=module.exports=mongoose.model('Course',CourseSchema);

module.exports.getAllCourses=function(callback){
    Course.find(callback);
}

module.exports.getCourseById=function(courseId,callback){
    const query={courseId:courseId}
    Course.findOne(query,callback);
}

module.exports.getCourseByskill=function(skillTaught,callback){
    const query={skillTaught:skillTaught}
    Course.find(query,callback);
}

module.exports.getCourseByLocation=function(location,callback){
    const query={location:location}
    Course.find(query,callback);
}

module.exports.addCourse=function(newCourse,callback){
    newCourse.save(callback);
        }

// module.exports.comparePassword = function(candidatePassword, hash, callback){
//     bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
//       if(err) throw err;
//       callback(null, isMatch);
//     });
// }