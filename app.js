const express = require("express");
const app = express();
const path = require("path");
app.use(express.static("public"));
const PORT = 3000;


app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "views/home.html"))

})

app.listen(PORT,()=>{
    console.log(`
    server listen in port ${PORT}
    http://localhost:${PORT}`)
})
