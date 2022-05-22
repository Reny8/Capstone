import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useCustomForm from "../../hooks/useCustomForm";
import { Link } from "react-router-dom";
import "./RegisterPage.css";
const RegisterPage = () => {
  const { registerUser } = useContext(AuthContext);
  const defaultValues = {
    username: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    role: ""
  };
  const [formData, handleInputChange, handleSubmit] = useCustomForm(
    defaultValues,
    registerUser
  );

  return (
    <div>
      <form className="register-container" onSubmit={handleSubmit}>
        {" "}
        <div className="border-box">
          <h2> REGISTER BELOW</h2>
          <div className="grid-box">
            <label>
              USERNAME:
              <input
                type="text"
                name="username"
                placeholder=" Enter Username Choice..."
                value={formData.username}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="grid-box">
            <label>
              FIRST NAME:
              <input
                type="text"
                name="firstName"
                placeholder = " Enter First Name Here..."
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="grid-box">
            <label>
              LAST NAME:
              <input
                type="text"
                name="lastName"
                placeholder=" Enter Last Name Here..."
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="grid-box">
            <label>
              EMAIL:
              <input
                type="text"
                name="email"
                placeholder=" Email Address Here..."
                value={formData.email}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="grid-box">
            <label>
              PASSWORD:
              <input
                type="text"
                name="password"
                placeholder=" Enter Password Choice..."
                value={formData.password}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="grid-box">
            <label>
              ROLE:
              <input
                type="text"
                name="role"
                placeholder=" Enter your Role..."
                value={formData.password}
                onChange={handleInputChange}
              />
            </label>
          </div>
          <div className="grid-box">
            <Link to="/login">LOGIN</Link>{" "}
            <button className="button">REGISTER</button>{" "}
          </div>
          <p style={{ fontSize: "12px" }}>
            NOTE: Make this an uncommon password with characters, numbers, and
            special characters!
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
