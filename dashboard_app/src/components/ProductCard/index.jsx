function ProductCard({src, alt}) {
  return (
    <article className="productCard">
      <img src={src} alt={alt} />
    </article>
  );
}

ProductCard.defaultProps = {
    src: "https://w7.pngwing.com/pngs/819/548/png-transparent-photo-image-landscape-icon-images-thumbnail.png",
    alt: "Imagen de producto"
}

export default ProductCard;
