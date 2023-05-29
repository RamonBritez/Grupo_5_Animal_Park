const {
  getProducts,
  getProductById,
  getCategories,
} = require("../../services/product.service");
module.exports = {
  getProducts: async (req, res) => {
    try {
      const products = await getProducts();
      const productsResponse = products.map(
        ({ id, name, description, category }) => {
          return {
            id,
            name,
            description,
            category,
            detail: "/api/products/" + id,
          };
        }
      );
const categories=await getCategories()
const categoriesResult=categories.map(category=>{
    return{
        id:category.id,
        name: category.name,
    count:category.products.length
    }
})
      const RESPONSE = {
        count: products.length,
        countByCategories: categoriesResult,
        products: productsResponse,
      };

      return res.status(200).json(RESPONSE);
    } catch (error) {
      return res.status(500).json({ Error: error });
    }
  },
  getProductById: async (req, res) => {
    try {
      let productId = req.params.id;
      let product = await getProductById(productId);

      if (product) {
        let {
          id,
          name,
          description,
          price,
          discount,
          weight,
          category,
          pet,
          brand,
        } = product;
        const PRODUCT_DATA_RESPONSE = {
          id,
          name,
          description,
          price,
          discount,
          weight,
          category,
          pet,
          brand,
        };
        return res.status(200).json(PRODUCT_DATA_RESPONSE);
      } else {
        return res
          .status(400)
          .json({ msg: "el producto " + productId + " no existe" });
      }
    } catch (error) {
      return res.status(500).json({
        Error: error,
      });
    }
  },
};
