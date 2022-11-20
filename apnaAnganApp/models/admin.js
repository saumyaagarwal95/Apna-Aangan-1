const mongoose = require('mongoose');
const config = require('../config/database');
const bcrypt = require('bcryptjs');
// const Course = require('../models/course');

// User Schema--------------
const AdminSchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
     username:{
        type:String,
        required:true
    },
     password:{
        type:String,
        default:'password'
    },
    role:{
        type:String,
        required:true,
        enum:["Admin", "Seller", "Student", "Buyer", "Teacher"]
    }
});

const Admin=module.exports=mongoose.model('Admin',AdminSchema);
// const Course=module.exports=mongoose.model('Course',CourseSchema);

module.exports.getAllAdmins=function(callback){
    Admin.find(callback);
}

module.exports.getAdminByEmail=function(email,callback){
    const query={email:email}
    User.findOne(query,callback);
}

module.exports.geAdminByUserName=function(username,callback){
    const query={username:username}
    User.findOne(query,callback);
}

module.exports.addAdmin=function(newAdmin,callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, (err, hash) => {
          if(err) throw err;
          newAdmin.password = hash;
          newAdmin.save(callback);
        });
      });
}
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
}