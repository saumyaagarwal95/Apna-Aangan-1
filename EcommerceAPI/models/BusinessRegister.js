const mongoose= require("mongoose");
// First add product and user and then connect that productid and userid under business registration 
const businessRegisterSchema = new mongoose.Schema(
    {
      userId:{type: String, required: true},
      business: [
        {
            business_name:{type:String},
            business_category:{type:String},
            business_phoneno:{type:String,required:true,unique:true},
            whatsapp_phoneno:{type:String,required:true,unique:true},
            business_email:{type: String, unique:true},
            business_address: {type : Object , required: true},
            products_to_sell:{ type:Object},
            if_edibleproduct_shelflife:{ type: Number},
            delivery_service_required: { type: Boolean, default:false},
            learn_teach_skill: {type:String},
            skill_set:{type: Object},
            post_jobOpening:{type: Object},
            productId: { type: String },
            remarks:{type:String}
        },
      ],  
    },
    {timestamps: true}
);

module.exports = mongoose.model("Business", businessRegisterSchema);