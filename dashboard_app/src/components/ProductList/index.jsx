import ProductCard from "../ProductCard";
import "./index.css"

function ProductList({ products }) {
  return (
    <section className="container border imgBack wrap round">
      <p className="title center">Todos los productos</p>
      <section className="productList">
        {products.products.map((product) => (
          <ProductCard key={product.id} src={product.image} alt={""} name={product.name} />
        ))}
      </section>
    </section>
  );
}

export default ProductList;
