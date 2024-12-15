import { useMemo } from 'react';

import './Label.scss';

const Label = (props) => {
  const { title, className } = props;
  const labelClass = useMemo(() => `label ${className || ''}`, [className]);

  return (
    <p title={title} className={labelClass}>
      {title}
    </p>
  );
};

export default Label;
