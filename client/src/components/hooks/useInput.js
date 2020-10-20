import { useState } from "react";

export const useInput = (initialState) => {
  const [{values, errors}, setValues] = useState(initialState);

  return [
    values,
    errors,
    (id, value) => {
      setValues({
        values: {
          ...values,
          [id]: value
        },
        errors: {
          ...errors
        }     
      });
    },
    (id, errorType) => {
      setValues({
        values: {
          ...values,
        },
        errors: {
          ...errors,
          [id]: errorType
        }  
      });
    }];
}
