const dashBoardRoutes = require("./dashboard_route.js")
const productRoutes = require("./product_route.js")
const categoryRoutes = require("./category_route.js")
const roleRoutes = require("./role_route.js")
const accountRoutes = require("./account_route.js")
const authRoutes = require("./auth_route.js")
const myAccountRoutes = require("./my_account_route.js")
const authMiddleware = require("../../middleware/admin/auth_middleware.js")

module.exports = (app) => {
    app.use("/admin/auth", authRoutes)
    app.use("/admin", authMiddleware.requireAuth, dashBoardRoutes)
    app.use("/admin/product", authMiddleware.requireAuth, productRoutes)
    app.use("/admin/category", authMiddleware.requireAuth, categoryRoutes)
    app.use("/admin/role", authMiddleware.requireAuth, roleRoutes)
    app.use("/admin/account", authMiddleware.requireAuth, accountRoutes)
    app.use("/admin/my_account",authMiddleware.requireAuth, myAccountRoutes)
}