import Card from "../Card";


function CategoryCards({ categoryList }) {
  const list = categoryList.map((category, i) => {
    let color;

    switch (i % 3) {
      case 0:
        color = "lightGreen";
        break;
      case 1:
        color = "yellow";
        break;
      case 2:
        color = "green";
        break;
    }

    return <Card title={category.name} number={category.count} color={color} />;
  });

  return (
    <section className="container wrap no-side-pad">
      <p className="title">Productos por categoria</p>
      {list}
    </section>
  );
}

export default CategoryCards;
