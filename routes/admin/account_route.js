const express = require("express")
const multer  = require('multer')
const controller = require("../../controllers/admin/account_controller.js")
const create_account_validator = require("../../validation/admin/create_account.js")
const cloudUpload = require("../../middleware/admin/uploadImageCloud.js")
const upload = multer()
const router = express.Router()

router.get("/", controller.index)
router.get("/edit/:id", controller.edit_get)
router.patch(
    "/edit/:id",
    upload.single("avatar"),
    cloudUpload,
    create_account_validator.create_account,
    controller.edit_patch)
router.get("/create", controller.create_get)
router.post(
    "/create",
    upload.single("avatar"),
    cloudUpload,
    create_account_validator.create_account,
    controller.create_post
)
router.delete("/delete/:id", controller.delete)
module.exports = router