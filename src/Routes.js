import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./containers/Login/Login";
import ProductTable from "./containers/ProductTable/ProductTable";
import ProductPreview from "./containers/ProductPreview/ProductPreview";

import Product from "./containers/Product/Product";

const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const RoutesComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/product-table"
          element={<PrivateRoute element={<ProductTable />} />}
        />
        <Route
          path="/product-preview"
          element={<PrivateRoute element={<ProductPreview />} />}
        />
        <Route
          path="/product/:id"
          element={<Product />} />

      </Routes>
    </Router>
  );
};

export default RoutesComponent;
