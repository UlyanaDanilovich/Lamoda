import { useState, useMemo, useEffect, useCallback } from 'react';

import Cards from './components/Cards/Cards';
import Button from './components/shared/Button/Button';
import Label from './components/shared/Label/Label';
import SearchInput from './components/shared/SearchInput/SearchInput';
import Checkbox from './components/shared/Checkbox/Checkbox';

import getActualColorArray from './utils/getActualColorArray';
import toggleArrayElement from './utils/toggleArrayElement';
import { getProductList } from './utils/getProductList';
import { colorsArray } from './constants/colors';
import { sortingsArray, sortings } from './constants/sortings';

import './App.scss';

const FILTERS = {
  search: 'search',
  color: 'color',
  price: 'price',
};

const PRODUCT_AMOUNT = 100;

const App = () => {
  const [cards, setCards] = useState(getProductList(PRODUCT_AMOUNT));
  const [cardsAmount, setCardsAmount] = useState(PRODUCT_AMOUNT);
  const [sorting, setSorting] = useState(sortings.low);
  const [filters, setFilters] = useState({
    search: '',
    color: [],
    price: ['', ''],
  });

  const filterSearch = useCallback(
    (event) => {
      setFilters({
        ...filters,
        [FILTERS.search]: event.target.value,
      });
    },
    [filters]
  );

  const filterColor = useCallback(
    (event) => {
      setFilters({
        ...filters,
        [FILTERS.color]: toggleArrayElement(filters.color, event.target.value),
      });
    },
    [filters]
  );

  const priceSearch = useCallback(
    (index) => (event) => {
      const updatePrice = (filters, index, value) =>
        index ? [filters.price[0], value] : [value, filters.price[1]];

      if (event.target.value === '') {
        setFilters({
          ...filters,
          [FILTERS.price]: updatePrice(filters, index, ''),
        });
        return;
      }

      const value = Number(event.target.value);
      if (!/^\d*$/.test(value)) {
        return;
      }

      setFilters({
        ...filters,
        [FILTERS.price]: updatePrice(filters, index, value),
      });
    },
    [filters]
  );

  const colorList = useMemo(() => {
    const omittedColorArray = getActualColorArray(cards);

    return colorsArray.map(([key, value]) => {
      if (!omittedColorArray.includes(value)) {
        return null;
      }

      return (
        <Checkbox
          key={key}
          value={value}
          title={value}
          handleChange={filterColor}
        />
      );
    });
  }, [cards, filterColor]);

  useEffect(() => {
    let callback;
    switch (sorting) {
      case sortings.low:
        {
          callback = (p1, p2) => p1.price > p2.price;
        }
        break;
      case sortings.high:
        {
          callback = (p1, p2) => p1.price <= p2.price;
        }
        break;
      case sortings.popular:
        {
          callback = (p1, p2) => p1.rating <= p2.rating;
        }
        break;
    }
    setCards(cards.toSorted(callback));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sorting]);

  return (
    <div className="app">
      <div className="app-wrapper">
        <header className="app-header">
          <SearchInput placeholder="Search..." handleInput={filterSearch} />
          <ul className="app-header__sorting">
            {sortingsArray.map(([key, value]) => (
              <li key={key}>
                <Button
                  value={value}
                  title={value}
                  className={`app-header__button ${value === sorting ? 'button-active' : ''}`}
                  handleClick={() => setSorting(value)}
                />
              </li>
            ))}
          </ul>
        </header>
        <main className="app-main">
          <aside className="app-aside">
            <div className="app-aside__filter-color">
              <Label title="By color" className="app-aside__label" />
              <ul className="app-aside__list">{colorList}</ul>
            </div>
            <div className="app-aside__filter-price">
              <Label title="By Price" className="app-aside__label" />
              <div className="app-aside__price-list">
                <input
                  className="app-aside__input"
                  type="text"
                  placeholder="from"
                  value={filters.price[0]}
                  onChange={priceSearch(0)}
                />
                <span className="app-aside__price-list__span">-</span>
                <input
                  className="app-aside__input"
                  type="text"
                  placeholder="to"
                  value={filters.price[1]}
                  onChange={priceSearch(1)}
                />
              </div>
            </div>
            <Label
              title={`Products: ${cardsAmount}`}
              className="app-aside__label"
            />
          </aside>
          <Cards
            cards={cards}
            filters={filters}
            setCardsAmount={setCardsAmount}
          />
        </main>
      </div>
    </div>
  );
};

export default App;
