import { useState } from "react";

export const useArray = (initialState) => {
  const [values, setValues] = useState(initialState);
  return [
    values,
    (value) => {
      setValues([
        ...values,
        value
      ]);
    },
    (key) => {
      const filteredValues = values.filter((value) => {
        return (value.key !== key);
      });
      setValues([
        ...filteredValues
      ]);
    }
  ];
}
