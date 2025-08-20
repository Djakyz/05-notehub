import { useEffect } from "react";

import css from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  closeModal: () => void;
}

const Modal = ({ children, closeModal }: ModalProps) => {
  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [closeModal]);

  return (
    <div className={css.modalBackdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>{children}</div>
    </div>
  );
};

export default Modal;
