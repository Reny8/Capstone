import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";
import Logo from "../../output-onlinegiftools.gif"
const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div>
      <ul>
        <li className="brand">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <h2><img src={Logo} style={{height: "3rem"}}/>Pro Tracker</h2>
          </Link>
        </li>
        <li><button onClick={() => navigate("/")} className="button">HOME</button></li>
        <li>
          {user ? (
            <button className="button" onClick={logoutUser}>LOGOUT</button>
          ) : (
            <button className="button" onClick={() => navigate("/login")}>LOGIN</button>
          )}
        </li>
        <li><button  onClick={() => navigate("/logs")} className="button">LOGS</button></li>
        <li><button onClick={()=> navigate("/agenda")} className="button">AGENDA</button></li>
      </ul>
    </div>
  );
};

export default Navbar;
