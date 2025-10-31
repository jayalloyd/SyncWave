const User = require("../models/user.js");
const express = require("express");
//signup
module.exports.signup=async(req,res)=>{
// Extract variables from the request body first
  const { username, password, email } = req.body;

  console.log("New user signup attempt:");
  console.log("Username:", username);
  console.log("Email:", email);
  console.log("Password:", password);

  // Create new user object using User model/schema
  const newUser = new User({ email, username, password });

  try {
    // Assuming Mongoose, use 'save()' to insert into DB
    const registeredUser = await newUser.save();
    console.log(registeredUser);

    res.send("Signup successful");
  } catch (error) {
    // Send error response in case of failure
    console.error(error);
    res.status(500).send("Error during signup");
  }

}
//login
module.exports.login=async(req,res)=>{

let {username,password}=req.body;
console.log("Login POST route hit. User attempting to log in:", req.body.username);
try{

const user = await User.findOne({ username });
if (!user) return res.status(401).send('Invalid username or password');

// const isValid = await user.isValidPassword(password);
// if (!isValid) return res.status(401).send('Invalid username or password');
 const hashedPassword = await bcrypt.hash(password, 10);
bcrypt.compare(password,hashedPassword);{

res.send("login successful");
}


}catch(error){
console.error(error);
res.status(500).send("login failed");
}




}