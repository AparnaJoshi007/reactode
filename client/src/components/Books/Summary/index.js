import React, { useRef, useEffect } from "react";
import { TextArea } from '../../common/TextArea';
import { ModalTitle, ModalBody, ModalFooter } from "../../common/Modal";

const Summary = ({ toggleSummary, value, handleSummary }) => {
  const currentSummaryRef = useRef('');

  useEffect(() => {
    if(currentSummaryRef.current) {
      currentSummaryRef.current.focus();
    }
    if (value) {
      currentSummaryRef.current.value = value;
    }
  }, [value])

  return (
    <>
      <ModalTitle handleClick={toggleSummary}>Add book summary</ModalTitle>
        <ModalBody>
          <TextArea
            id="summary"
            placeHolder="Add summary"
            ref={currentSummaryRef} />
        </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" type="submit" onClick={() => { handleSummary(currentSummaryRef.current.value); toggleSummary(); }}>Save</button>
      </ModalFooter>
    </>
  );
};

export { Summary };
