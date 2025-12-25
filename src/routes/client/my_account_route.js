const express = require("express")
const controller = require("../../controllers/client/my_account_controller")
const multer  = require('multer')
const cloudUpload = require("../../middleware/client/uploadImageCloud.js")
const upload = multer()
const modify_account_validator = require("../../validation/client/modify_account.js")
const router = express.Router()

router.get("/", controller.index)
router.patch(
    "/edit/:id",
    upload.single("avatar"),
    cloudUpload,
    modify_account_validator,
    controller.edit
)
router.get("/history", controller.history_get)
router.get("/history/detail/:id", controller.history_detail)
module.exports = router