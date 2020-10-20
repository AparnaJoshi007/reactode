import React, { useRef, useEffect } from "react";
import { TextArea } from '../../common/TextArea';
import { ModalTitle, ModalBody, ModalFooter } from "../../common/Modal";

const Summary = ({ toggleSummary, summary, setSummary }) => {
  const currentSummaryRef = useRef('');

  useEffect(() => {
    if(currentSummaryRef.current) {
      currentSummaryRef.current.focus();
    }
    if (summary) {
      currentSummaryRef.current.value = summary;
    }
  }, [summary])

  return (
    <>
      <ModalTitle handleClick={toggleSummary}>Add book summary</ModalTitle>
        <ModalBody>
          <TextArea
            placeHolder="Add summary"
            ref={currentSummaryRef} 
            maxLength={150} />
        </ModalBody>
      <ModalFooter>
        <button className="btn btn-primary" type="submit" onClick={() => { setSummary(currentSummaryRef.current.value); toggleSummary(); }}>Save</button>
      </ModalFooter>
    </>
  );
};

export { Summary };
