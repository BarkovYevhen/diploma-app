import React, { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import RozetkaLogo from '../../assets/RozetkaLogo.svg';
import "./Login.css";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [eyeIcon, setEyeIcon] = useState(<AiFillEye />);

  const handleLogin = () => {
    // Тут буде логіка аутентифікації
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
          variant="outlined"
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="input-field"
          margin="normal"
        />

        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
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
      </div>
    </Container>
  );
}

export default Login;