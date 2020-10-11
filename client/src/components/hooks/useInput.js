import { useState } from "react";

export const useInput = (initialState) => {
  const [{values, errors}, setValues] = useState(initialState);

  return [
    values,
    errors,
    (event) => {
      setValues({
        values: {
          ...values,
          [event.target.id]: event.target.value
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
