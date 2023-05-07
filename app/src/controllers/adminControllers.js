const fs = require("fs");
const { validationResult } = require("express-validator");
const db = require("../database/models");
const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  index: (req, res) => {
    res.render("admin/index", {
      session: req.session,
    });
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
  //Edicion de usuarios
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
  destroyUser: async (req, res) => {
    let userId = Number(req.params.id);
    await db.User.destroy({
      where: {
        id: userId,
      },
    });

    res.redirect("/admin/admin-list");
  },
//Edicion de productos
  create: async (req, res) => {
    const CATEGORIES_PROMISE = db.Category.findAll()
    const PET_PROMISE = db.Pet.findAll()
    const PRODUDUCT_PROMISE = db.Product.findAll()
    const BRAND_PROMISE = db.Brand.findAll()

    Promise.all([CATEGORIES_PROMISE,PET_PROMISE,PRODUDUCT_PROMISE,BRAND_PROMISE])
    .then(([categories, pets, product,brands])=>{
      res.render("products/products-create", {
        product,
        pets,
        brands,
        categories,
        session: req.session,
      });
    })

  },
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

    const CATEGORIES_PROMISE = db.Category.findAll()
    const PET_PROMISE = db.Pet.findAll()
    const PRODUDUCT_PROMISE = db.Product.findAll()
    const BRAND_PROMISE = db.Brand.findAll()
    Promise.all([CATEGORIES_PROMISE,PET_PROMISE,PRODUDUCT_PROMISE,BRAND_PROMISE])
    .then(([categories, pets, product,brands])=>{
      res.render("products/products-create", {
        product,
        pets,
        brands,
        categories,
        errors: errors.mapped(),
        old: req.body,
        product,
        session: req.session,
      });
    })  
    }
  },
  edit: (req, res) => {
    let idProduct = Number(req.params.id);
    
    /*let product = await db.Product.findByPk(idProduct, {
      include: { all: true },
    });

    res.render("products/product-edit-form", {
      idProduct,
      product,
      session: req.session,
    });*/

    const PRODUCT_PROMISE = db.Product.findByPk(idProduct);
    const PET_PROMISE = db.Pet.findAll();
    const CATEGORY_PROMISE = db.Category.findAll();
    const BRAND_PROMISE = db.Brand.findAll();

    Promise.all([PRODUCT_PROMISE,PET_PROMISE,CATEGORY_PROMISE,BRAND_PROMISE])    
    .then(([product,pets,categories,brands])=>{
      res.render("products/product-edit-form", {
        pets,
        brands,
        categories,
        product,
        session: req.session,
      })
    })
  },
  update:  (req, res) => {
    const errors = validationResult(req);
    if (req.fileValidatorError) {
      errors.errors.push({
        value: "",
        msg: req.fileValidatorError,
        param: "image",
        location: "file",
      });
    }
    
    let idProduct = req.params.id;
    console.log(idProduct)
    if (errors.isEmpty()) {
      let {
        name,
        description,
        price,
        discount,
        weight,
        category,
        pet,
        brand,
      } = req.body;

       db.Product.update(
        {
          name,
          description,
          price,
          discount,
          weight,
          category_id : category,
          pet_id : pet,
          brand_id : brand,
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
      const PRODUCT_PROMISE = db.Product.findByPk(idProduct);
      const PET_PROMISE = db.Pet.findAll();
      const CATEGORY_PROMISE = db.Category.findAll();
      const BRAND_PROMISE = db.Brand.findAll();

      if (req.file) {
        fs.existsSync(`./public/image/products/${req.file.filename}`) &&
          fs.unlinkSync(`./public/image/products/${req.file.filename}`);
      }
      Promise.all([PRODUCT_PROMISE,PET_PROMISE,CATEGORY_PROMISE,BRAND_PROMISE])
      .then(([product,pets,categories,brands]) => {
        return res.render("products/product-edit-form", {
          product,
          brands,
          categories,
          pets,
          idProduct,
          errors: errors.mapped(),
          old: req.body,
          session: req.session,
        });

      })
    }
  },
  productDestroy: (req, res) => {
   /* 
    await db.Product.destroy({
      where: {
        id: productId,
      },
    });

    res.redirect("/products");*/
    let productId = Number(req.params.id);
    db.ProductImage.findAll({
      where : {
        product_id: productId
      }
    })
    .then((images) => {
      images.forEach((productImage) => {
       let MATCH
       if (productImage.image !== "default.jpg") {
         MATCH = fs.existsSync("./public/image/products/", productImage.image);
       }
        if(MATCH){
          try {
            fs.unlinkSync(`./public/image/products/${productImage.image}`)
          } catch (error) {
            throw new Error(error)                    
          }
        }else{
          console.log("No se encontró el archivo");
        }
      })
     db.ProductImage.destroy({
        where: {
          product_id: productId,
        }
      })
      .then(() => {
       db.Product.destroy({
          where: {
            id: productId
          }
        })
        .then(() => res.redirect("/products"))
      })
    })
    .catch(error => console.log(error))
  },

//Manipulacion Banner
  bannerEdit: (req, res) => {
    res.render("admin/bannerEdit", {
      session: req.session,
    });
  },
  bannerProcess: (req, res) => {
    res.redirect("/admin/banner-edit");
  },
};
