import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div>
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <b>Project Tracker</b>
          </Link>
        </li>
        <li><button>HOME</button></li>
        <li>
          {user ? (
            <button onClick={logoutUser}>LOGOUT</button>
          ) : (
            <button onClick={() => navigate("/login")}>LOGIN</button>
          )}
        </li>
        <li><button>LOGS</button></li>
        <li><button>AGENDA</button></li>
      </ul>
    </div>
  );
};

export default Navbar;
