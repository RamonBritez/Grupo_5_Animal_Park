const fs = require('fs');
const path = require('path');

const productsDB = path.join(__dirname, '../database/productsDB.json');

const products = JSON.parse(fs.readFileSync(productsDB, 'utf-8'));


module.exports = {

    
    
    index: (req, res) => {
        res.render("home", {products})
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