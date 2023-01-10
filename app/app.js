const express = require("express");
const app = express();
const path = require("path");
app.use(express.static("public"));
const PORT = 3000;


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/home.html"))
})

app.get("/Login", (req, res) => {
    res.sendFile(path.join(__dirname, "views/Login.html"))
})

app.get("/register", (req, res) => {

    res.sendFile(path.join(__dirname, "views/register.html"))

})
app.get("/carrito", (req, res) => {

    res.sendFile(path.join(__dirname, "views/carrito.html"))

})

app.get("/prueba", (req, res) => {

    res.sendFile(path.join(__dirname, "views/prueba.html"))

})

app.get("/prueba", (req, res) => {

    res.sendFile(path.join(__dirname, "views/prueba.html"))

})
app.get("/detalleProducto", (req, res) => {
    res.sendFile(path.join(__dirname, "views/detalleProducto.html"))
})


app.listen(PORT,()=>{
    console.log(`
    server listen in port ${PORT}
    http://localhost:${PORT}`)
})
