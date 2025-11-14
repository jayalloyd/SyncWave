const express = require("express");
import { Router } from "express";
const router = Router();
const passport = require("passport");
const userController = require("../controllers/userController.js"); 




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


  router.route("/add_to_activity");

router.route("/get+all_activity");

export default router;