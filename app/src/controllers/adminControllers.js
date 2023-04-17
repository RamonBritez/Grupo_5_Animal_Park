const fs = require('fs');
const path = require('path');
const { readJSON, writeJSON } = require("../old_database");
const { validationResult } = require("express-validator");


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
    processEdit:(req, res) =>{
        let errors = validationResult(req);

        if(errors.isEmpty()) {

            let userId = req.params.id;
            let user = users.find(user => user.id === userId);

            const {
                userName,
                apellido,
                tel,
                address,
                postal_code,
                province,
                city
            } = req.body;

            user.userName = userName;
            user.apellido = apellido;
            user.tel = tel;
            user.address = address;
            user.postal_code = postal_code;
            user.province = province;
            user.city = city;
            user.avatar = req.file ? req.file.filename : user.avatar;

            writeJSON("usersDB.json", users);

            delete user.pass;

            req.session.user = user;

            return res.redirect("/users/profile");
        } else {
            const userInSessionId = req.session.user.id;
            const userInSession = users.find(user => user.id === userInSessionId);

            return res.render("admin/userEdit", {
                user: userInSession,
                session: req.session,
                errors: errors.mapped(),
            })
        }

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
	},

    bannerEdit: (req, res) =>{
        res.render("admin/bannerEdit", {
            session: req.session
        })
    },

    bannerProcess: (req, res) =>{
        
        res.redirect("/admin/banner-edit")
    }
}


