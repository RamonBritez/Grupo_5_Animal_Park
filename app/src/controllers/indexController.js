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

    search: (req, res) => {
		let { keywords } = req.query
        let text = keywords.toLowerCase()
		//let results = products.filter(product => product.name.toLowerCase() === keywords.toLowerCase())
        let listProduct = []

        let results = products.forEach(product => {
			let busqueda = product.name.toLowerCase()
			if(busqueda.indexOf(text) !== -1){
				listProduct.push(product)
				
			}
		})

		res.render(`products/results`, {
			keywords,
			listProduct,
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
    admin: (req, res) => {
        res.render("users/admin")
    },

}