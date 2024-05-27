import React from 'react';

const InputField = ({ label, value, type, onChange, placeholder, name }) => {
  return (
    <div>
      <label>{label}</label>
      <input 
        type={type} 
        value={value} 
        onChange={onChange}
        placeholder={placeholder} 
        name={name} />
    </div>
  );
};

export default InputField;
