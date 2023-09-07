// src/components/ProductTable/ProductTable.js

import React, { useState, useEffect } from "react";
import {
  Container, Typography, Table, TableContainer, TableHead,
  TableRow, TableCell, TableBody, Paper,
} from "@mui/material";
import RozetkaLogoWhite from "../../assets/RozetkaLogoWhite.svg";
import PreviewIcon from "../../assets/PreviewIcon.svg";
import PlusIcon from "../../assets/PlusIcon.svg";
import { BsPencilFill, BsFillTrashFill } from "react-icons/bs";
import axios from "axios"; 
import "./ProductTable.css";

function ProductTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("https://64f8ee62824680fd21803560.mockapi.io/Product")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
          <div className="button-content">
            <img src={PreviewIcon} alt="Body" className="button-icon"></img>
            Preview
          </div>
        </button>

        <button className="productTable-button">
          <div className="button-content">
            <img src={PlusIcon} alt="Plus" className="button-icon"></img> Add
            products
          </div>
        </button>
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
                  <BsPencilFill style={{ marginRight: "8px", cursor: "pointer" }}/>
                  <BsFillTrashFill style={{ cursor: "pointer" }} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ProductTable;
