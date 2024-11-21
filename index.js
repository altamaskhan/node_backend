// const express = require ("express")
// const app = express()
// const cors = require("cors");

// //connect db
// const connectdb = require("./Service/db.js")
// const morgan = require('morgan')
// // routers
// const USerRouter = require("./Routes/userRoute.js")
// const projectRoutes = require("./Routes/ProjectRoute.js");
// const fileRoutes = require("./Routes/fileRoute.js");


// // app.use("/api/projects", projectRoutes);
// // CORS configuration
// const corsOptions = {
//     origin: "http://localhost:3000", // React app running on localhost:3000 (adjust if different)
//     methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
//     allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
//   };
  
//   // Enable CORS with the above options
//   app.use(cors(corsOptions));
  

// app.use(express.json())
// app.use(morgan("tiny"))
// app.use("/api/v1/user", USerRouter)
// app.use("/api/v1/project",projectRoutes)
// app.use("/api/v1/project/file",fileRoutes)

// app.get("/get",(req,res)=>{
//     res.send("Awesome")
// })

// const port= 5000

// const start = async()=>{
//     try {
//         await connectdb()
//        await app.listen(port,()=>{
//             console.log(`server is reanning on port : ${port}`)
//         })
        
//     } catch (error) {
//         throw new Error("Something went wrong", error)
//     }
// }

// start()





const express = require("express");
const app = express();
const cors = require("cors");

// Connect DB
const connectdb = require("./Service/db.js");
const morgan = require("morgan");

// Routers
const USerRouter = require("./Routes/userRoute.js");
const projectRoutes = require("./Routes/ProjectRoute.js");
const fileRoutes = require("./Routes/fileRoute.js");

// Import User model for default user setup
const User = require("./Model/userSchema");

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000", // React app running on localhost:3000 (adjust if different)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
};

// Enable CORS with the above options
app.use(cors(corsOptions));

app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/v1/user", USerRouter);
app.use("/api/v1/project", projectRoutes);
app.use("/api/v1/project/file", fileRoutes);

app.get("/get", (req, res) => {
  res.send("Awesome");
});

const port = 5000;

// Function to create a default user
const defaultUserSetup = async () => {
  try {
    const defaultEmail = "admin@example.com"; // Default user email
    const existingUser = await User.findOne({ email: defaultEmail });

    if (!existingUser) {
      const defaultUser = new User({
        username: "admin",
        email: defaultEmail,
        password: "admin123", // Default password (hashed automatically)
        mobile: 1234567890,
      });
      await defaultUser.save();
      console.log("Default admin user created successfully!");
    } else {
      console.log("Default admin user already exists.");
    }
  } catch (error) {
    console.error("Error creating default user:", error.message);
  }
};

const start = async () => {
  try {
    await connectdb(); // Connect to the database
    await defaultUserSetup(); // Setup the default user
    await app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  } catch (error) {
    throw new Error("Something went wrong", error);
  }
};

start();
