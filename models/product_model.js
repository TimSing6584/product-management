const mongoose = require("mongoose")
const { Schema } = mongoose;
const productSchema = new Schema({
    title: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    images: String,
    deleted: Boolean,
    category: String,
    deleteTime: Date,
    position: Number,
    description: String
}, {
    timestamps: true // This enables automatic timestamps
})
// define product model
const Product = mongoose.model("products", productSchema, "products")
// third argument is to prevent automatic prularized the collection name

module.exports = Product