const express = require("express")
const router = express.Router()
const auth_validator = require("../../validation/client/auth.js")
const controller = require("../../controllers/client/auth_controller.js")
router.get("/", controller.index)
router.post(
    "/register",
    auth_validator.checkRegister,
    controller.register
)
router.post(
    "/login",
    auth_validator.checkLogin,
    controller.login
)
router.get("/logout", controller.logout)
module.exports = router