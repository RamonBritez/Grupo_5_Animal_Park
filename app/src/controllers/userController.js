const { validationResult } = require("express-validator");
const fs = require('fs');
const { readJSON, writeJSON } = require("../old_database");
const bcrypt = require("bcryptjs");
const session = require("express-session");
let {User, Address} = require("../database/models")


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
                    name: user.first_name,
                    avatar: user.avatar,
                    rol: user.rol_id,
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
                res.redirect('/')
                });
            }else {
                console.log(req.session.user)
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
                first_name: userName,
                last_name:apellido,
                email,
                pass:  bcrypt.hashSync(password, 12),
                avatar: req.file ? req.file.filename : "avatar_default.jpeg",
                rol_id: 0
            })
            .then(() => {
                res.redirect('/users/login');
            })
            .catch((error) => console.log(error))

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

        User.findOne({
            where: {
            id: userInSessionId
        },
        include: [{
            association: 'address',
          }]
        })
        .then((user) => {
            res.render("users/userProfile", {
                user,
                address: user.address,
                session: req.session
            })
        })

    },

    edit:(req, res) =>{
        let userId = req.session.user.id;
        
        User.findOne({
            where: {
                id: userId
            },
            include: [{
                association: 'address',
            }]
        })
        .then((user) => {
            res.render('users/editUser',{
                session: req.session,
                user,
                address: user.address
            })
        })


    },

   
    processEdit: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()) {
            const {
                userName,
                apellido,
                tel,
                address,
                postal_code,
                province,
                city
            } = req.body;

            let userId = req.session.user.id;

            Address.create({
                address,
                postal_code,
                province,
                city,
                user_id: userId
            })
            .then((address) => {
                User.update({
                    first_name: userName,
                    last_name: apellido,
                    tel: tel,
                    avatar: req.file ? req.file.filename : User.avatar,
                    },{
                    where: {
                        id: userId
                    },
                })
                .then(() => {
                    return res.redirect("/users/profile");
                })
            })
        } else {
            return res.render("users/editUser", {
                user: userInSession,
                session: req.session,
                errors: errors.mapped(),
            })
        }
    }
}