import React from 'react';

const InputNumber = ({ id, min, max }) => {
  return (
    <div className="col">
      <input type="number" className="form-control" id={id} max={max} min={min} />
    </div>
  );
}

export { InputNumber };
