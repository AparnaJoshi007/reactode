import React from "react";

const InputSelect = ({
  id,
  name,
  title,
  value,
  defaultOption,
  error,
  handleChange,
  options
}) => {
  return (
    <div className="form-group">
      <label className="col col-form-label" htmlFor={name}>{title}</label>
      <div className="field col-sm-12">
        <select
          id={id}
          name={name}
          className="form-control"
          onChange={handleChange}
          value={value || ''}
        >
          <option value="">{defaultOption}</option>
          {options.map(option => {
            return (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            );
          })}
        </select>
        {error &&
          <small id="passwordHelp" className="text-danger">{error}</small>}
      </div>
    </div>
  );
};

export { InputSelect };
