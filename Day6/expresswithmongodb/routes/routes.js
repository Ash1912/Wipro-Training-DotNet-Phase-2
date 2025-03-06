const express= require("express");
const { getAllUsers,getUserById,addUser 
    , editUser, deleteUser
} = require("../controllers/userController");

var router = express.Router();

// import  chekUser from "../routes/authmiddleware.js"
console.log("in web")
router.get("/", getAllUsers);

 
 router.post("/add", addUser);

 router.get("/:id", getUserById);

router.put("/:id", editUser);

router.delete("/:id", deleteUser);

 module.exports= router;
