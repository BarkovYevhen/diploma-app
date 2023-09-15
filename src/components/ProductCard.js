import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { BsCart4 } from "react-icons/bs";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <Card className="card">
      <CardMedia
        className="card-media"
        component="img"
        // height="140"
        src={product.avatar}
        alt={product.name}
      />
      <CardContent className="card-content">
        <Typography variant="h6" component="div" gutterBottom>
          {product.name}
        </Typography>
        <div className="price-quantity-container">
          <Typography variant="h6" color="error.main">
            {product.price} ₴
          </Typography>
          <Typography variant="subtitle" color="text.secondary">
            Кількість: {product.quantity}
          </Typography>
        </div>
        <Button
          variant="contained"
          onClick={() => navigate(`/product/${product.id}`)}
          fullWidth
          className="productCard-button"
          startIcon={<BsCart4 />}
          style={{ marginTop: "20px" }}
        >
          Готовий до відправки
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
