import { useMemo } from 'react';

import './Button.scss';

const Button = (props) => {
  const { title, disabled, value, handleClick, className } = props;
  const buttonClass = useMemo(
    () => `button ${disabled ? 'button-disabled' : ''} ${className || ''}`,
    [disabled, className]
  );

  return (
    <button
      className={buttonClass}
      value={value}
      disabled={disabled}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;
