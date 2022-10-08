const mongoose = require("mongoose");

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`DB connected! -> ${conn.connection.host}`.bgMagenta.black);
    }catch(err) {
        console.log(err.message)
    }
}


module.exports = connectDB;