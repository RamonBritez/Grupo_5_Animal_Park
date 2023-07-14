import { Col, Card } from "react-bootstrap";
import styles from "./index.module.css"

function ProductCard({src, alt, name}) {
  return (
    <Col md={3}>
    <Card className={`mb-4 text-center ${styles.product}`}>
        <Card.Img
            variant="top"
            src={src}
            alt={`Imagen de ${alt}`}
            className={styles.imagen}
        />

        <Card.Body>
            <Card.Title>{name}</Card.Title>
       
        </Card.Body>
    </Card>
</Col>
 
  );
}

ProductCard.defaultProps = {
    src: "https://w7.pngwing.com/pngs/819/548/png-transparent-photo-image-landscape-icon-images-thumbnail.png",
    alt: "Imagen de producto"
}

export default ProductCard;
