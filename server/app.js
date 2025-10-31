if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express=require("express");
const methodOverride=require("method-override");
const app= express();
const bcrypt=require("bcrypt");
const mongoose=require("mongoose"); 
const cors=require("cors");
const userRouter=require("./routes/user");
const path = require("path");
const User=require('./models/user.js');
app.use(express.static(path.join(__dirname,"public")));
app.use(express.
    urlencoded({extended:true}));// to parse data
app.use(express.json());
app.use(methodOverride("_method"));
const passport=require("passport");
const session = require('express-session');
const LocalStrategy = require('passport-local'); // Import LocalStrategy


main().then(() => { console.log("connection successful"); }).catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/SyncWave');
}
const sessionOptions = {
secret: process.env.SESSION_SECRET,    
resave: false,
    saveUninitialized: true,
  
};

app.use(session(sessionOptions)); 



app.use(session(sessionOptions)); 
app.use(passport.initialize());  
app.use(passport.session());


passport.use(new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username: username });
    return done(null, user); 
}));

passport.serializeUser((user, done) => {
    done(null, user.id); 
});


passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});


app.use('/users', userRouter);


app.get("/login-success", (req, res) => {
    // Check if the user is authenticated before showing the success page
    if (req.isAuthenticated()) {
        res.send(`<h1>Welcome, ${req.user.username}! Login Successful.</h1><p>User ID: ${req.user.id}</p>`);
    } else {
       
        res.redirect("/login"); 
    }
});


app.get("/login-failure", (req, res) => {
    
    res.send("<h1>Login Failed</h1><p>Incorrect username or password.</p><a href='/login'>Try Again</a>");
});
app.get("/",(req,res)=>{
    res.send("hello world");
});


app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});