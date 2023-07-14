import ProductCard from "../ProductCard";
import { Row, Container } from "react-bootstrap"
import "./index.css"

function ProductList({ products }) {
  return (
   
      
      <Container className="container border imgBack wrap round">
      <p className="title center">Todos los productos</p>
      
      <Row className="mt-5">
        {products.products.map((product) => (
          <ProductCard key={product.id} src={product.image} alt={""} name={product.name} />
        ))}
        </Row>
      </Container>
    
  );
}

export default ProductList;
