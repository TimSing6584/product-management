const express = require("express")
const router = express.Router()
const controller = require("../../controllers/admin/product_controller.js")
router.get("/", controller.index)
router.patch("/change-stock/:counter_value/:id", controller.changeStock)
router.patch("/change-multi", controller.changeMulti)
router.delete("/delete/:id", controller.delete)
module.exports = router