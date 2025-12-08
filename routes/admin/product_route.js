const express = require("express")
const multer  = require('multer')
const storageMulter = require("../../helpers/diskStorageMulter.js")
const upload = multer({storage: storageMulter()})
const router = express.Router()
const controller = require("../../controllers/admin/product_controller.js")
const create_product_validator = require("../../validation/admin/create_product.js")

router.get("/", controller.index)
router.patch("/change-stock/:counter_value/:id", controller.changeStock)
router.patch("/change-multi", controller.changeMulti)
router.delete("/delete/:id", controller.delete)
router.get("/create", controller.create_get)
router.post(
    "/create",
    upload.single("images"),
    create_product_validator.create_product,
    controller.create_post
)
module.exports = router