const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.js");
const userController=require("../controllers/userController.js");
const local = require('passport-local');

//login

router.route("/login")
 .post(
    passport.authenticate("local", { failureRedirect: "/login-failure", successRedirect: "/login-success" }),
    userController.login // This function typically handles session creation or response
  );
//signup

router.route("/signup")
   
 .post(userController.signup);// POST route to handle form submission
  module.exports=router;