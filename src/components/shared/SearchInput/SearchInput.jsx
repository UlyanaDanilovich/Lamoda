import SearchIcon from '../../../../public/search.svg';

import './SearchInput.scss';

const SearchInput = (props) => {
  const { placeholder, handleInput } = props;

  return (
    <div className="app-search">
      <img
        src={SearchIcon}
        className="app-search__icon"
        alt="Search"
        width="12"
        height="12"
      />
      <input
        className="app-search__input"
        type="text"
        placeholder={placeholder}
        onInput={handleInput}
      />
    </div>
  );
};

export default SearchInput;
