import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose, title, children}) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={`modal-overlay ${isOpen ? "show" : ""}`} onClick={onClose}>
      <div
        className="modal modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header d-flex flex-row">
          {title && <h2 className="modal-title flex-grow-1">{title}</h2>}
          <button className="modal-close btn btn-light" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default Modal;
