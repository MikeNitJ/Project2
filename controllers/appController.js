const express = require("express")
const router = express.Router();
const Income = require("../models/income")
const Expense = require("../models/expense")

// INDUCES

router.get("/main", async (req,res) =>{
  let incomes = await Income.find()
  let expenses = await Expense.find()

  let incomeSummary = incomes.reduce((total, income) => total + income.price, 0);
  let expenseSummary = expenses.reduce((total, expense) => total + expense.price, 0);

  let totalSummary = incomeSummary - expenseSummary

  res.render("main.ejs", {incomes,expenses, incomeSummary, expenseSummary, totalSummary})
  console.log(incomes, expenses);
})



router.get("/income", async (req,res) =>{
    let incomes = await Income.find()
    res.render("income/index.ejs", {incomes})
})

router.get("/expense", async (req,res) =>{
    let expenses = await Expense.find()
    res.render("expense/index.ejs", {expenses})
})

router.get("/income/:id", async (req,res) =>{
  let id = req.params.id
  let income = await Income.findById(id)
  res.render("income/show.ejs", {income})
  console.log(income);
})

router.get("/expense/:id", async (req,res) =>{
  let id = req.params.id
  let expense = await Expense.findById(id)
  res.render("expense/show.ejs", {expense})

})







router.get("/seed", async (req,res) => {
    // await Order.deleteMany({})
    await Income.deleteMany({})
      let seededIncome = await Income.create([
          {
            name: "Pay Check",
            description: "Check from A company",
            price: 2000 ,
            date: "8/20/2023",
          },
          {
            name: "Zelle",
            description: " AA send back the money",
            price: 100 ,
            date: "8/3/2023",
          },
          {
            name: "Zelle",
            description: " Grandma send it for Grocery",
            price: 50 ,
            date: "8/1/2023",
          },
        ])
        res.send(seededIncome)
  })
  
 router.get("/seeds", async (req,res) => {
      // await Order.deleteMany({})
      await Expense.deleteMany({})
        let seededExpense = await Expense.create([
            {
              name: "Electricity Bill",
              description: "It was 50 last year",
              price: 200 ,
              date: "8/20/2023",
            },
            {
              name: "Health Insurance",
              description: "For my Cat",
              price: 1000 ,
              date: "8/3/2023",
            },
            {
              name: "Buying Games",
              description: "Undertale",
              price: 500 ,
              date: "8/1/2023",
            },
          ])
          res.send(seededExpense)
    })



router.get("/income/edit/:id", async (req,res) =>{
      let id = req.params.id
      let income = await Income.findById(id)
      console.log(income);
    res.render("income/edit.ejs",{income})
})
router.get("/expense/edit/:id", async (req,res) =>{
      let id = req.params.id
      let expense = await Expense.findById(id)
      console.log(expense);
    res.render("expense/edit.ejs",{expense})
})

// Update
router.put("/income/edit/:id", async (req,res) =>{
      let id = req.params.id
      let income = await Income.findById(id)

        income.name = req.body.name;
        income.description = req.body.description;
        income.price = req.body.price;
        income.date = req.body.date;
        await income.save();

        res.redirect("/income")
})

router.put("/expense/edit/:id", async (req,res) =>{
      let id = req.params.id
      let expense = await Expense.findById(id)

        expense.name = req.body.name;
        expense.description = req.body.description;
        expense.price = req.body.price;
        expense.date = req.body.date;
        await expense.save();

        res.redirect("/expense")
})


router.get("/income/create", async (req, res) => {
    res.render("income/new.ejs")

})

router.get("/expense/create", async (req, res) => {
    res.render("expense/new.ejs")

})

router.post("/income/create", async (req, res) => {

      const { name, description, price, date } = req.body;

      // Create a new income entry
      const newIncome = new Income({
          name,
          description,
          price,
          date
      });

      // Save the new income entry to the database
      await newIncome.save();

      res.redirect("/income")
    })
    
router.post("/expense/create", async (req, res) => {

      const { name, description, price, date } = req.body;

      // Create a new income entry
      const newExpense = new Expense({
          name,
          description,
          price,
          date
      });

      // Save the new income entry to the database
      await newExpense.save();

      res.redirect("/expense")
    })


router.delete("/income/:id", async (req, res) => {

   let id = req.params.id;
 // Find the income by ID and remove it
   let deletedIncome = await Income.findByIdAndRemove(id);
    console.log(deletedIncome);
    res.redirect("/income")  
    })


router.delete("/expense/:id", async (req, res) => {

   let id = req.params.id;
 // Find the expense by ID and remove it
   let deletedExpense = await Expense.findByIdAndRemove(id);
    console.log(deletedExpense);
    res.redirect("/expense")  
    })





module.exports = router