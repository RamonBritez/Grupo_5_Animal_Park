const express = require("express");
const app = express();
const path = require("path");
app.use(express.static("public"));
const PORT = 3000;


/* Template engine config */
app.set("view engine", "ejs");
app.set("views", "./src/views");


/* Routers */
const indexRouter = require("./routes");
const forms = require("./routes/forms");


/* Routes Middlewares */
app.use("/", indexRouter);
app.use("/", forms);












app.listen(PORT,()=>{
    console.log(`
    server listen in port ${PORT}
    http://localhost:${PORT}`)
})

