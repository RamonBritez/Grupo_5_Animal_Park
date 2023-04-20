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
  detail: async (req, res) => {
    let productId = req.params.id;
    let products = await db.Product.findAll({
      include: [{ association: "images" }],
    });
    let product = await db.Product.findByPk(productId, {
      include: [
        { association: "images" },
        { association: "category" },
        { association: "brand" },
        { association: "pet" },
      ],
    });
    res.render("products/detail", {
      product,
      products,
      toThousand,
      session: req.session,
    });
  },

  // Create - Form to create
  create: async (req, res) => {
    let products = await db.Product.findAll();
    res.render("products/products-create", {
      products,
      session: req.session,
    });
  },

  // Create -  Method to store
  store: async (req, res) => {
    const errors = validationResult(req);

    if (req.fileValidatorError) {
      errors.errors.push({
        value: "",
        msg: req.fileValidatorError,
        param: "image",
        location: "file",
      });
    }

    if (errors.isEmpty()) {
      /* 		  const products = readJSON("productsDB.json"); */
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

      const newProduct = {
        name: name.trim(),
        description: description.trim(),
        price: +price,
        discount: +discount,
        weight: +weight,
        category_id: +category,
        pet_id: +pet,
        active: 1,
        brand_id: +brand,
        /* image: files.length > 0 ? files : ['default.jpg'] */
      };

      const createdProduct = await db.Product.create(newProduct);

      const files = req.files.map((file) => {
        return {
          image: file.filename,
          product_id: createdProduct.id,
        };
      });
      const imageList =
        files.length > 0
          ? files
          : [
              {
                image: "default.jpg",
                product_id: createdProduct.id,
              },
            ];

      await db.ProductImage.bulkCreate(imageList);

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
        session: req.session,
      });
    }
  },

  // Update - Form to edit
  edit: async (req, res) => {
    let idProduct = Number(req.params.id);

    let product = await db.Product.findByPk(idProduct, {
      include: { all: true },
    });

    res.render("products/product-edit-form", {
      idProduct,
      product,
      session: req.session,
    });
  },

  // Update - Method to update
  update: async (req, res) => {
    const errors = validationResult(req);
    if (req.fileValidatorError) {
      errors.errors.push({
        value: "",
        msg: req.fileValidatorError,
        param: "image",
        location: "file",
      });
    }
    const files = req.files.map((file) => file.filename);
    let idProduct = req.params.id;
    if (errors.isEmpty()) {
      let {
        name,
        description,
        price,
        discount,
        weight,
        category_id,
        pet_id,
        brand_id,
      } = req.body;

      await db.Product.update(
        {
          name,
          description,
          price,
          discount,
          weight,
          category_id,
          pet_id,
          brand_id,
          active: 1,
        },
        {
          where: {
            id: idProduct,
          },
        }
      );
      return res.redirect("/products");
    } else {
      const product = db.Product.findByPk(idProduct);

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
