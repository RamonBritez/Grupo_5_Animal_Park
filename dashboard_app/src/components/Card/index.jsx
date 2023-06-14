import "./index.css"

function Card({title, number, color}) {
  return (
    <article className={`card ${color}`}>
      <div className="cardLine"></div>
      <div className="cardContent">
        <p className="title">{title}</p>
        <p>{number}</p>
      </div>
    </article>
  );
}

Card.defaultProps = {
    color: "red"
}

export default Card;
