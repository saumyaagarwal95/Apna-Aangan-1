const mongoose= require("mongoose");

const businessRegisterSchema = new mongoose.Schema(
    {
      userId:{type: String, required: true},
      business: [
        {
            business_name:{type:String},
            business_phoneno:{type:String,required:true,unique:true},
            business_email:{type: String, required: true, unique:true},
            business_address: {type : Object , required: true},
            productId: { type: String },
            business_desc:{type:String}
        },
      ],  
    },
    {timestamps: true}
);

module.exports = mongoose.model("Business", businessRegisterSchema);