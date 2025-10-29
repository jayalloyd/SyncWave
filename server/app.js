
const express=require("express");
const methodOverride=require("method-override");
const app= express();
const bcrypt=require("bcrypt");
const mongoose=require("mongoose"); 
const cors=require("cors");
const userRoutes=require("./routes/user");
const path = require("path");
const User=require('./models/user.js');
app.use(express.static(path.join(__dirname,"public")));
app.use(express.
    urlencoded({extended:true}));// to parse data
app.use(express.json());
app.use(methodOverride("_method"));
const passport=require("passport");

main().then(() => { console.log("connection successful"); }).catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/SyncWave');
}
app.get("/",(req,res)=>{
    res.send("hello world");
});
app.post("/login",async(req,res)=>{
let {username,password}=req.body;
console.log("Login POST route hit. User attempting to log in:", req.body.username);
try{

const user = await User.findOne({ username });
if (!user) return res.status(401).send('Invalid username or password');

const isValid = await user.isValidPassword(password);
if (!isValid) return res.status(401).send('Invalid username or password');



res.send("login successful");
}catch(error){
console.error(error);
res.status(500).send("login failed");
}


});
app.post("/signup", async (req, res) => {
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
});

app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});