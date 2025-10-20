const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/product_controller.js")
router.get("/", controller.index)
module.exports = router