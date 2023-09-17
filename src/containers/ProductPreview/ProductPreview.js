import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import ProductCard from "../../components/ProductCard";
import RozetkaLogoWhite from "../../assets/RozetkaLogoWhite.svg";
import axios from "axios";
import API_URL from "../../constants/url";
import "./ProductPreview.css";

const ProductPreview = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <Container maxWidth="xl" className="productPreview-container">
      <header className="productPreview-header">
        <img src={RozetkaLogoWhite} alt="Rozetka Logo" />
      </header>
      <div className="productPreview-content">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  );
};

export default ProductPreview;
