const express = require("express")
const router = express.Router()
const controller = require("../../controllers/client/cart_controller.js")

router.get("/", controller.index)
router.post("/add/:product_id", controller.add)
module.exports = router