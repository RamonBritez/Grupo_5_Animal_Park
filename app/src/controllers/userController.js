const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const session = require("express-session");
let {User, Address} = require("../database/models");
const { where } = require("sequelize");
const { error } = require("console");
const path = require("path");
const fs = require('fs');



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
                include: {
                    all: true,
                    nested: true
                }

            })
            .then((user) =>{
                req.session.user = {
                    id: user.id,
                    name: user.first_name,
                    avatar: user.avatar,
                    rol: user.rol_id,
                    email: user.email,
                    carrito: user.orders
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
                rol_id: 0,
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
            
            
                Address.upsert({
                    address,
                    postal_code,
                    province,
                    city,
                    user_id: userId
                })
                .then(() => {
                    let oldAvatarPath; 
                    User.findByPk(userId)
                    .then(user => {
                        // tenemos la imagen anterior
                        oldAvatarPath = user.avatar ? path.join(__dirname, '..','..', 'public', 'image','users', user.avatar) : '';
                
                        // Actualizamos los datos
                        user.first_name = userName;
                        user.last_name = apellido;
                        user.tel = tel;
                        user.avatar = req.file ? req.file.filename : user.avatar;
                        return user.save();
                    })
                    .then(() => {
                        // Elimina la imagen anterior si es que lo cambia
                        if (oldAvatarPath && req.file && fs.existsSync(oldAvatarPath)) {
                            fs.unlinkSync(oldAvatarPath);
                        }
                
                        return res.redirect("/users/profile");
                    })
                })
            
        } else {
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
                return res.render("users/editUser", {
                    user,
                    address: user.Address,
                    session: req.session,
                    errors: errors.mapped(),
                })
            })
        }
    },

    destroyUser: (req, res) => {
        let userInSessionId = req.session.user.id
        req.session.destroy();
        if (req.cookies.userAnimalpark){
          res.cookie('AnimalPark','',{maxAge:-1});
        }
        User.destroy({
          where:{
            id : userInSessionId
          }
        })
        return res.redirect('/') 
      },
}