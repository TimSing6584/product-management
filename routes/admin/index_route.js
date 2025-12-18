const dashBoardRoutes = require("./dashboard_route.js")
const productRoutes = require("./product_route.js")
const categoryRoutes = require("./category_route.js")
const roleRoutes = require("./role_route.js")
const accountRoutes = require("./account_route.js")
const authRoutes = require("./auth_route.js")
module.exports = (app) => {
    app.use("/admin", dashBoardRoutes)
    app.use("/admin/product", productRoutes)
    app.use("/admin/category", categoryRoutes)
    app.use("/admin/role", roleRoutes)
    app.use("/admin/account", accountRoutes)
    app.use("/admin/auth", authRoutes)
}