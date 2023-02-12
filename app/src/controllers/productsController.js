const fs = require('fs');
const path = require('path');

const productsDB = path.join(__dirname, '../database/productsDB.json');

const products = JSON.parse(fs.readFileSync(productsDB, 'utf-8'));

const writeJson = (products) => {
	fs.writeFileSync(productsDB, JSON.stringify(products), {encoding: "utf-8"})
}

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
 	index: (req, res) => {
		let oferta = products.filter(product => product.discount > 0);
		res.render("products/products", {
			products,
			toThousand,
			oferta
		})
	}, 

	// Detail - Detail from one product
	detail: (req, res) => {
		let productId = req.params.id;

		let product = products.find(product => product.id == productId);

		res.render("products/detail", {
			product,
			products,
			toThousand
		})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("products/products-create")
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let lastId = products[products.length -1].id;
		
		let newProduct = {
			id: lastId + 1,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			pet: req.body.pet,
			weight: req.body.weight,
			image: req.file ? req.file.filename : null
		}
		products.push(newProduct);

		writeJson(products);

		res.redirect(
			"/products"
		)
	},

	// Update - Form to edit
	edit: (req, res) => {
		let productId = Number(req.params.id);

		let productToEdit = products.find(product  => product.id === productId);

		res.render('products/product-edit-form', {
			productToEdit,
		})
	},
	
	
	// Update - Method to update
	update: (req, res) => {
		let productId = Number(req.params.id);
		products.forEach(product => {
			if(product.id === productId){
				product.name = req.body.name,
				product.price = req.body.price,
				product.discount = req.body.discount,
				product.category = req.body.category,
				product.description = req.body.description
			}
		});
		writeJson(products);
		
		res.redirect('/products');
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productId = Number(req.params.id);

		let newProductsArray = products.filter(product => product.id !== productId);


		writeJson(newProductsArray);

		res.redirect('/products');
	}
};

module.exports = controller;