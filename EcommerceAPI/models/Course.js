const mongoose= require("mongoose");

const courseSchema = new mongoose.Schema(
    {
      title:{type: String, required: true, unique: true},
      desc: {type: String, required: true },
      img :{ type: String, required: true },
      categories :{ type: Array },
      price: {type: String, required: true },
      location:{type:String},
      status: {type:String, required:true, enum:['open','closed'], default:'open'} 
    },
    {timestamps: true}
);

module.exports = mongoose.model("Course", courseSchema);