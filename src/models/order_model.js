const mongoose = require("mongoose")
const { Schema } = mongoose;
const orderSchema = new Schema({
    userId: String,
    cartId: String,
    userInfo: {
        fullname: String,
        phone: String,
        address: String
    },
    products: {
        type: Array,
        default: []
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "delivered"],
        default: "pending"
    },
    totalPrice: Number,
    deleted: {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true // This enables automatic timestamps
})
// define order model
const Order = mongoose.model("orders", orderSchema, "orders")
// third argument is to prevent automatic prularized the collection name

module.exports = Order