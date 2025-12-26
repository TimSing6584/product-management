const mongoose = require("mongoose")

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

module.exports.connect = async () => {
    if (cached.conn) return cached.conn

    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGO_URL, {
            bufferCommands: false, // prevents queries from hanging
            // optional: useNewUrlParser & useUnifiedTopology are default in latest mongoose
        })
    }

    try {
        cached.conn = await cached.promise
    } catch (err) {
        cached.promise = null
        throw err
    }

    return cached.conn
}
