import './Dictionary.scss';

const Dictionary = (props) => {
  const { title, value } = props;

  return (
    <p className="app-dict">
      <span className="app-dict__title">{title}</span>
      <span className="app-dict__value">{value}</span>
    </p>
  );
};

export default Dictionary;
