// @ts-nocheck
const express = require('express');
const router = express.Router();
const User = require('../Models/User'); // Ensure your User model is correctly defined
const { body, validationResult } = require('express-validator');
const jwtsecret = "mynameisbharatbhushanvijaysakhare"
const bcrypt = require("bcryptjs");
const jwt =  require("jsonwebtoken");
// Route to create a new user
router.post("/createuser", [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
], async (req, res) => {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
const salt = await bcrypt.genSalt(10);
let  setpssword = await bcrypt.hash(req.body.password,salt)
    try {
        // Create new user with the provided data from the request
        await User.create({
            name: req.body.name,         // Use data from the frontend
            password: setpssword, // Remember to hash passwords in production
            email: req.body.email,
            location: req.body.location,
        });

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        // Handle potential duplicate email error
        if (error.code === 11000) {
            return res.status(400).json({ success: false, msg: "Email already exists" });
        }
        res.status(500).json({ success: false, msg: "Server error" });
    }
});
router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 5 })
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    let email = req.body.email;
    try {
      // Check if user exists
      let userdata = await User.findOne({ email });
      if (!userdata) {
        return res.status(400).json({ errors: "Try with correct credentials" });
      }
  
      // Compare the provided password with the hashed password
      const pwdcompare = await bcrypt.compare(req.body.password, userdata.password);
      if (!pwdcompare) {
        return res.status(400).json({ errors: "Try with correct credentials" });
      }
  
      // Generate JWT token
      const data = { 
        user: { id: userdata.id }
      };
      const authToken = jwt.sign(data, jwtsecret);
  
      // Successful login
      return res.json({ success: true, authToken });
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });
module.exports = router;