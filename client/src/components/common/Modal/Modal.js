import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isOpen, toggle, children }) => {
  return isOpen ? ReactDOM.createPortal(
    <React.Fragment>
      <div className="modal-backdrop fade show" onClick={() => toggle(!isOpen)}></div>
      <div className="modal fade show" id="form-modal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    </React.Fragment>,
    document.body
  ) : null
};


const ModalBody = ({children}) => {
	return (
		<div className="modal-body">
      {children}
    </div>
	);
}

const ModalFooter = ({children}) => {
	return (
    <div className="modal-footer">
      {children}
    </div>
  );
}

const ModalTitle = ({ children, handleClick }) => {
	return (
    <div className="modal-header">
      <h5 className="modal-title">{children}</h5>
      <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleClick}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}


export { Modal, ModalTitle, ModalBody, ModalFooter };