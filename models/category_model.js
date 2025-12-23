const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
const { Schema } = mongoose;
const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deleteTime: Date,
    slug: {
        type: String,
        slug: "name", // slug will be set same as title of product
        unique: true // guarantee the slug is unique
    }
}, {
    timestamps: true // This enables automatic timestamps
})
// define category model
const Category = mongoose.model("categories", categorySchema, "categories")
// third argument is to prevent automatic prularized the collection name

module.exports = Category