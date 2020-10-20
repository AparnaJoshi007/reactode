import React from 'react';

const ButtonControls = ({ id, value, changeHandler, placeHolder, title, errors }) => {
  return (
    <div className="form-group">
      <div className="col-sm-12">
        <button type="button" className="btn btn-light w-100">Add Ingredients</button>
      </div>
    </div>
  );
}

export { ButtonControls };
