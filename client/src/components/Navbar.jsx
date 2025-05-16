import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../assets/images/matts-logo.png";
import { useAuth } from "../context/UserContext";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <nav>
      <h1>
        <span>
          <img src={Logo} alt="" />
        </span>
        <span>Stripe Dashboard</span>
      </h1>
      {user && (
        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink>Subscriptions</NavLink>
          <NavLink>Staus</NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
