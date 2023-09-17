import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import RozetkaLogoWhite from "../../assets/RozetkaLogoWhite.svg";
import axios from "axios";
import API_URL from "../../constants/url";
import { BiArrowBack } from "react-icons/bi";
import "./Product.css";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/Product/${id}`)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  let availabilityText;
  let availabilityColor;

  if (product.quantity >= 1) {
    availabilityText = "Є в наявності";
    availabilityColor = "green";
  } else {
    availabilityText = "Немає в наявності";
    availabilityColor = "red";
  }

  return (
    <div className="product-container">
      <header className="product-header">
        <img src={RozetkaLogoWhite} alt="Rozetka Logo" />
      </header>
      <main className="product-main">
        <div className="product-navigate">
          <Link to="/product-preview">
            {" "}
            {<BiArrowBack style={{ fontSize: "35px" }} />}{" "}
          </Link>
          <h1 className="product-navigate-header">{product.name}</h1>
        </div>
        <div className="product-content">
          <div className="product-avatar">
            <img src={product.avatar} alt={product.name} className="avatar" />
          </div>
          <div className="product-info">
            <h2 style={{ color: availabilityColor }}>{availabilityText}</h2>
            <div className="price">{product.price} ₴</div>
            <div className="quantity">Кількість: {product.quantity}</div>
          </div>
        </div>
        <div className="product-description">
          <h2>
            Опис <span className="description-head">{product.name}</span>
          </h2>
          {product.description.split("\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Product;
