import React from "react";
import { Modal, Button } from "@mui/material";
import "./DeleteModal.css";

const DeleteModal = ({ open, onClose, onDelete }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="delete-modal-container">
        <div className="delete-modal-content">
          <h2 className="delete-modal-text">
            Ви впевнені, що хочете видалити цей товар?
          </h2>
          <div className="delete-modal-buttons">
            <Button
              variant="contained"
              className="delete-modal-button delete-modal-button-cancel"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              className="delete-modal-button delete-modal-button-delete"
              onClick={onDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
