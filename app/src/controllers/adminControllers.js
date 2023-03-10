const fs = require('fs');
const path = require('path');
const { readJSON, writeJSON } = require("../database");


const products = readJSON("productsDB.json");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const users = readJSON("usersDB.json")


module.exports ={
    index: (req, res) => {
    
        res.render("admin/index", {
            session: req.session
        })
    },
    userEdit: (req, res) => {
        let userId = Number(req.params.id) 
        let userToEdit = users.find(user => user.id === userId )
        res.render("admin/userEdit", {
           ...userToEdit,
           session: req.session

        })
    },
    listProduct: (req, res) => {
		res.render("admin/products-list", {
			products,
			toThousand,
            session: req.session
		})
	},
    
    listAdmin: (req, res) => {
        res.render("admin/admin-list", {
            session: req.session,
            users
    })
    },
   
    destroy : (req, res) => {
		let userId = Number(req.params.id);

		let newUserArray = users.filter(user => user.id !== userId);

		writeJSON("usersDB.json", newUserArray);

		res.redirect('/');
	}
}


