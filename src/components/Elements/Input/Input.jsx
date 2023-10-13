import React from 'react';

const Input = (props) => {
  const { type, name, value, onChange, onBlur, error } = props;
  return (
    <input
      type={type}
      className={`w-full mt-2 p-1 px-3 text-gray-700 bg-white border ${
        error
          ? 'border-red-500 focus:ring-red-600'
          : 'border-gray-300  focus:ring-sky-600'
      } rounded-md shadow-sm appearance-none focus:outline-none focus:ring-2  focus:border-transparent`}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default Input;
