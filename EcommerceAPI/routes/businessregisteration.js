const BusinessRegister = require("../models/BusinessRegister");
const User = require("../models/User");

const { verifyToken, verifyTokenAuthorisation, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE add new business to database
router.post("/",verifyTokenAndAdmin, async (req,res)=>{
    const newBusiness = new BusinessRegister(req.body);
    try{
        const savedBusiness = await newBusiness.save();
        return res.status(200).json(savedBusiness);
    }catch(err){
        return res.status(500).json(err);
    }
});

//UPDATE a business in the database
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {  
    try{
        const updatedBusiness = await BusinessRegister.findByIdAndUpdate(
           req.params.id, 
           {
             $set: req.body
           }, 
           {new: true}
        );
        return res.status(200).json(updatedBusiness);
    }catch(err){
        return res.status(500).json(err);
    }   
});

//DELETE a Business from the database

router.delete("/:id", verifyTokenAndAdmin, async (req, res) =>{
    try{
        await BusinessRegister.findByIdAndDelete(req.params.id)
        return res.status(200).json("Business has been deleted");
    }catch(err){
        return res.status(500).json(err);
    }
});

//GET details of a Business by businessid
router.get("/find/:id",  async (req, res) =>{
    try{
        const business = await BusinessRegister.findById(req.params.id);
        
        res.status(200).json(business);
    }catch(err){
        return res.status(500).json(err);
    }
});


//GET ALL businesses or get a business by userid 
router.get("/", async (req, res) =>{
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try{
        let businesses;
        	
        if(qNew){
            businesses = await BusinessRegister.find().sort({createdAt : -1}).limit(1);
        }else if(qCategory){
            businesss = await BusinessRegister.find({categories:{
                $in: [qCategory],
            },
        });
        }else{
            businesses = await BusinessRegister.find();
        }
        res.status(200).json(businesses);
    }catch(err){
        return res.status(500).json(err);
    }
});


module.exports = router;