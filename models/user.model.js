const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = Schema({
    name : {type : String, required : [true, "Please Enter user name"]},
    email : {
        type: String,
        required : [true, "Please enter the email"],
        unique: true,
        match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
        ],
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        select: false,
    }
})


userSchema.methods.getSignToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
};
  
userSchema.methods.matchPassword = async function (passwordEntered) {
    return await bcrypt.compare(passwordEntered, this.password);
};

module.exports = mongoose.model('User', userSchema);