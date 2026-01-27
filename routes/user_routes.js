const express = require("express");
const router = express.Router();
const user_controller = require("../controller/user.controller");

router.post("/user",user_controller.AddUser);                   //Post Route

router.put("/user/:id",user_controller.updateUser);            //PUT ROute


 router.get("/user/:id",user_controller.get);                // Get user

 router.delete("/user/:id",user_controller.Dell);           //Delete                        


module.exports = router;