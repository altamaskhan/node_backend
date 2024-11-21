// const mongoose = require("mongoose")
// const connectdb = () => {
//     mongoose.connect("mongodb://127.0.0.1/asignmentproject", {
          
//     }).then(() => {
//         console.log("db connected")
//     }).catch(() => {
//         console.log("connect fail")
//     })
// }

// module.exports = connectdb;

const mongoose = require('mongoose');

// Set environment variable inline (for simplicity in the same file)
process.env.MONGO_URI =
  'mongodb+srv://tanzeela:tanzeela1234@sde-assignment.y313l.mongodb.net/project';

// Check and assign the Mongo URI
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1/project';

// Function to connect to MongoDB
const connectdb = () => {
  console.log('Connecting to:', MONGO_URI); // Debugging line
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('DB connected');
    })
    .catch((err) => {
      console.error('Connection failed:', err.message);
    });
};

module.exports = connectdb;
