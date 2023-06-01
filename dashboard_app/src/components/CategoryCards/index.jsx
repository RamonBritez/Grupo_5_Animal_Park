import Card from "../Card";

function CategoryCards({ categoryList }) {
  const list = categoryList.map((category) => (
    <Card title={category.name} number={category.count} color="yellow" />
  ));

  return <>{list}</>;
}

export default CategoryCards;
