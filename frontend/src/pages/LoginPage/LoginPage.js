import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const { loginUser, isServerError } = useContext(AuthContext);
  const defaultValues = { username: "", password: "" };
  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    defaultValues,
    loginUser
  );

  useEffect(() => {
    if (isServerError) {
      reset();
    }
  }, [isServerError]);

  return (
    <div>
      <form className="login-container" onSubmit={handleSubmit}>
        <div className="border-box">
          <h2>LOGIN BELOW</h2>
          <div className="grid-box">
            <label>USERNAME:
            <input
              type="text"
              name="username"
              placeholder= " Username Here..."
              value={formData.username}
              onChange={handleInputChange}
            /></label>{" "}
          </div>
          <div className="grid-box">
            <label>PASSWORD:
            <input
              type="text"
              name="password"
              placeholder=" Password Here..."
              value={formData.password}
              onChange={handleInputChange}
            /></label>{" "}
          </div>{" "}
          <div className="grid-box">
            <Link to="/register">REGISTER HERE</Link>{" "}
            <button className="button">SIGN IN</button>{" "}
          {isServerError ? (
            <p className="error">Login failed, incorrect credentials!</p>
          ) : null}
          </div>{" "}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
