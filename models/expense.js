const mongoose = require("../db/connection")

const expenseSchema = new mongoose.Schema({
    
    name: String,
    description: String,
    price: Number,
    date: String,

})

const Expense = new mongoose.model("Expense", expenseSchema)

module.exports= Expense;