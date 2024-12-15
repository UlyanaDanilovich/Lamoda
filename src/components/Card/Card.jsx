import Dictionary from '../shared/Dictionary/Dictionary';

import './Card.scss';

const Card = (props) => {
  const { name, description, color, category, price, rating, imageUrl } =
    props.card;

  return (
    <div className="app-card">
      <div>
        <img className="app-card__image" src={imageUrl} alt={category} />
        <p className="app-card__title">{name}</p>
        <p className="app-card__desc">{description}</p>
      </div>
      <div>
        <Dictionary title="Category" value={category} />
        <Dictionary title="Color" value={color} />
        <Dictionary title="Price" value={`${price} RUB`} />
        <Dictionary title="Rating" value={rating} />
      </div>
    </div>
  );
};

export default Card;
