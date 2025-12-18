const mongoose = require("mongoose")
const { Schema } = mongoose;
const accountSchema = new Schema({
    fullname: String,
    email: String,
    password: String,
    phone: String,
    avatar: String,
    role:{
        type: Schema.Types.ObjectId,
        ref: "roles" // model names
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deleteTime: Date,
}, {
    timestamps: true // This enables automatic timestamps
})
// define product model
const Account = mongoose.model("accounts", accountSchema, "accounts")
// third argument is to prevent automatic prularized the collection name

module.exports = Account