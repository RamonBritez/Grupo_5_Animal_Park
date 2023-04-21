const fs = require("fs");
const path = require("path");
const { validationResult } = require("express-validator");
const db = require("../database/models");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  index: (req, res) => {
    res.render("admin/index", {
      session: req.session,
    });
  },
  userEdit: async (req, res) => {
    let userId = Number(req.params.id);
    let userToEdit = await db.User.findByPk(userId, {
      include: {all: true}
    });
    res.render("admin/userEdit", {
      user: userToEdit,
      session: req.session,
    });
  },
  processEdit: async (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let userId = req.params.id;
      let userToEdit = await db.User.findByPk(userId);

      const { userName, apellido, tel, address, postal_code, province, city } =
        req.body;

      user.userName = userName;
      user.apellido = apellido;
      user.tel = tel;
      user.address = address;
      user.postal_code = postal_code;
      user.province = province;
      user.city = city;
      user.avatar = req.file ? req.file.filename : user.avatar;

      delete user.pass;

      req.session.user = user;

      return res.redirect("/users/profile");
    } else {
      const userInSessionId = req.session.user.id;
      const userInSession = await db.User.findByPk(userInSessionId);

      return res.render("admin/userEdit", {
        user: userInSession,
        session: req.session,
        errors: errors.mapped(),
      });
    }
  },
  listProduct: async (req, res) => {
    let products = await db.Product.findAll({
      include: [
        {
          association: "images",
        },
        {
          association: "brand",
        },
        {
          association: "category",
        },
        {
          association: "pet",
        },
      ],
    });

    res.render("admin/products-list", {
      products,
      toThousand,
      session: req.session,
    });
  },

  listAdmin: async (req, res) => {
    let users = await db.User.findAll({include: {all: true}});
    res.render("admin/admin-list", {
      session: req.session,
      users,
    });
  },

  destroy: async (req, res) => {
    let userId = Number(req.params.id);
    await db.User.destroy({
      where: {
        id: userId,
      },
    });

    res.redirect("/");
  },

  bannerEdit: (req, res) => {
    res.render("admin/bannerEdit", {
      session: req.session,
    });
  },

  bannerProcess: (req, res) => {
    res.redirect("/admin/banner-edit");
  },
};
