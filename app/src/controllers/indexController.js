module.exports = {
    
    index: (req, res) => {
        res.render("home")
    },


    login: (req, res) => {
        res.render("Login")
    },
    
    error: (req, res) => {
        res.render("error")
    },

    detalleProducto:(req, res) => {
        res.render("detalleProducto")
    },
}