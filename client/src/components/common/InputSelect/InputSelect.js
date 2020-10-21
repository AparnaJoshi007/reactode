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

// InputSelect.propTypes = {
//   name: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   defaultOption: PropTypes.string,
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   error: PropTypes.string,
//   options: PropTypes.arrayOf(PropTypes.object)
// };

export { InputSelect };
