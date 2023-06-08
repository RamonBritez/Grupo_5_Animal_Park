const db = require("../database/models/index");
const { Op, Sequelize } = require("sequelize");

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
function formatPrice (price){return price.toFixed(2)};

const controller = {
  // Root - Show all products
  index: async (req, res) => {
    const page = req.query.page || 1; // Obtiene el número de página actual desde la consulta
    const limit = 16; // Establece el límite de productos por página
    const offset = (page - 1) * limit; // Calcula el desplazamiento de acuerdo a la página actual y el límite


    const { count, rows: products } = await db.Product.findAndCountAll({
      offset,
      limit,
      include: [
        {
          association: "images",
        }
      ],
    });
    const totalPages = Math.ceil(count / limit);
    const oferta = await db.Product.findAll({
      limit: 8,
      include: [
        {
          association: "images",
        }
      ],
      where: {
        discount: {
          [Sequelize.Op.gte]: 15
        },
      }
    });
    res.render("products/products", {
      products,
      totalPages,
      currentPage: page,
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
      formatPrice,
      session: req.session,
    });
  },

};

module.exports = controller;
