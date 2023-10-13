import React from 'react';

const Button = (props) => {
  const {
    cN = 'bg-blue-600 text-white',
    type,
    onClick = () => {},
    disabled,
    children,
  } = props;

  return (
    <button
      className={`${cN}`}
      onClick={() => onClick()}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
