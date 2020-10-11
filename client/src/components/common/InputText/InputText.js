import React from 'react';

const InputText = ({ id, value, changeHandler, placeHolder, title, errors }) => {
  return (
    <div className="form-group">
      <label htmlFor={id} className={`col-sm-4 col-form-label ${errors ? 'text-danger': ''}`}>{title}</label>
      <div className="col-sm-12">
        <input type="text" className={`form-control ${errors ? 'is-invalid': ''}`} id={id} placeholder={placeHolder} value={value} onChange={(e) => changeHandler(e)}/>
      </div>
      <div className="col-sm-12">
        {errors === "required" &&
          <small id="passwordHelp" className="text-danger">Your input is required</small>}
        {errors === "maxLength" &&
          <small id="passwordHelp" className="text-danger">Your input exceed maxLength</small>}
      </div>
    </div>
  );
}

export { InputText };
