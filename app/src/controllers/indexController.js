const fs = require('fs');
const path = require('path');

const productsDB = path.join(__dirname, '../database/productsDB.json');

const products = JSON.parse(fs.readFileSync(productsDB, 'utf-8'));


module.exports = {

    
    
    index: (req, res) => {
        let oferta = products.filter(product => product.discount > 0);
        res.render("home", {
            products,
            oferta,
            session: req.session
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
            session: req.session
		})
	},
	
    error: (req, res) => {
        res.render("error",{
        session: req.session
    })
    },

    carrito: (req, res) => {
        let oferta = products.filter(product => product.discount > 0);
        res.render("products/carrito",{
        session: req.session,
        oferta
        })
    },
        
  
    admin: (req, res) => {
        res.render("users/admin")
    },

}