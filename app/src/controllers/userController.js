const { validationResult } = require("express-validator");
const fs = require('fs');
const { readJSON, writeJSON } = require("../old_database");
const bcrypt = require("bcryptjs");
const session = require("express-session");
let {User, address, Role} = require("../database/models")


let users = readJSON("usersDB.json")
module.exports = {
    login: (req, res) => {
        res.render("users/login", { session: req.session })
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

            User.findOne({
                where: {
                    email: req.body.email
                },

            })
            .then((user) =>{
                req.session.user = {
                    id: user.id,
                    name: user.userName,
                    avatar: user.avatar,
                    rol: user.rol,
                    email: user.email,
                }
    
                let tiempoDecookies = new Date(Date.now() + 60000);
                if(req.body.recordar){
                    res.cookie("AnimalPark", 
                    req.session.user,
                    {
                        expires: tiempoDecookies,
                        httpOnly: true                 
                    })
                } 
                
                res.locals.user = req.session.user;
                res.redirect("/") 
                });
            }else {
                return res.render("users/login", {
                    errors: errors.mapped(),
                    session: req.session
                })
                }
    },

    register: (req, res) => {
        res.render("users/register")
    },

    processRegister: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()) {
            
            let {userName, apellido, email, password} = req.body;

            User.create({
                userName,
                apellido,
                email,
                password
            })

     
            res.redirect('/users/login');
            } else {
            res.render("users/register", {
                errors: errors.mapped(),
                old: req.body,
                session: req.session
            })
        }
    },
    logout : (req, res) => {
        req.session.destroy();
        if(req.cookies.userAnimalpark){
            res.cookie("userAnimalPark", "", {maxAge: -1})
        }

        res.redirect("/");
    },
    profile: (req, res) => {
        let userInSessionId = req.session.user.id;

        let userInSession = users.find(user => user.id === userInSessionId);

        res.render("users/userProfile", {
            user: userInSession,
            session: req.session
        })
    },

    edit:(req, res) =>{
        let userId = req.session.user.id;
        let userToEdit = users.find(user  => user.id === userId);
        
        res.render('users/editUser',{
            session: req.session,
            user: userToEdit
        })
    },

   
    processEdit: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()) {

            let userId = req.session.user.id;
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

            return res.render("users/editUser", {
                user: userInSession,
                session: req.session,
                errors: errors.mapped(),
            })
        }
    }
}