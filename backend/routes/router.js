const express = require('express')
const router = express.Router()

const userController=require("../controllers/userController")
const authenticate=require("../middleware/authentication")
router.post("/signup", userController.signup);

// Route for user login
router.post("/login", userController.login);

// Protected route to check if a user is valid
router.get("/validuser", authenticate, userController.validUser);

module.exports = router