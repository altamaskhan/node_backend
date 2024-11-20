const express = require("express")
const { userRegister, userList, userDelete,userUpdate,userLogin } = require("../Controller/userController")
const router = express.Router()

router.post("/adduser", userRegister)
router.get("/getAll", userList)
router.delete("/delete/:_id", userDelete)
router.put("/update/:_id", userUpdate)

router.post("/login", userLogin);





module.exports = router
