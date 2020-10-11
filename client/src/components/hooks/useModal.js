import { useState } from 'react';

export const useModal = () => {
  const [isOpen, toggleModal] = useState(false);

  function toggle() {
    toggleModal(!isOpen);
  }

  return {
    isOpen,
    toggle,
  }
};