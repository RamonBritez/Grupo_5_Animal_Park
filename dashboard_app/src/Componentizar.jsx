import { useState, useEffect } from "react";
import "./App.css";
import { getProducts } from "./services/products.service";
import { getUsers } from "./services/users.service";

import productImg from "./assets/productImg.png";
import userImg from "./assets/userImg.png";
import Card from "./components/Card";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import Sidebar from "./components/Sidebar";
import CategoryCards from "./components/CategoryCards";

function Componentize({ children }) {
  const [products, setProducts] = useState(null);
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const userPromise = getUsers();
    const productPromise = getProducts();

    Promise.all([userPromise, productPromise]).then(([userResult, productResult]) => { 
      console.log(userResult);
      console.log(productResult);
      setUsers(userResult)
      setProducts(productResult)
    });
  }, []);

  return (
    /* ● 3 a 6 paneles simples con los siguientes totales:

○ Total de productos

○ Total de usuarios

○ Total de categorías

● Panel de detalle de último producto o usuario creado.

● Panel de categorías con el total de productos de cada una.

● Panel con el listado de productos */
    <div className="app-wrapper">
      <Header />
      <div className="content-wrapper">
        <Sidebar />
        <main className="content">
          <h1>Dashboard</h1>
          <div className="breakLine"></div>
          <section className="container">
            <Card title="Total de productos" number={products?.count} color="red" />
            <Card title="Total de usuarios" number={users?.count} color="green" />
          </section>
          <section className="container wrap">
            <p className="title">Productos por categoria</p>
            {products && <CategoryCards categoryList={products.countByCategories}/>}
          </section>
          <section className="container">
            <section className="container wrap back border round">
              <p className="title center">Ultimo producto creado</p>
              <section className="container">
                <img
                  src={productImg}
                  alt="IMAGEN"
                  className="productImage "
                />
                <section className="container col">
                  <p className="subtitle">Alimento para perros</p>
                  <p>Precio: 10</p>
                  <p>Descuento: 10</p>
                </section>
              </section>
            </section>
            <section className="container wrap back border round">
              <p className="title center">Ultimo usuario creado</p>
              <section className="container">
                <img
                  src={userImg}
                  alt="IMAGEN"
                  srcset=""
                  className="productImage"
                />
                <section className="container col">
                  <p className="subtitle">Hexanima</p>
                  <p>nico@fili.com</p>
                </section>
              </section>
            </section>
          </section>
          <section className="container back wrap">
            <p className="title">Todos los productos</p>
            <section className="productList">
              {products && products.products.map(product => <ProductCard src={`http://localhost:3000/image/products/${product.image}`} alt={""} name={product.name}/>)}
            </section>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Componentize;
