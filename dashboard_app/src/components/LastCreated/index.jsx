import "./index.css"

function LastCreated({ product, user }) {
  return (
    <section className="container no-side-pad">
      <section className="container wrap imgBack border round">
        <p className="title center">Ultimo producto creado</p>
        {product && (
          <section className="container">
            <img
              src={product.images[0].url}
              alt="IMAGEN"
              className="productImage "
            />
            <section className="container col">
              <p className="subtitle">{product.name}</p>
              <p>Precio: ${product.price}</p>
              <p>Descuento: {product.discount}%</p>
            </section>
          </section>
        )}
      </section>
      <section className="container wrap imgBack border round">
        <p className="title center">Ultimo usuario creado</p>
        {user && (
          <section className="container">
            <img src={user.avatar} alt="IMAGEN" className="productImage" />
            <section className="container col">
              <p className="subtitle">{`${user.first_name} ${user.last_name}`}</p>
              <p>{user.email}</p>
            </section>
          </section>
        )}
      </section>
    </section>
  );
}

export default LastCreated;
