const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://mikenitipong:lh0psKPCUUHiymwH@sei.ztt2ukp.mongodb.net/Project2")

mongoose.connection.on("connected", () => console.log("Connected to MongoosE"))
mongoose.connection.on("error", () => console.log("oh no MongoosE Disconnected"))

module.exports = mongoose