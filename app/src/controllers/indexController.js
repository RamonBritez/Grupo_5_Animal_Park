const db = require("../database/models");
const { Op } = require("sequelize");

module.exports = {
  index: (req, res) => {
    db.Product.findAll({
      include: [
        {
          association: "images",
        },
      ],
    }).then((products) => {
      let oferta = products.filter((product) => product.discount > 0);

      res.render("home", {
        products,
        oferta,
        session: req.session,
      });
    });
  },

  search: (req, res) => {
    let { keywords } = req.query;
    let text = keywords.toLowerCase();
    db.Product.findAll({
      include: [
        {
          association: "images",
        },
        {
          association: "pet",
        },
        {
          association: "category",
        },
      ],
      /* include: [
            
        ],*/
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${text}%` } },
          { description: { [Op.like]: `%${text}%` } },
          { "$pet.pet$": { [Op.like]: `%${text}%` } },
          { "$category.name$": { [Op.like]: `%${text}%` } },
        ],
      },
    }).then((products) => {
      res.render(`products/results`, {
        keywords,
        products,
        session: req.session,
      });
    });
  },
  admin: (req, res) => {
    res.render("users/admin");
  },
  error: (req, res) => {
    res.render("error", {
      session: req.session,
    });
  },

  carrito: async (req, res) => {
    let products = await db.Product.findAll({
      include: [
        {
          association: "images",
        },
      ],
    });
    let oferta = products.filter((product) => product.discount > 0);
    let carrito = [];

    req.session.user.carrito.forEach((idproducto) => {
      let productoEncontrado = products.find((producto) => {
        return producto.id == idproducto;
      });
      carrito.push(productoEncontrado);
    });
    res.render("products/carrito", {
      session: req.session,
      oferta,
      carrito,
    });
  },
  comprar: (req, res) => {
    let productoGuardado = req.params.id;
    req.session.user.carrito.push(Number(productoGuardado));
    res.redirect("/carrito");
  },
};
