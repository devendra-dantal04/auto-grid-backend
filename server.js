require("dotenv").config({path : __dirname+"/config/.env"});
const express = require("express");
const connectDB = require('./config/db');
const colors = require('colors');
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json())

connectDB();


app.use('/api/v1/auth', require("./routes/auth.route"))
app.use('/api/v1/mail', require("./routes/mail.route"))


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on PORT ${process.env.PORT}`)
})