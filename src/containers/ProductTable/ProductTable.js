import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import RozetkaLogoWhite from "../../assets/RozetkaLogoWhite.svg";
import PreviewIcon from "../../assets/PreviewIcon.svg";
import PlusIcon from "../../assets/PlusIcon.svg";
import { BsPencilFill, BsFillTrashFill } from "react-icons/bs";
import API_URL from "../../constants/url";
import axios from "axios";
import "./ProductTable.css";
import { Link } from "react-router-dom";
import DeleteModal from "../../components/DeleteModal";
import EditModal from "../../components/EditModal";

function ProductTable() {
  const [products, setProducts] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddClick = () => {
    setShowAddModal(true);
  };

  useEffect(() => {
    axios
      .get(`${API_URL}/Product`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDeleteClick = (productId) => {
    setSelectedProductId(productId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedProductId(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${API_URL}/Product/${selectedProductId}`);
      const updatedProducts = products.filter(
        (product) => product.id !== selectedProductId
      );
      setProducts(updatedProducts);

      setShowDeleteModal(false);
      setSelectedProductId(null);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedProduct(null);
  };

  // тут логіка сабміту

  return (
    <Container maxWidth="100%" className="productTable-container">
      <div className="logo-container">
        <img
          src={RozetkaLogoWhite}
          alt="Rozetka Logo"
          style={{ width: "240px" }}
        />
      </div>
      <div className="buttons-container">
        <button className="productTable-button">
          <Link to="/product-preview" className="productTable-button">
            <div className="button-content">
              <img src={PreviewIcon} alt="Body" className="button-icon"></img>
              Preview
            </div>
          </Link>
        </button>

        <button
          className="productTable-button"
          onClick={() => {
            setShowAddModal(true);
          }}
        >
          <div className="button-content">
            <img src={PlusIcon} alt="Plus" className="button-icon"></img> Add
            products
          </div>
        </button>
        <EditModal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          // onSubmit={handleAddSubmit}
          initialValues={{
            category: "",
            name: "",
            quantity: "",
            price: "",
            description: "",
          }}
          isEdit={false}
        />
      </div>

      <Typography
        variant="h2"
        component="div"
        align="center"
        style={{ marginBottom: "75px", fontWeight: 700, color: "#FFFF" }}
      >
        Products
      </Typography>

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price (₴)</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>
                  <BsPencilFill
                    style={{ marginRight: "8px", cursor: "pointer" }}
                    onClick={() => handleEditClick(item)}
                  />
                  <BsFillTrashFill
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteClick(item.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DeleteModal
        open={showDeleteModal}
        onClose={handleCloseDeleteModal}
        onDelete={handleDeleteConfirm}
      />
      <EditModal
        open={showEditModal}
        onClose={handleCloseEditModal}
        // onSubmit={handleEditSubmit}
        initialValues={selectedProduct}
        isEdit={true}
      />
    </Container>
  );
}

export default ProductTable;
