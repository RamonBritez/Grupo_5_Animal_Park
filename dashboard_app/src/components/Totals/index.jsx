import Card from "../Card";

function Totals({ productCount, userCount }) {
  return (
    <section className="container">
      {productCount && (
        <Card
          title="Total de productos"
          number={productCount}
          color="lightGreen"
        />
      )}
      {userCount && (
        <Card title="Total de usuarios" number={userCount} color="green" />
      )}
    </section>
  );
}

export default Totals;
