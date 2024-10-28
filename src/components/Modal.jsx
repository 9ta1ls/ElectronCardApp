import React from 'react';
import '../styles/modal.css'; 

function Modal({ handleDelete, closeModal }) {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Are you sure you want to delete?</h2>
        <button onClick={handleDelete}>Yes, delete</button>
        <button onClick={closeModal}>No, cancel</button>
      </div>
    </div>
  );
}

export default Modal;
