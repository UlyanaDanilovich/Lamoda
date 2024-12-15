import './Checkbox.scss';

const Checkbox = (props) => {
  const { title, value, handleChange } = props;

  return (
    <div className="app-checkbox">
      <input type="checkbox" value={value} onChange={handleChange} />
      <p>{title}</p>
    </div>
  );
};

export default Checkbox;
