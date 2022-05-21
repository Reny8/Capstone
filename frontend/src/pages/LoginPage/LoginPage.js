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
        <form className="grid" onSubmit={handleSubmit}>
          <div className="border-box">
            <h2 >LOGIN HERE</h2>
            <div className="grid-box">
              <label>USERNAME:</label>{" "}
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>

            <div className="grid-box">
              <label>PASSWORD:</label>{" "}
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            {isServerError ? (
              <div className="grid-box">
                <p className="error">Login failed, incorrect credentials!</p>
              </div>
            ) : null}
            <div className="grid-box">
              <Link to="/register">REGISTER HERE</Link>{" "}
              <button className="button">SIGN IN</button>{" "}
            </div>
          </div>
        </form>
    </div>
  );
};

export default LoginPage;
