const JobPost = require("../models/JobPost");

const { verifyToken, verifyTokenAuthorisation, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE add new JobPost to database
router.post("/",verifyTokenAndAdmin, async (req,res)=>{
    const newJobPost = new JobPost(req.body);
    try{
        const savedJobPost = await newJobPost.save();
        return res.status(200).json(savedJobPost);
    }catch(err){
        return res.status(500).json(err);
    }
});

//UPDATE a JobPost in the database
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {  
    try{
        const updatedJobPost = await JobPost.findByIdAndUpdate(
           req.params.id, 
           {
             $set: req.body
           }, 
           {new: true}
        );
        return res.status(200).json(updatedJobPost);
    }catch(err){
        return res.status(500).json(err);
    }   
});

//DELETE a JobPost from the database

router.delete("/:id", verifyTokenAndAdmin, async (req, res) =>{
    try{
        await JobPost.findByIdAndDelete(req.params.id)
        return res.status(200).json("Product has been deleted");
    }catch(err){
        return res.status(500).json(err);
    }
});

//GET details of a JobPost
router.get("/find/:id",  async (req, res) =>{
    try{
        const jobpost = await JobPost.findById(req.params.id);
        
        res.status(200).json(jobpost);
    }catch(err){
        return res.status(500).json(err);
    }
});

//GET ALL courses
router.get("/", async (req, res) =>{
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try{
        let jobposts;
        	
        if(qNew){
            jobposts = await JobPost.find().sort({createdAt : -1}).limit(1);
        }else if(qCategory){
            jobposts = await JobPost.find({categories:{
                $in: [qCategory],
            },
        });
        }else{
            jobposts = await JobPost.find();
        }
        res.status(200).json(jobposts);
    }catch(err){
        return res.status(500).json(err);
    }
});


module.exports = router;