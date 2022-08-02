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
              <h2 style={{ color: "white" }}>
                <img src={Logo} alt="Comany Logo" style={{ height: "3rem" }} />
                Project Tracker
              </h2>
            </Link>
          </li>
          <li>
            <button onClick={() => navigate("/")} className="button">
              <img src="https://img.icons8.com/cute-clipart/64/000000/home.png" />
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/logs")} className="button">
              <img src="https://img.icons8.com/fluency/48/000000/spiral-bound-booklet.png" />
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/agenda")} className="button">
              <img src="https://img.icons8.com/color/48/000000/calendar-16.png" />
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/print")} className="button">
              <img src="https://img.icons8.com/fluency/48/000000/print.png" />
            </button>
          </li>
          <li>
            {user ? (
              <button className="button" onClick={logoutUser}>
                <img src="https://img.icons8.com/cute-clipart/48/000000/exit.png" />{" "}
              </button>
            ) : (
              <button className="button" onClick={() => navigate("/login")}>
                <img src="https://img.icons8.com/cute-clipart/48/000000/enter.png" />{" "}
              </button>
            )}
          </li>
        </ul>
      </div>
    );
  } else
    return (
      <div>
        <ul>
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
              <img src="https://img.icons8.com/cute-clipart/64/000000/home.png" />
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/logs")} className="button">
              <img src="https://img.icons8.com/fluency/48/000000/spiral-bound-booklet.png" />
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/agenda")} className="button">
              <img src="https://img.icons8.com/color/48/000000/calendar-16.png" />
            </button>
          </li>
          <li>
            {user ? (
              <button className="button" onClick={logoutUser}>
                <img src="https://img.icons8.com/cute-clipart/48/000000/exit.png" />{" "}
              </button>
            ) : (
              <button className="button" onClick={() => navigate("/login")}>
                <img src="https://img.icons8.com/cute-clipart/48/000000/enter-2.png" />{" "}
              </button>
            )}
          </li>
        </ul>
      </div>
    );
};

export default Navbar;
