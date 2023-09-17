import React from "react";
import { Modal,  TextField } from "@mui/material";
import { Formik, Form, Field } from "formik";
import "./EditModal.css";

const EditModal = ({ open, onClose, onSubmit, initialValues, isEdit }) => {
  return (
    <Modal className="edit-modal_container" open={open} onClose={onClose}>
      <div className="edit-modal">
        <h2>{isEdit ? "Edit product" : "Add product"}</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              onSubmit(values);
              onClose();
            }}
          >
            <Form>
              <Field
                name="category"
                as={TextField}
                variant="outlined"
                fullWidth
                margin="normal"
                label="Category"
              />
              <Field
                name="name"
                as={TextField}
                variant="outlined"
                fullWidth
                margin="normal"
                label="Name"
              />
              <Field
                name="quantity"
                as={TextField}
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                label="Quantity"
              />
              <Field
                name="price"
                as={TextField}
                type="number"
                variant="outlined"
                fullWidth
                margin="normal"
                label="Price"
              />
              <Field
                name="description"
                as={TextField}
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                margin="normal"
                label="Description"
              />
              <div className="edit-modal-buttons">
                <button
                  variant="contained"
                  className="edit-modal-button edit-modal-button-cancel"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="edit-modal-button edit-modal-button-submit"
                >
                  Submit
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </Modal>
    );
};

export default EditModal;
