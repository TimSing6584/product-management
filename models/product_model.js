const mongoose = require("mongoose")
const slug = require('mongoose-slug-updater')
mongoose.plugin(slug)
const { Schema } = mongoose;
const productSchema = new Schema({
    title: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    images: String,
    deleted: {
        type: Boolean,
        default: false
    },
    category: String,
    deleteTime: Date,
    position: Number,
    description: String,
    slug: {
        type: String,
        slug: "title", // slug will be set same as title of product
        unique: true // guarantee the slug is unique
    }
}, {
    timestamps: true // This enables automatic timestamps
})
// define product model
const Product = mongoose.model("products", productSchema, "products")
// third argument is to prevent automatic prularized the collection name

module.exports = Product