const express = require("express")
const controller = require("../../controllers/admin/auth_controller.js")
const router = express.Router()

router.get("/login", controller.login_get)
router.post("/login", controller.login_post)
module.exports = router