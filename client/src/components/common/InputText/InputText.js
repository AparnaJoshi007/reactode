import React from 'react';

const InputText = React.forwardRef(({ id, placeHolder, title, errors }, ref) => {
  return (
    <div className="form-group">
      {title && <label htmlFor={id} className={`col col-form-label ${errors ? 'text-danger': ''}`}>{title}</label>}
      <div className="col-sm-12">
        <input type="text" ref={ref} className={`form-control ${errors ? 'is-invalid': ''}`} id={id} placeholder={placeHolder} />
      </div>
      <div className="col-sm-12">
        {errors === "required" &&
          <small id="passwordHelp" className="text-danger">Your input is required</small>}
        {errors === "maxLength" &&
          <small id="passwordHelp" className="text-danger">Your input exceed maxLength</small>}
      </div>
    </div>
  );
})

export { InputText };
