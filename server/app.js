
const express=require("express");
const methodOverride=require("method-override");
const app= express();
const mongoose=require("mongoose"); 
const cors=require("cors");
const userRoutes=require("./routes/user");
const path = require("path");

app.use(express.static(path.join(__dirname,"public")));
app.use(express.
    urlencoded({extended:true}));// to parse data
app.use(express.json());
app.use(methodOverride("_method"));
const passport=require("passport");
const User=require("./models/user.js");
main().then(() => { console.log("connection successful"); }).catch(err => console.log(err));


async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/SyncWave');
}
app.get("/",(req,res)=>{
    res.send("hello world");
});
app.listen(8080,()=>{
    console.log("server is listening to port 8080");
});