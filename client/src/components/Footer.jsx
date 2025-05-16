import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/UserContext.jsx";
import toast from "react-hot-toast";
const Footer = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const logoutUser = async () => {
    const response = await fetch("/auth/logout");
    const data = await response.json();
    if (!response.ok) {
      toast.error(data.error);
    }
    toast.success(data.message);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <footer>
      <div>
        <h4>Matt's Appliances, LLC</h4>
        <div>
          <address>
            <p>2600 Common St.</p>
            <p>Lake Charles, LA, 70607</p>
          </address>
        </div>
      </div>
      <span>
        {user ? (
          <Link
            onClick={() => logoutUser()}
            style={{ textDecoration: "underline" }}
          >
            Logout
          </Link>
        ) : (
          <Link to="/register" style={{ textDecoration: "underline" }}>
            Register
          </Link>
        )}
      </span>
    </footer>
  );
};

export default Footer;
