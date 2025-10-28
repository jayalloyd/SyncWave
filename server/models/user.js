const mongoose = require('mongoose');
const Schema= mongoose.Schema;
const passportLocalMongoose= require("passport-local-mongoose");
const userSchema =new Schema({
  
    email:{
        type: String,
    required: true,
    unique: true,
},isEmailVerified:{
    type: Boolean,
    default: false,
}, profilePhoto:{
    type: String,
    default: 'defaultProfilePhoto.jpg',
},
createdAt:{
    type: Date,
    default: Date.now,
},  
});

userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email' // use email as the username field
});

module.exports = mongoose.model("User", userSchema);