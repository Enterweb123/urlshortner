const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
    longUrl:{
        type:String,
        require:true
    },
    shortUrl:{
        type:String,
        unique:true
    },
    clickCount:{
        type:Number,
        default:0
    },
   },
   {timestamps:true }
 );
 
const UrlModel =  mongoose.model("urls",UrlSchema);

module.exports = UrlModel;