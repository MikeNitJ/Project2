const mongoose = require("mongoose")

mongoose.connect(process.env.MONGOURI)

mongoose.connection.on("connected", () => console.log("Connected to MongoosE"))
mongoose.connection.on("error", () => console.log("oh no MongoosE Disconnected"))

module.exports = mongoose
