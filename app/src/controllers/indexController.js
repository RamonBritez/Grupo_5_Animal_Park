const fs = require('fs');
const path = require('path');

const { Op } = require("sequelize")
const {Product, Category, Sequelize} = require("../database/models")
//const productsDB = path.join(__dirname, '../old_database/productsDB.json');
//const products = JSON.parse(fs.readFileSync(productsDB, 'utf-8'));


module.exports = {



    
    
    index: (req, res) => {
        
       /* let oferta = products.filter(product => product.discount > 0);
        res.render("home", {
            products,
            oferta,
            session: req.session
        })*/
        Product.findAll({
           include: [ {
            association: "images"
           }]
        })
        .then(products =>
            {
                let oferta = products.filter(product => product.discount > 0);
                
                
                res.render("home", {
                    products,
                    oferta,
                    session: req.session
                })
            } )
       .catch(error => console.log(error))
    },

    search: (req, res) => {
        let { keywords } = req.query
        let text = keywords.toLowerCase()
       /*
       search: (req, res) => {
        let busqueda = req.query.search.toLowerCase()
        Auto.findAll({
            where: {
                [Op.or]: [
                    { marca: {[Op.substring]: busqueda}},
                    { modelo: {[Op.substring]: busqueda}},
                    { color: {[Op.substring]: busqueda}}
                ]
            },
        })
        .then(autos => {
            res.render('search',{
                autos,
                busqueda,
            })
        })
        .catch(errors => console.log(errors))    }
       */
        Product.findAll({
            include: [ {
                association: "images"
               }],
           /* include: [
                {
                  association: "pet",
                },
            ],*/
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${text}%` } },
                    { description: { [Op.like]: `%${text}%` } },
                  //  { pet: { [Op.like]: `%${text}%` } }
                ]
            },
          
        })
        .then(products =>{
            res.render(`products/results`, {
                keywords,
                products,
                session: req.session
            })
        })
		
	},
	 admin: (req, res) => {
        res.render("users/admin")
    },
    error: (req, res) => {
        res.render("error",{
        session: req.session
    })
    },

    carrito: (req, res) => {
        let oferta = products.filter(product => product.discount > 0);
        let carrito = [ ]
        
        req.session.user.carrito.forEach(idproducto=>{
            let productoEncontrado=products.find(producto=>{
                return producto.id==idproducto
            })
            carrito.push(productoEncontrado)
        })
        res.render("products/carrito",{
            session: req.session,
               oferta,carrito
      
        })
    }, 
    comprar:(req,res)=>{
    let productoGuardado=req.params.id;
   req.session.user.carrito.push(Number(productoGuardado))
   res.redirect("/carrito")
},
   /*  borrarProducto:(req,res)=>{
        let id=req.body.id;
        let borrar=producto.filter(producto=>{
         })
    } */
}