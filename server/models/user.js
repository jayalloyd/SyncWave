const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema= mongoose.Schema;

const userSchema =new Schema({
  username:{
    type: String,
    required: true,
  },
  password: { type: String, required: true },
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
// Hash password before save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password for login
userSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};


module.exports = mongoose.model("User", userSchema);