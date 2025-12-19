const express = require("express")
const controller = require("../../controllers/admin/auth_controller.js")
const auth_validator = require("../../validation/admin/auth.js")
const router = express.Router()

router.get("/login", controller.login_get)
router.post("/login",auth_validator.checkLogin, controller.login_post)
router.get("/logout", controller.logout)
module.exports = router