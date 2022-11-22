const mongoose= require("mongoose");

const JobPostSchema = new mongoose.Schema(
    {
      title:{type: String, required: true, unique: true},
      desc: {type: String, required: true },
      img :{ type: String, required: true },
      categories :{ type: Array },
      status: {type:String, required:true, enum:['open','closed'], default:'open'}  
    },
    {timestamps: true}
);

module.exports = mongoose.model("JobPost", JobPostSchema);