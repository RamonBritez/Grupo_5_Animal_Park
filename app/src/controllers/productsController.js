const fs = require('fs');
const path = require('path');
const { validationResult } = require("express-validator");
const { readJSON, writeJSON } = require("../database");

const products = readJSON("productsDB.json");

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
		res.render("products/products-create", {
			products: readJSON("productsDB.json"),
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
	
		if (!req.file) {
		  errors.errors.push({
			value: "",
			msg: "El producto debe tener una imagen",
			param: "image",
			location: "file",
		  });
		}
	
		if (errors.isEmpty()) {
		  const products = readJSON("productsDB.json");
		  const { name, brand, price, category, pet,description, discount, weight} = req.body;
	
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
			image: req.file.filename,
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
			products
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
		})
	},
	
	
	// Update - Method to update
	update: (req, res) => {
		const errors = validationResult(req);
	
		if(req.fileValidatorError){
		  errors.errors.push({
			value: "",
			msg: req.fileValidatorError,
			param: "image",
			location: "file",
		  });
		}
	
		if (errors.isEmpty()) {
		  const { name, brand, price, category, pet ,description, discount, weight} = req.body;
		  const products = readJSON("productsDB.json");
	
		  const productsModify = products.map((product) => {
			if (product.id === +req.params.id) {
			  let productModify = {
				...product,
				name: name.trim(),
				brand,
				price: +price,
				discount: +discount,
				category,
				pet,
				weight,
				description: description.trim(),
				image: req.file ? req.file.filename : product.image,
			  };
	
			  if (req.file) {
				fs.existsSync(`./public/image/products/${product.image}`) &&
				  fs.unlinkSync(`./public/image/products/${product.image}`);
			  }
	
			  return productModify;
			}
			return product;
		  });
	
		  writeJSON("productsDB.json", productsModify);
	
		  return res.redirect("/products");
		} else {
		  const products = readJSON("productsDB.json");
	
		  const product = products.find((product) => product.id === +req.params.id);
	
		  if (req.file) {
			fs.existsSync(`./public/image/products/${req.file.filename}`) &&
			  fs.unlinkSync(`./public/image/products/${req.file.filename}`);
		  }
	
		  return res.render("products/product-edit-form", {
			...product,
			errors: errors.mapped(),
			old: req.body,
		  });
		}
	  },

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productId = Number(req.params.id);

		let newProductsArray = products.filter(product => product.id !== productId);


		writeJSON("productsDB.json", newProductsArray);

		res.redirect('/products');
	}
};

module.exports = controller;