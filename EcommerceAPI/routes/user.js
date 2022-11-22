const User = require("../models/User");
const { verifyTokenAuthorisation, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

//UPDATE info of a user using id
router.put("/:id", verifyTokenAuthorisation, async (req, res) => {
    if(req.body.password){
        re.body.password= CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
          ).toString();
    }
   
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, 
        {new: true}
        );
        return res.status(200).json(updatedUser);
    }catch(err){
        return res.status(500).json(err);
    }   
});

//DELETE auser account

router.delete("/:id", verifyTokenAuthorisation, async (req, res) =>{
    try{
        await User.findByIdAndDelete(req.params.id)
        return res.status(200).json("USer has been deleted");
    }catch(err){
        return res.status(500).json(err);
    }
});

//GET USER details( get profile)
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) =>{
    try{
        const user = await User.findById(req.params.id);
        const { password, ...others}=user._doc;

        res.status(200).json(others);
    }catch(err){
        return res.status(500).json(err);
    }
});

//GET ALL USER for admin only get all user details
router.get("/", verifyTokenAndAdmin, async (req, res) =>{
    const query = req.query.new
    try{
        const users = query 
        ? await User.find().sort({_id:-1}).limit(5)
        : await User.find();
        res.status(200).json(users);
    }catch(err){
        return res.status(500).json(err);
    }
});

//GET USER STATS 

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  
    try {
      const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);
      return res.status(200).json(data)
    } catch (err) {
      return res.status(500).json(err);
    }
  });

module.exports = router;