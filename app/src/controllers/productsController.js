const db = require("../database/models/index");

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  // Root - Show all products
  index: async (req, res) => {
    let products = await db.Product.findAll({
      include: [{ association: "images" }],
    });
    let oferta = products.filter((product) => product.discount >= 10);
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

};

module.exports = controller;
