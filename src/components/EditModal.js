import React from "react";
import { Modal, TextField, Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./EditModal.css";

const validationSchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  name: Yup.string().required("Name is required"),
  quantity: Yup.number()
    .required("Quantity is required")
    .positive("Quantity must be positive"),
  price: Yup.number()
    .required("Price is required")
    .positive("Price must be positive"),
  description: Yup.string().required("Description is required"),
});

const EditModal = ({ open, onClose, onSubmit, initialValues }) => {
  return (
    <Modal className="edit-modal_container" open={open} onClose={onClose}>
      <div className="edit-modal">
        <h2>Add product</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            onSubmit(values);
            onClose();
          }}
        >
          {({ isValid }) => (
            <Form>
              <Field
                name="category"
                as={TextField}
                variant="outlined"
                fullWidth
                margin="normal"
                label="Category"
              />
              <ErrorMessage
                name="category"
                component="div"
                className="error-message"
              />
              <Field
                name="name"
                as={TextField}
                variant="outlined"
                fullWidth
                margin="normal"
                label="Name"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="error-message"
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
              <ErrorMessage
                name="quantity"
                component="div"
                className="error-message"
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
              <ErrorMessage
                name="price"
                component="div"
                className="error-message"
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
              <ErrorMessage
                name="description"
                component="div"
                className="error-message"
              />
              <div className="edit-modal-buttons">
                <Button
                  variant="contained"
                  className="edit-modal-button edit-modal-button-cancel"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="edit-modal-button edit-modal-button-submit"
                  disabled={!isValid} 
                >
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default EditModal;
