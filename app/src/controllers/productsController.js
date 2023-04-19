const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const { readJSON, writeJSON } = require("../old_database");
const db = require("../database/models/index");
const { Op } = require("sequelize");

const products = readJSON("productsDB.json");

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  // Root - Show all products
  index: async (req, res) => {
    let products = await db.Product.findAll({
      include: [{ association: "images" }],
    });
    let oferta = products.filter((product) => product.discount > 0);
    res.render("products/products", {
      products,
      toThousand,
      oferta,
      session: req.session,
    });
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    let productId = req.params.id;
    let product = products.find((product) => product.id == productId);
    v;
    res.render("products/detail", {
      product,
      products,
      toThousand,
      session: req.session,
    });
  },

	// Create - Form to create
	create: async (req, res) => {
		let products = await db.Product.findAll()
		res.render("products/products-create", {
			products,
            session: req.session
		})
	},
	
	// Create -  Method to store
	store: async (req, res) => {
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
/* 		  const products = readJSON("productsDB.json"); */
		  const { name, brand, price, category, pet,description, discount, weight } = req.body;
		  
		  const newProduct = {
			name: name.trim(),
			description: description.trim(),
			price: +price ,
			discount: +discount,
			weight: +weight,
			category_id: +category,
			pet_id: +pet,
			active: 1,
			brand_id: +brand,
			/* image: files.length > 0 ? files : ['default.jpg'] */
		  };

		  const createdProduct = await db.Product.create(newProduct)

		  const files = req.files.map(file => {
			  return {
				  image: file.filename,
				  product_id: createdProduct.id
				}
			})
			const imageList = files.length > 0 ? files : [{
				image: 'default.jpg',
				product_id: createdProduct.id
			}]

		  await db.ProductImage.bulkCreate(imageList)
		  
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
    products: readJSON("productsDB.json");
    let productId = Number(req.params.id);

    let productToEdit = products.find((product) => product.id === productId);

    res.render("products/product-edit-form", {
      ...productToEdit,
      session: req.session,
    });
  },

  // Update - Method to update
  update: (req, res) => {
    const errors = validationResult(req);
/*Cambio de prueba */
    if (req.fileValidatorError) {
      errors.errors.push({
        value: "",
        msg: req.fileValidatorError,
        param: "image",
        location: "file",
      });
    }
    const files = req.files.map((file) => file.filename);

    if (errors.isEmpty()) {
      const {
        name,
        brand,
        price,
        category,
        pet,
        description,
        discount,
        weight,
      } = req.body;
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
            image: files.length > 0 ? files : [product.image],
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
        session: req.session,
      });
    }
  },

// Delete - Delete one product from DB
destroy: async (req, res) => {
    let productId = Number(req.params.id);
    await db.Product.destroy({
      where: {
        id: productId,
      },
    });

    res.redirect("/products");
  },
};

module.exports = controller;
