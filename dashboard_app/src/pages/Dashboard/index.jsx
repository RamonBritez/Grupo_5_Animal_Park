import { useState, useEffect } from "react";
import "../../App.css";
import styles from "./index.module.css"
import { getProducts, getProductById } from "../../services/products.service";
import { getUsers, getUserById } from "../../services/users.service";

import CategoryCards from "../../components/CategoryCards";
import LastCreated from "../../components/LastCreated";
import Totals from "../../components/Totals";
import ProductList from "../../components/ProductList";
import { Container,Col,Row } from "react-bootstrap";

function Dashboard() {
  const [products, setProducts] = useState(null);
  const [users, setUsers] = useState(null);
  const [lastProduct, setLastProduct] = useState(null);
  const [lastUser, setLastUser] = useState(null);

  useEffect(() => {
    const userPromise = getUsers();
    const productPromise = getProducts();

    Promise.all([userPromise, productPromise]).then(
      ([userResult, productResult]) => {
        setUsers(userResult);
        setProducts(productResult);
      }
    );
  }, []);

  useEffect(() => {
    if (products && users) {
      let lastProductId = products.products[products.products.length - 1].id;
      let lastUserId = users.users[users.users.length - 1].id;

      const lastUserPromise = getUserById(lastUserId);
      const lastProductPromise = getProductById(lastProductId);

      Promise.all([lastUserPromise, lastProductPromise]).then(
        ([userResult, productResult]) => {
          console.log(userResult);
          setLastUser(userResult);
          setLastProduct(productResult);
        }
      );
    }
  }, [products, users]);

  return (
    
      <Row>

      <h1>Dashboard</h1>

      <div className="breakLine"></div>

      {products && users && (
        <Totals productCount={products.count} userCount={users.count} />
        )}

      {products && <CategoryCards categoryList={products.countByCategories} />}

      {lastProduct && lastUser && (
        <LastCreated product={lastProduct} user={lastUser} />
        )}

      {products && <ProductList products={products} />}
        </Row>
   
  );
}

export default Dashboard;
