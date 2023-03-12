const { validationResult } = require("express-validator");
const fs = require('fs');
const { readJSON, writeJSON } = require("../database");
const bcrypt = require("bcryptjs");
const session = require("express-session");


let users = readJSON("usersDB.json")
module.exports = {
    login: (req, res) => {
        res.render("users/login", { session: req.session })
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {

            let user = users.find(user => user.email === req.body.email);

            req.session.user = {
                id: user.id,
                name: user.userName,
                avatar: user.avatar,
                rol: user.rol
            }

            let tiempoDecookies = new Date(Date.now() + 60000);

            if(req.body.recordar){
                res.cookie("userAnimalPark", 
                req.session.user,
                {
                    expires: tiempoDecookies,
                    httpOnly: true                 
                })
            }

            res.locals.user = req.session.user;
            res.redirect("/")

          /*  if(req.session.user.rol !== "ADMIN"){
                res.redirect("/");
            }else {
                res.redirect("/admin")
            }*/
            
        }  else {
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
            let lastId = 0;

            users.forEach(user => {
             if(user.id > lastId) {
                 lastId = user.id;
             }
            });
            
            let {userName, apellido, email, password} = req.body;

            let newUser = {
             id: lastId + 1,
             userName,
             apellido,
             email,
             password:  bcrypt.hashSync(password, 12),
             avatar: req.file ? req.file.filename : "avatar_default.jpeg",
             rol: "USER",
             tel: "",
             address: "",
             postal_code:"",
             province:"",
             city:""

            };
     
            users.push(newUser);
     
            writeJSON("usersDB.json", users);
     
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
        if(req.cookies.userArtisticaDali){
            res.cookie("userAnimalPark", "", {maxAge: -1})
        }

        res.redirect("/");
    },

    edit:(req, res) =>{
        let userId = Number(req.session.id)
        let userToEdit = users.find(user  => user.id === userId);
        res.render('users/edit',{
            session: req.session,
            ...userToEdit
        })
    },

    processEdit:(req, res) =>{
        let errors = validationResult(req);
        
        if(errors.isEmpty()) {
            const users = readJSON("usersDB.json");
            let {userName, apellido,avatar,tel, address,postal_code,province,city} = req.body;

            const userModify = users.map((user) => {
                if (user.id === req.params.id) {
                  let userModify = {
                    ...user,
                    userName,
                    apellido,
                    tel,
                    address,
                    postal_code,
                    province,
                    city,
                    avatar: req.file ? req.file.filename : user.avatar,
                  };
        
                  if (req.file) {
                    fs.existsSync(`./public/image/products/${user.image}`) &&
                    fs.unlinkSync(`./public/image/products/${user.image}`);
                  }
        
                  return userModify;
                }
                return user;
              });

            writeJSON("usersDB.json", userModify);
           
            req.session.save((err) => {
                res.redirect('/');
            })
     
            } else {
               
                const users = readJSON("usersDB.json");
                let userId = Number(req.params.id)
                let userToEdit = users.find(user  => user.id === userId);
                
                if (req.file) {
                    fs.existsSync(`./public/image/products/${req.file.filename}`) &&
                      fs.unlinkSync(`./public/image/products/${req.file.filename}`);
                  }

                return res.render(`users/edit`, {
                  ...userToEdit,
                  errors: errors.mapped(),
                  old: req.body,
                  session: req.session
                });       
            }
    }

}