import React from 'react';

const TextArea = React.forwardRef(({ id, placeHolder, maxLength }, ref) => {
  return (
    <div className="form-group">
      <div className="col-sm-12">
      <textarea className="form-control no-outline" rows="12" ref={ref} maxLength={maxLength} id={id} placeholder={placeHolder}></textarea>
      </div>
    </div>
  );
})

export { TextArea };
