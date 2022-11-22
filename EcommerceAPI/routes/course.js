const Course = require("../models/Course");

const { verifyToken, verifyTokenAuthorisation, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE add new course to database
router.post("/",verifyTokenAndAdmin, async (req,res)=>{
    const newCourse = new Course(req.body);
    try{
        const savedCourse = await newCourse.save();
        return res.status(200).json(savedCourse);
    }catch(err){
        return res.status(500).json(err);
    }
});

//UPDATE a course in the database
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {  
    try{
        const updatedCourse = await Course.findByIdAndUpdate(
           req.params.id, 
           {
             $set: req.body
           }, 
           {new: true}
        );
        return res.status(200).json(updatedCourse);
    }catch(err){
        return res.status(500).json(err);
    }   
});

//DELETE a course from the database

router.delete("/:id", verifyTokenAndAdmin, async (req, res) =>{
    try{
        await Course.findByIdAndDelete(req.params.id)
        return res.status(200).json("Product has been deleted");
    }catch(err){
        return res.status(500).json(err);
    }
});

//GET details of a course
router.get("/find/:id",  async (req, res) =>{
    try{
        const course = await User.findById(req.params.id);
        
        res.status(200).json(course);
    }catch(err){
        return res.status(500).json(err);
    }
});

//GET ALL courses
router.get("/", async (req, res) =>{
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try{
        let courses;
        	
        if(qNew){
            courses = await Course.find().sort({createdAt : -1}).limit(1);
        }else if(qCategory){
            courses = await Course.find({categories:{
                $in: [qCategory],
            },
        });
        }else{
            courses = await Course.find();
        }
        res.status(200).json(courses);
    }catch(err){
        return res.status(500).json(err);
    }
});


module.exports = router;