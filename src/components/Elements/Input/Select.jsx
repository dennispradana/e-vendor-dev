import React from 'react';

const Select = (props) => {
  const { name, options, value, onBlur, error, onChange } = props;
  return (
    <select
      name={name}
      className={`w-full mt-2 p-1 px-3 text-gray-700 bg-white border ${
        error
          ? 'border-red-500 focus:ring-red-600'
          : 'border-gray-300  focus:ring-sky-600'
      } rounded-md shadow-sm focus:outline-none focus:ring-2  focus:border-transparent`}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
    >
      <option value="" disabled hidden>
        Pilih Salah Satu
      </option>
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
