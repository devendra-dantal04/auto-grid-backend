const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const asyncHandler = require("../middleware/async");


const sendToken = (user, statusCode, res) => {
    const token = user.getSignToken();
  
    res
      .status(statusCode)
      .json({ success: true, token });
};


// @desc    Register a user
// @route   POST api/v1/auth/register
// @access  Public

exports.register = asyncHandler(async (req,res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        throw new Error("All Field are required");
    }

    const hashPassword = await bcrypt.hash(password, 12);
    

    try{
        const user = await User.create({
            name,
            email,
            password : hashPassword
        });
    
        sendToken(user, 200, res);

    }catch(err) {
        console.log(err.message);
        res.status(500).json("Internal Server error");
    }
});





// @desc    Login a user
// @route   POST api/v1/auth/register
// @access  Public

exports.login = asyncHandler(async (req,res) => {
    const {email, password} = req.body;
    const userPassword = password

    if(!email || !userPassword) {
        throw new Error("All fields are required")
    }

    const user = await User.findOne({email}).select("+password");

    if(user) {
        const isMatch = await user.matchPassword(userPassword); 
        console.log(isMatch)
        if(isMatch) {
            const token = user.getSignToken();
    
            sendToken(user,200,res);
            return;
        }
    }


    res.status(400).json({message : "Invalid Credentials"})
});