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
        <ul className="nav-bar">
          <li className="brand">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <h2 style={{ color: "white" }}>
                <img src={Logo} alt="Comany Logo" style={{ height: "3rem" }} />
                Project Tracker
              </h2>
            </Link>
          </li>
          <li>
            <button onClick={() => navigate("/")} className="button">
              <img src="https://img.icons8.com/fluency-systems-regular/48/6187C2/home.png" alt="Home"/>{" "}
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/logs")} className="button">
              <img src="https://img.icons8.com/pastel-glyph/48/6187C2/spiral-bound-booklet.png" alt="Logs"/>{" "}
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/agenda")} className="button">
              <img src="https://img.icons8.com/ios/48/6187C2/calendar--v1.png" alt="agenda"/>{" "}
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/print")} className="button">
              <img src="https://img.icons8.com/ios/48/6187C2/print--v1.png" alt="Print"/>{" "}
            </button>
          </li>
          <li>
            {user ? (
              <button className="button" onClick={logoutUser}>
                <img src="https://img.icons8.com/ios-glyphs/48/6187C2/logout-rounded-down.png" alt="Logout"/>{" "}
              </button>
            ) : (
              <button className="button" onClick={() => navigate("/login")}>
                <img src="https://img.icons8.com/ios-filled/48/6187C2/login-rounded-down.png" alt="Login"/>{" "}
              </button>
            )}
          </li>
        </ul>
      </div>
    );
  } else
    return (
      <div>
        <ul className="nav-bar">
          <li className="brand">
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <h2 style={{ color: "white" }}>
                <img src={Logo} alt="Comany Logo" style={{ height: "3rem" }} />
                Project Tracker
              </h2>
            </Link>
          </li>
          <li>
            <button onClick={() => navigate("/")} className="button">
              <img src="https://img.icons8.com/fluency-systems-regular/48/6187C2/home.png" alt="Home"/>
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/logs")} className="button">
              <img src="https://img.icons8.com/pastel-glyph/48/6187C2/spiral-bound-booklet.png" alt="Logs"/>{" "}
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/agenda")} className="button">
              <img src="https://img.icons8.com/ios/48/6187C2/calendar--v1.png" alt="Agenda"/>{" "}
            </button>
          </li>
          <li>
            {user ? (
              <button className="button" onClick={logoutUser}>
                <img src="https://img.icons8.com/ios-glyphs/48/6187C2/logout-rounded-down.png" alt="Logout"/>{" "}
              </button>
            ) : (
              <button className="button" onClick={() => navigate("/login")}>
                <img src="https://img.icons8.com/ios-filled/48/6187C2/login-rounded-down.png" alt="Login"/>{" "}
              </button>
            )}
          </li>
        </ul>
      </div>
    );
};

export default Navbar;
