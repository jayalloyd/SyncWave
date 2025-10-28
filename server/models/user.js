const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const passportLocalMongoose= require("passport-local-mongoose");
const userSchema =new Schema({
    username:{
        type: String,
    required: true,
    unique: true,
},
    email:{
        type: String,
    required: true,
    unique: true,
},
password:{
    type: String,
    required: true, 
}, profilePhoto:{
    type: String,
    default: 'defaultProfilePhoto.jpg',
},
createdAt:{
    type: Date,
    default: Date.now,
},  
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);