const express = require("express");
const app = express();
const path = require("path");
app.use(express.static("public"));
const PORT = 3000;
const methodOverride = require("method-override"); // Pasar poder usar los métodos PUT y DELETE
const session = require("express-session");
const cookieParser = require("cookie-parser");
const { isAdmin } = require("./middlewares/userCheck");
const cookieCheck = require("./middlewares/cookieCheck"); //Reqiero el cookieCheck

/* Template engine config */
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(methodOverride("_method")); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "AnimalPark",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(cookieCheck);// Uso el cookieCheck

/* Routers */
const indexRouter = require("./routes");
const products = require("./routes/products");
const admin = require("./routes/admin");
const userRouter = require("./routes/users");

/* Routes Middlewares */
app.use("/", indexRouter);
app.use("/products", products);
app.use("/admin", isAdmin, admin);
app.use("/users", userRouter);

/* let db = require("./database/models")

app.get("/pruebaModel", (req, res) => {
  db.Product.findAll().then(products => res.json(products))
}) */

app.use((req,res,next) => {
  res.status(404).render("error", {
    session: req.session
})
})

app.listen(PORT, () => {
  console.log(`
    server listen in port ${PORT}
    http://localhost:${PORT}`);
});
