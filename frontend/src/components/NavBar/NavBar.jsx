import React from "react";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import "./NavBar.css";
import Logo from "../../output-onlinegiftools.gif";
const Navbar = (props) => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  if (props.user && props.user.role === "Project Manager") {
    return (
      <div>
        <ul>
          <li className="brand">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <h2>
                <img src={Logo} alt="Comany Logo" style={{ height: "3rem" }} />
                Project Tracker
              </h2>
            </Link>
          </li>
          <li>
            <button onClick={() => navigate("/")} className="button">
              HOME
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/logs")} className="button">
              LOGS
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/agenda")} className="button">
              AGENDA
            </button>
          </li>
          <li>
            <button style={{fontSize: "small"}}onClick={() => navigate("/print")} className="button">
              PRINT PROJECTS
            </button>
          </li>
          <li>
            {user ? (
              <button className="button" onClick={logoutUser}>
                LOGOUT
              </button>
            ) : (
              <button className="button" onClick={() => navigate("/login")}>
                LOGIN
              </button>
            )}
          </li>
        </ul>
      </div>
    );
  } else return (
      <div>
        <ul>
          <li className="brand">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <h2>
                <img src={Logo} alt="Comany Logo" style={{ height: "3rem" }} />
                Project Tracker
              </h2>
            </Link>
          </li>
          <li>
            <button onClick={() => navigate("/")} className="button">
              HOME
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/logs")} className="button">
              LOGS
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/agenda")} className="button">
              AGENDA
            </button>
          </li>
          <li>
            {user ? (
              <button className="button" onClick={logoutUser}>
                LOGOUT
              </button>
            ) : (
              <button className="button" onClick={() => navigate("/login")}>
                LOGIN
              </button>
            )}
          </li>
        </ul>
      </div>
    );
};

export default Navbar;
