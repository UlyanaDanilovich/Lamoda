const getActualColorArray = (product) => [
  ...new Set(product.map(({ color }) => color)),
];

export default getActualColorArray;
