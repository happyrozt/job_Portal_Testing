import React from 'react';

function Input({ label, type, name, value, onChange, placeholder, error }) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default Input;
