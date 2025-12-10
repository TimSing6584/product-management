const express = require("express")
const multer  = require('multer')
const controller = require("../../controllers/admin/product_controller.js")
const create_product_validator = require("../../validation/admin/create_product.js")
const cloudUpload = require("../../middleware/admin/uploadImageCloud.js")
const upload = multer()

const router = express.Router()

router.get("/", controller.index)
router.patch("/change-stock/:counter_value/:id", controller.changeStock)
router.patch("/change-multi", controller.changeMulti)
router.delete("/delete/:id", controller.delete)
router.get("/create", controller.create_get)
router.post(
    "/create",
    upload.single("images"),
    cloudUpload,
    create_product_validator.create_product,
    controller.create_post
)
router.get("/edit/:id", controller.edit_get)
// can re-use the validator when create product
router.patch(
    "/edit/:id",
    upload.single("images"),
    cloudUpload,
    create_product_validator.create_product,
    controller.edit_patch
)
router.get("/detail/:id", controller.detail)
module.exports = router