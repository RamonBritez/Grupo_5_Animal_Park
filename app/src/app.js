const express = require("express");
const app = express();
const path = require("path");
app.use(express.static("public"));
const PORT = 3000;
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE


/* Template engine config */
app.set("view engine", "ejs");
app.set("views", "./src/views");
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* Routers */
const indexRouter = require("./routes");
const products = require("./routes/products");


/* Routes Middlewares */
app.use("/", indexRouter);
app.use("/products", products);












app.listen(PORT,()=>{
    console.log(`
    server listen in port ${PORT}
    http://localhost:${PORT}`)
})

