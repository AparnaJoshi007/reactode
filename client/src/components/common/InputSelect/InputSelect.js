import React from "react";

const InputSelect = React.forwardRef(({
  name,
  label,
  defaultOption,
  error,
  options
}, ref) => {
  console.log(options)
  return (
    <div className="form-group">
      <label className="col col-form-label" htmlFor={name}>{label}</label>
      <div className="field col-sm-12">
        <select
          name={name}
          className="form-control"
          ref={ref}
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
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
});

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
