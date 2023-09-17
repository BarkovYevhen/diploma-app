import React, { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import RozetkaLogo from "../../assets/RozetkaLogo.svg";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(<AiFillEye />);
  const [userNameMeta, setUserNameMeta] = useState({
    touched: false,
    error: false,
  });
  const [passwordMeta, setPasswordMeta] = useState({
    touched: false,
    error: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();


  const sendLoginRequest = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log("JWT Token:", token);
      setErrorMessage(""); 
    } catch (error) {
      console.error("Error logging in:", error);
      setErrorMessage("Логін або пароль не вірні");
    }
  };


  const handleInputBlur = (field, setFieldMeta) => {
    setFieldMeta({ touched: true, error: field.trim() === "" });
  };

  const handleLogin = () => {
    handleInputBlur(userName, setUserNameMeta);
    handleInputBlur(password, setPasswordMeta);

    if (!userNameMeta.error && !passwordMeta.error) {
      sendLoginRequest(userName, password);
    }

    localStorage.setItem("token", "your-jwt-token");
    navigate("/");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setEyeIcon(showPassword ? <AiFillEye /> : <AiFillEyeInvisible />);
  };

  return (
    <Container
      maxWidth="100%"
      className="login-container"
      style={{ backgroundColor: "#44B26F" }}
    >
      <div className="login-content">
        <img src={RozetkaLogo} alt="Rozetka Logo" className="logo" />

        <TextField
          label="User Name"
          variant={
            userNameMeta.touched && userNameMeta.error ? "outlined" : "outlined"
          }
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="input-field"
          margin="normal"
          onBlur={() => handleInputBlur(userName, setUserNameMeta)}
          error={userNameMeta.touched && userNameMeta.error}
          helperText={
            userNameMeta.touched && userNameMeta.error && "Заповніть поле"
          }
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant={
            passwordMeta.touched && passwordMeta.error ? "outlined" : "outlined"
          }
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-field"
          margin="normal"
          InputProps={{
            endAdornment: (
              <span
                className="password-toggle"
                onClick={togglePasswordVisibility}
                style={{ fontSize: "25px" }}
              >
                {eyeIcon}
              </span>
            ),
          }}
          onBlur={() => handleInputBlur(password, setPasswordMeta)}
          error={passwordMeta.touched && passwordMeta.error}
          helperText={
            passwordMeta.touched && passwordMeta.error && "Заповніть поле"
          }
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleLogin}
          fullWidth
          className="login-button"
        >
          Login
        </Button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </Container>
  );
}

export default Login;
