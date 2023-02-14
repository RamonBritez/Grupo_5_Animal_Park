const fs = require('fs');
const path = require('path');

const productsDB = path.join(__dirname, '../database/productsDB.json');

const products = JSON.parse(fs.readFileSync(productsDB, 'utf-8'));


module.exports = {

    
    
    index: (req, res) => {
        let oferta = products.filter(product => product.discount > 0);
        res.render("home", {
            products,
            oferta
        })
    },


    login: (req, res) => {
        res.render("users/Login")
    },
    
    error: (req, res) => {
        res.render("error")
    },

    register: (req, res) => {
        res.render("users/register")
    },
    carrito: (req, res) => {
        res.render("products/carrito")
    },
}