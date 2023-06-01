const { Product, Category } = require("../database/models");

const getProducts = async () => {
  try {
    return await Product.findAll({include:{association: "images"}});
  } catch (error) {
    console.error("Error while fetching Products:", error);
    throw new Error("Error fetching Products");
  }
};

const getProductsByCategoryId = async (categoryId) => {
  try {
    return await Product.findAll({
      where: {
        category_id: categoryId,
      },
    });
  } catch (error) {
    console.error("Error while fetching Products:", error);
    throw new Error("Error fetching Products");
  }
};
const getProductById = async (id) => {
  try {
    return await Product.findByPk(id, {
      include: { all: true },
    });
  } catch (error) {
    console.error("Error while fetching Product:", error);
    throw new Error("Error fetching Product");
  }
};
const insertProduct = async (ProductData) => {
  try {
    return await Product.create(ProductData);
  } catch (error) {
    console.error("Error while insert Product:", error);
    throw new Error("Error insert Product");
  }
};

const updateProduct = async (ProductData) => {
  try {
    return await Product.update(ProductData, { where: { id: ProductData.id } });
  } catch (error) {
    console.error("Error while update Product:", error);
    throw new Error("Error update Product");
  }
};

const deleteProduct = async (ProductId) => {
  try {
    return await Product.destroy({ where: { id: ProductId } });
  } catch (error) {
    console.error("Error while delete Product:", error);
    throw new Error("Error delete Product");
  }
};
const getCategories = async () => {
  try {
    return await Category.findAll({include:{
        association:"products"
    }})
  } catch (error) {
    console.error("Error while delete Product:", error);
    throw new Error("Error delete Product");}

};
module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  updateProduct,
  insertProduct,
  getProductsByCategoryId,
  getCategories,
};
