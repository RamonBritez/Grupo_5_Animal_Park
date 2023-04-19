const fs = require('fs');
const path = require('path');
const { validationResult } = require("express-validator");
const { readJSON, writeJSON } = require("../old_database");

const products = readJSON("productsDB.json");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
 	index: (req, res) => {
		let oferta = products.filter(product => product.discount > 0);
		res.render("products/products", {
			products,
			toThousand,
			oferta,
            session: req.session
		})
	},

 

	// Detail - Detail from one product
	detail: (req, res) => {
		let productId = req.params.id;

		let product = products.find(product => product.id == productId);

		res.render("products/detail", {
			product,
			products,
			toThousand,
            session: req.session
		})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render("products/products-create", {
			products: readJSON("productsDB.json"),
            session: req.session
		})
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const errors = validationResult(req);
		
		if(req.fileValidatorError){
		  errors.errors.push({
			value: "",
			msg: req.fileValidatorError,
			param: "image",
			location: "file",
		  });
		}

		const files = req.files.map(file => file.filename)

		if (errors.isEmpty()) {
		  const products = readJSON("productsDB.json");
		  const { name, brand, price, category, pet,description, discount, weight } = req.body;
		  
		  const newProduct = {
			id: products.length ? products[products.length - 1].id + 1 : 1,
			name: name.trim(),
			brand: brand,
			price: +price ,
			discount: +discount,
			category,
			weight,
			description: description.trim(),
			pet,
			image: files.length > 0 ? files : ['default.jpg']
		  };
	
		  products.push(newProduct);
	
		  writeJSON("productsDB.json", products);
		  
		  return res.redirect("/products");
		} else {
		  if (req.file) {
			fs.existsSync(`./public/image/products/${req.file.filename}`) &&
			  fs.unlinkSync(`./public/image/products/${req.file.filename}`);
		  }
	
		  return res.render("products/products-create", {
			errors: errors.mapped(),
			old: req.body,
			products,
			session: req.session
		  });
		}
	  },

	// Update - Form to edit
	edit: (req, res) => {
		products: readJSON("productsDB.json")
		let productId = Number(req.params.id);

		let productToEdit = products.find(product  => product.id === productId);

		res.render('products/product-edit-form', {
			...productToEdit,
            session: req.session
		})
	},
	
	
	// Update - Method to update

	// Delete - Delete one product from DB
/* 	destroy: (req, res) => {
		let productId = Number(req.params.id);

		let newProductsArray = products.filter(product => product.id !== productId);

		writeJSON("productsDB.json", newProductsArray);

		res.redirect('/products');
	} */
};

module.exports = controller;