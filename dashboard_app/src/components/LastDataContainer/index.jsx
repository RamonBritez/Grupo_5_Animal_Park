function LastDataContainer({productList}) {
    let lastData = productList.products[productList.products.length - 1]
  return (    
    <section className="container">
      <img
        src={lastData.image}
        alt="IMAGEN"
        className="productImage "
      />
      <section className="container col">
        <p className="subtitle">{lastData.name}</p>
        <p>Precio: ${lastData.price}</p>
        <p>Descuento: {lastData.discount}%</p>
      </section>
    </section>
  );
}

export default LastDataContainer;
