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
        <Route index element={<Login />} />{" "}
        <Route path="/product-table" element={<ProductTable />} />
        <Route path="/product-preview" element={<ProductPreview />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
