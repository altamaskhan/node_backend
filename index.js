const express = require ("express")
const app = express()
//connect db
const connectdb = require("./Service/db.js")
const morgan = require('morgan')
// routers
const USerRouter = require("./Routes/userRoute.js")

app.use(express.json())
app.use(morgan("tiny"))
app.use("/api/v1/user", USerRouter)

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
