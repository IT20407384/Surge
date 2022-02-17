const express = require("express");
const {
  signUpUser,
  loginUser,
  getUserInfo,
  updateUser,
} = require("../controller/user.controller");
const router = express.Router();

const {} = require("../controller/user.controller");

//http://localhost:3001/api/User/add
//if call above url with post method addUser method will be called
//router.post("/add", addUser);
//router.get("/all", getAllUsers);

router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.get("/profile/:id", getUserInfo);
router.post("/updateUser/:id", updateUser);

module.exports = router;
