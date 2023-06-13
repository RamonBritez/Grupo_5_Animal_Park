const db = require("../database/models");
const { Op } = require("sequelize");

module.exports = {
  index: (req, res) => {
    db.Product.findAll({
      limit:15,
      include: [
        {
          association: "images",
        },
      ],
    }).then((products) => {
      let oferta = products.filter((product) => product.discount >= 5);

      res.render("home", {
        products,
        oferta,
        session: req.session,
      });
    });
  },

  search: async (req, res) => {
    //Capturador de input busqueda y convertir a minusculas para ser indiferente en la busqueda del nombre
    let { keywords } = req.query;
    let text = keywords.toLowerCase();

    //Seteo de condiciones para paginado
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
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${text}%` } },
          { description: { [Op.like]: `%${text}%` } },
        ],
      }
    })
    
    // Calcula el número total de paginas
      const totalPages = Math.ceil(count / limit);

      res.render(`products/results`, {
       products,
       totalPages,
       currentPage: page,
       keywords,
       session: req.session
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

  aboutUs: (req, res) => {
    res.render("aboutUs", {
      session: req.session
    })
  }
};
