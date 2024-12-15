import { useEffect, useMemo } from 'react';
import Card from '../Card/Card';
import Label from '../shared/Label/Label';
import isSearchHasTitleDescSubstring from '../../validators/isSearchHasTitleDescSubstring';

import './Cards.scss';

const FILTERS = {
  search(card, filters) {
    return isSearchHasTitleDescSubstring(
      filters.search,
      card.name,
      card.description
    );
  },
  color(card, filters) {
    return !filters.color.length || filters.color.includes(card.color);
  },
  price(card, filters) {
    let min = filters.price[0];
    let max = filters.price[1];
    if (min === '') min = 0;
    if (max === '') max = Number.POSITIVE_INFINITY;
    return min <= card.price && card.price <= max;
  },
};

const Cards = (props) => {
  const { cards, filters, setCardsAmount } = props;

  const filteredCards = useMemo(
    () =>
      cards.filter((card) => {
        const searchCondition = FILTERS.search(card, filters);
        const colorsCondition = FILTERS.color(card, filters);
        const priceCondition = FILTERS.price(card, filters);

        return searchCondition && colorsCondition && priceCondition;
      }),
    [cards, filters]
  );

  useEffect(() => {
    setCardsAmount(filteredCards.length);
  }, [filteredCards, setCardsAmount]);

  return filteredCards.length ? (
    <ul className="app-list">
      {filteredCards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </ul>
  ) : (
    <Label
      className="not-found"
      title="No products found for the applied filters"
    />
  );
};

export default Cards;
