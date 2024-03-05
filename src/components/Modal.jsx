import React from "react";
import "./modal.css";

const Modal = ({ isOpen, onClose, handleDelete }) => {
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2 className="delete-task">Delete this task?</h2>
        <div className="btn-grp">
          <button className="btn-confirm" onClick={handleDelete}>
            Yes
          </button>
          <button className="btn-cancel" onClick={onClose}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
