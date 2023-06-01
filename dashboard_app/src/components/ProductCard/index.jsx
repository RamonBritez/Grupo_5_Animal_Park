function ProductCard({src, alt, name}) {
  return (
    <article className="productCard">
      <img src={src} alt={alt} />
      <p className="subtitle center">{name.slice(0,20)}</p>
    </article>
  );
}

ProductCard.defaultProps = {
    src: "https://w7.pngwing.com/pngs/819/548/png-transparent-photo-image-landscape-icon-images-thumbnail.png",
    alt: "Imagen de producto"
}

export default ProductCard;
