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
        let listProduct = []
       

        products.forEach(product => {
		let porNombre = product.name.toLowerCase()
        let porPet = product.pet.toLowerCase()
        let porCategory = product.category.toLowerCase()

		if(porNombre.indexOf(text) !== -1 || porPet.indexOf(text) !== -1 || porCategory.indexOf(text) !== -1){
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