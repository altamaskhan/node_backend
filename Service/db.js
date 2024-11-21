const mongoose = require("mongoose")
const connectdb = () => {
    mongoose.connect("mongodb://127.0.0.1/asignmentproject", {
          
    }).then(() => {
        console.log("db connected")
    }).catch(() => {
        console.log("connect fail")
    })
}

module.exports = connectdb;

