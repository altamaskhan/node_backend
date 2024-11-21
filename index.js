const express = require ("express")
const app = express()
const cors = require("cors");

//connect db
const connectdb = require("./Service/db.js")
const morgan = require('morgan')
// routers
const USerRouter = require("./Routes/userRoute.js")
const projectRoutes = require("./Routes/ProjectRoute.js");
const fileRoutes = require("./Routes/fileRoute.js");


// app.use("/api/projects", projectRoutes);
// CORS configuration
const corsOptions = {
    origin: "http://localhost:3000", // React app running on localhost:3000 (adjust if different)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow specific methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
  };
  
  // Enable CORS with the above options
  app.use(cors(corsOptions));
  

app.use(express.json())
app.use(morgan("tiny"))
app.use("/api/v1/user", USerRouter)
app.use("/api/v1/project",projectRoutes)
app.use("/api/v1/project/file",fileRoutes)

app.get("/get",(req,res)=>{
    res.send("Awesome")
})

const port= 5000

const start = async()=>{
    try {
        await connectdb()
       await app.listen(port,()=>{
            console.log(`server is reanning on port : ${port}`)
        })
        
    } catch (error) {
        throw new Error("Something went wrong", error)
    }
}

start()
