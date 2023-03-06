const fs = require('fs');
const path = require('path');
const { readJSON, writeJSON } = require("../database");


const products = readJSON("productsDB.json");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const users = readJSON("usersDB.json")


module.exports ={
    index: (req, res) => {
    
        res.render("users/admin", {
           users
        })
    },

    listProduct: (req, res) => {
		res.render("products/products-list", {
			products,
			toThousand,
            session: req.session
		})
	},
    
    listAdmin: (req, res) => {
        res.render("users/admin-list", {
            session: req.session,
            users
    })
    }
}


