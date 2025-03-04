const express= require("express");
const { getUsers, getUserById , createUser, editUser, deleteUser } = require("../controllers/user");
var router = express.Router();


router.get("/", (req, res)=> res.send("hello3"))
router.get("/aboutus", (req, res)=> res.send("ABOUT US"))

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users/add", createUser);
router.delete("/users/delete/:id", deleteUser);
router.put("/users/edit/:id", editUser);

module.exports = router;


