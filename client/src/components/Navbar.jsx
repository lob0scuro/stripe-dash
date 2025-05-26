import React from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../assets/images/matts-logo.png";
import { useAuth } from "../context/UserContext";
import Button from "../components/Button";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav>
      <h1>Stripe Dashboard</h1>
      {user && (
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/customers">Customers</NavLink>
          <NavLink to="/products">Products</NavLink>
        </div>
      )}
      {user && <Button title="logout" onClick={() => logout()} />}
    </nav>
  );
};

export default Navbar;
