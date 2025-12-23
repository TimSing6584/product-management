const mongoose = require("mongoose")
const { Schema } = mongoose;
const cartSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "accounts"
    },
    products: [
        {
            product_id: String,
            quantity: Number
        }
    ]
}, {
    timestamps: true // This enables automatic timestamps
})
// define cart model
const Cart = mongoose.model("carts", cartSchema, "carts")
// third argument is to prevent automatic prularized the collection name

module.exports = Cart