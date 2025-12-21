const express = require("express")
const controller = require("../../controllers/admin/my_account_controller")
const multer  = require('multer')
const cloudUpload = require("../../middleware/admin/uploadImageCloud.js")
const upload = multer()
const create_account_validator = require("../../validation/admin/create_account.js")
const router = express.Router()

router.get("/", controller.index)
router.patch(
    "/edit/:id",
    upload.single("avatar"),
    cloudUpload,
    create_account_validator.create_account,
    controller.edit
)

module.exports = router