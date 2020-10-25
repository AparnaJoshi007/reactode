import React from 'react';

const InputText = ({ 
  id, 
  name, 
  value, 
  placeHolder, 
  title, 
  error, 
  handleChange }) => (
  <div className="form-group">
    {title && <label htmlFor={name} className="col col-form-label">{title}</label>}
    <div className="col-sm-12">
      <input type="text" className={`form-control ${error ? 'is-invalid': ''}`} id={id} name={name} value={value} onChange={handleChange} placeholder={placeHolder} />
    </div>
    <div className="col-sm-12">
      {error &&
        <small id="passwordHelp" className="text-danger">{error}</small>}
    </div>
  </div>
);

export { InputText };
