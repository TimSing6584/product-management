const mongoose = require("mongoose")
const { Schema } = mongoose;
const roleSchema = new Schema({
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
    description: String,
    permissions: {
        type: Array,
        default: []
    }
}, {
    timestamps: true // This enables automatic timestamps
})
// define role model
const Role = mongoose.model("roles", roleSchema, "roles")
// third argument is to prevent automatic prularized the collection name

module.exports = Role