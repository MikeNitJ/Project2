const mongoose = require("../db/connection")

const incomeSchema = new mongoose.Schema({
    
    name: String,
    description: String,
    price: Number,
    date: String,

})

const Income = new mongoose.model("Income", incomeSchema)

module.exports= Income;