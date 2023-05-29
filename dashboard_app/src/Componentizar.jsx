import "./App.css";

import productImg from "./assets/productImg.png";
import userImg from "./assets/userImg.png";
import Card from "./components/Card";
import Header from "./components/Header";
import ProductCard from "./components/ProductCard";
import Sidebar from "./components/Sidebar";

function Componentize({ children }) {
  return (
    /* ● 3 a 6 paneles simples con los siguientes totales:

○ Total de productos

○ Total de usuarios

○ Total de categorías

● Panel de detalle de último producto o usuario creado.

● Panel de categorías con el total de productos de cada una.

● Panel con el listado de productos */
    <div className="app-wrapper">
      <Header/>
      <div className="content-wrapper">
        <Sidebar/>
        <main className="content">
          <h1>Dashboard</h1>
          <div className="breakLine"></div>
          <section className="container">
            <Card title="Total de productos" number={3} color="red"/>
            <Card title="Total de productos" number={3} color="green"/>
            <Card title="Total de productos" number={3} color="blue"/>
          </section>
          <section className="container wrap">
            <p className="title">Productos por categoria</p>
            <Card title={"Alimentos"} number={4} color={"green"}/>
            <Card title={"Alimentos"} number={4} color={"green"}/>
            <Card title={"Alimentos"} number={4} color={"green"}/>
            <Card title={"Alimentos"} number={4} color={"green"}/>
            <Card title={"Alimentos"} number={4} color={"green"}/>
            <Card title={"Alimentos"} number={4} color={"green"}/>
          </section>
          <section className="container">
            <section className="container wrap back border">
              <p className="title">Ultimo producto creado</p>
              <section className="container">
                <img
                  src={productImg}
                  alt="IMAGEN"
                  srcset=""
                  className="productImage "
                />
                <section className="container col">
                  <p className="subtitle">Alimento para perros</p>
                  <p>Precio: 10</p>
                  <p>Descuento: 10</p>
                </section>
              </section>
            </section>
            <section className="container wrap back border">
              <p className="title">Ultimo usuario creado</p>
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
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
              <ProductCard/>
            </section>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Componentize;
