const express = require("express")
const controller = require("../../controllers/admin/category_controller.js")
const create_category_validator = require("../../validation/admin/create_category.js")
const router = express.Router()

router.get("/", controller.index)
router.get("/edit/:id", controller.edit_get)
router.patch(
    "/edit/:id",
    create_category_validator.create_category,
    controller.edit_patch)
router.delete("/delete/:id", controller.delete)
router.get("/create", controller.create_get)
router.post(
    "/create",
    create_category_validator.create_category,
    controller.create_post
)
module.exports = router