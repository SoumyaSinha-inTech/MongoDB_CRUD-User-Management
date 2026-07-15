const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/testuser");
const userSchema= mongoose.Schema({
    name:String,
    email:String,
    image:String
});
const user = mongoose.model('user',userSchema);
module.exports=user