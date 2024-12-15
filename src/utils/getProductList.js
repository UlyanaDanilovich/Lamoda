import Chance from 'chance';
import { gerRandomInteger } from './getRandomInteger';
import { colorsArray } from '../constants/colors';
import { categoriesArray } from '../constants/categories';

const getProduct = () => {
  const chance = new Chance(Math.random);
  const colors = colorsArray;
  const categories = categoriesArray;
  const currentCategory =
    categories[gerRandomInteger(0, categories.length - 1)][1];

  return {
    id: chance.guid(),
    name: chance.word(),
    description: chance.sentence(),
    color: colors[gerRandomInteger(0, colors.length - 1)][1],
    category: currentCategory,
    price: gerRandomInteger(10, 9999),
    rating: gerRandomInteger(0, 50) / 10,
    imageUrl: `public/images/${currentCategory}.jpg`,
  };
};

export const getProductList = (amount = 10) => {
  return Array.from({ length: amount }, () => getProduct());
};
