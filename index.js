const express = require('express')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const app = express()
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())
// parse application/json
app.use(bodyParser.json())
// import routes
const client_route = require("./routes/client/index_route.js")
const admin_route = require("./routes/admin/index_route.js")
// import the env module
require('dotenv').config()
const port = process.env.PORT
// import database
const database = require("./config/database.js")
// embed static files
app.use(express.static('public'))
// set up the template engine
app.set("views", "./views")
app.set("view engine", "pug")

// Connect to database
database.connect()

// Routes:
client_route(app)
admin_route(app)

app.listen(port)