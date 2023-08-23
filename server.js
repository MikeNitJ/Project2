const express = require("express")
const app = express()
const PORT = 3000
const expressLayouts = require("express-ejs-layouts")
const accountRoutes = require("./controllers/accountController")
const session = require("express-session")
const incomeRoutes = require("./controllers/appController")
const methodOverride = require("method-override");

app.set("view engine", "ejs")


app.use(express.static("public"))
app.use(methodOverride("_method"));
app.use(expressLayouts)
app.use(express.urlencoded({extended: true}))
app.use(
    session({ secret: "Hello", cookie: {maxAge: 3600000}})
)
app.use(accountRoutes)


app.get("/", (req,res) =>{
    res.render("home.ejs")
})


app.use((req, res, next) => {
    if (!req.session.userId) {
      res.redirect("/login");
      return;
    }
  
    next();
  });






app.use(incomeRoutes)

// app.use("/coffee", coffeeRoutes);


app.listen(PORT, () => console.log(PORT, "is real"))