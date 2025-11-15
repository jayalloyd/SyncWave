import User from '../models/userModel.js';

import status from 'http-status-codes';
import bcrypt from 'bcrypt';
//signup
module.exports.signup=async(req,res)=>{
// Extract variables from the request body first
  const { username, password, email } = req.body;

  console.log("New user signup attempt:");
  console.log("Username:", username);
  console.log("Email:", email);
  console.log("Password:", password);

  // Create new user object using User model/schema
 

  try {
  
    const existingUser= await User.findOne({username});
      console.log(existingUser);

      if(existingUser){
               return res.status(status.FOUND).json({message:"user already exists"});
      }

    else{
        const newUser = new User({ email, username, password });
        const hashedPassword=await bcrypt.hash(password,10);
        await newUser.save();
        return res.status(status.CREATED).json({messahe:"new user created"});
    }
  } catch (error) {
    // Send error response in case of failure
    console.error(error);
    res.status(500).json(`Error ${error} during signup `);
  }

}
//login
module.exports.login=async(req,res)=>{

let {username,password}=req.body;
console.log("Login POST route hit. User attempting to log in:", req.body.username);
try{

const user = await User.findOne({ username });
if (!user) return res.status(401).json('Invalid username or password');

const isValid = await user.isValidPassword(password);
if (!isValid) return res.status(401).json('Invalid username or password');
 const hashedPassword = await bcrypt.hash(password, 10);
bcrypt.compare(password,hashedPassword);{

res.json("login successful");
}


}catch(error){
console.error(error);
res.status(500).json("login failed");
}




}