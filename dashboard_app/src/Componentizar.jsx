import "./App.css";
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
      <header>
        <p>Animal Park</p>
      </header>
      <div className="content-wrapper">
        <aside className="navBar">
          <ul>
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="/login">Home</a>
            </li>
          </ul>
        </aside>
        <main className="content">
          <h1>Dashboard</h1>
          <div className="breakLine"></div>
          <section className="container">
            {/* Colores:
            Red
            Blue
            Green
             */}
            <article className="card red">
              <div className="cardLine"></div>
              <div className="cardContent">
                <p className="title">Total de x</p>
                <p>50</p>
              </div>
            </article>
            <article className="card red">
              <div className="cardLine"></div>
              <div className="cardContent">
                <p className="title">Total de x</p>
                <p>50</p>
              </div>
            </article>
            <article className="card red">
              <div className="cardLine"></div>
              <div className="cardContent">
                <p className="title">Total de x</p>
                <p>50</p>
              </div>
            </article>
          </section>
          <section className="container wrap">
            {/* Colores:
            Red
            Blue
            Green
             */}
            <p className="title">Productos por categoria</p>
            <article className="card red">
              <div className="cardLine"></div>
              <div className="cardContent">
                <p className="title">Total de x</p>
                <p>50</p>
              </div>
            </article>
          </section>
          <section className="container">
            <section className="container col back">
              <p className="title">Ultimo producto creado</p>
              <section className="container col">
                <img src="" alt="IMAGEN" srcset="" className="productImage" />
                <p className="subtitle">Alimento para perros</p>
                <p>Precio: 10</p>
                <p>Descuento: 10</p>
              </section>
            </section>
            <section className="container col back">
              <p className="title">Ultimo usuario creado</p>
              <section className="container col">
                <img src="" alt="IMAGEN" srcset="" className="productImage" />
                <p className="subtitle">Hexanima</p>
                <p>nico@fili.com</p>
                <p>Descuento: 10</p>
              </section>
            </section>
          </section>
          <section className="container back wrap">
            <p className="title">Todos los productos</p>
            <section className="productList">
                <article className="productCard">
                    <img src="" alt="" />
                </article>
                <article className="productCard">
                    <img src="" alt="" />
                </article>
                <article className="productCard">
                    <img src="" alt="" />
                </article>
                <article className="productCard">
                    <img src="" alt="" />
                </article>
                <article className="productCard">
                    <img src="" alt="" />
                </article>
                <article className="productCard">
                    <img src="" alt="" />
                </article>
                <article className="productCard">
                    <img src="" alt="" />
                </article>
                <article className="productCard">
                    <img src="" alt="" />
                </article>
                <article className="productCard">
                    <img src="" alt="" />
                </article>
                <article className="productCard">
                    <img src="" alt="" />
                </article>
                <article className="productCard">
                    <img src="" alt="" />
                </article>
                <article className="productCard">
                    <img src="" alt="" />
                </article>
                <article className="productCard">
                    <img src="" alt="" />
                </article>
                <article className="productCard">
                    <img src="" alt="" />
                </article>
                <article className="productCard">
                    <img src="" alt="" />
                </article>
            </section>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Componentize;
