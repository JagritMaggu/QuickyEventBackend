const express = require("express");
const {signup,login,logout, getUser} = require("../Controllers/auth.js")
const checkAuth = require("../Middlewares/checkAuth.js")
const {fetchUser} =require("../Controllers/fetchuser.js")
const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.get("/getUser", checkAuth, fetchUser)

module.exports = router;