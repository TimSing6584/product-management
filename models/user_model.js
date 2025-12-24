const mongoose = require("mongoose")
const { Schema } = mongoose;
const userSchema = new Schema({
    fullname: String,
    email: String,
    password: String,
    phone: String,
    avatar: String,
    deleted: {
        type: Boolean,
        default: false
    },
    deleteTime: Date,
}, {
    timestamps: true // This enables automatic timestamps
})
// define user model
const User = mongoose.model("users", userSchema, "users")
// third argument is to prevent automatic prularized the collection name

module.exports = User