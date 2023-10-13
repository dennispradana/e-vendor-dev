import React from 'react';
import Input from './Input';
import Select from './Select';
import TextArea from './TextArea';

export const InputForm = (props) => {
  const { type, label, error, ...formikProps } = props;
  return (
    <div className="mb-6">
      <label className="mb-4 text-sm font-semibold capitalize ">{label}</label>
      <Input type={type} {...formikProps} error={error} />
      {error && <p className="mt-2 text-sm italic text-red-500">{error}</p>}
    </div>
  );
};

export const SelectForm = (props) => {
  const { label, options, error, ...formikProps } = props;
  return (
    <div className="mb-6">
      <label className="text-sm font-semibold capitalize ">{label}</label>
      <Select options={options} {...formikProps} error={error} />
      {error && <p className="mt-2 text-sm italic text-red-500">{error}</p>}
    </div>
  );
};

export const TextAreaForm = (props) => {
  const { label, error, ...formikProps } = props;
  return (
    <div className="mb-6">
      <label className="mb-4 text-sm font-semibold capitalize ">{label}</label>
      <TextArea {...formikProps} error={error} />
      {error && <p className="mt-2 text-sm italic text-red-500">{error}</p>}
    </div>
  );
};

export const CheckBoxForm = (props) => {
  const { label, name, onChange, onBlur, value, error } = props;
  return (
    <div className="mb-6">
      <label className="flex">
        <input
          type="checkbox"
          className="w-5 h-5 mr-2"
          onChange={onChange}
          onBlur={onBlur}
          checked={value}
          name={name}
        />
        <p className="text-sm font-semibold capitalize ">{label}</p>
      </label>
      {error && <p className="mt-2 text-sm italic text-red-500">{error}</p>}
    </div>
  );
};

export const SelectAlamat = (props) => {
  const { label, options, error, ...formikProps } = props;
  return (
    <div className="mb-6">
      <label className="text-sm font-semibold capitalize ">{label}</label>
      <select
        {...formikProps}
        className={`w-full mt-2 p-1 px-3 text-gray-700 bg-white border ${
          error
            ? 'border-red-500 focus:ring-red-600'
            : 'border-gray-300  focus:ring-sky-600'
        } rounded-md shadow-sm focus:outline-none focus:ring-2  focus:border-transparent`}
      >
        <option value="" disabled hidden>
          Silahkan Pilih
        </option>
        {options.map((option) => (
          <option key={option.id} value={option.value} data-id={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <p className="mt-2 text-sm italic text-red-500">{error}</p>}
    </div>
  );
};
