import React from "react";
import { Link } from "react-router-dom";
import avatar from "../assets/462261668_824775729828330_6660427130959853689_n.png";
import { useAuth } from "../context/authContext";
const ProtectedComponent = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      Welcome {user?.firstName}!<button onClick={logout}>Logout</button>
    </div>
  );
};
const Logo = () => {
  return (
    <div
      style={{
        justifyContent: "center",
      }}
    >
      <Link
        to="/"
        style={{
          color: "#00FA9A",
          fontSize: 25,
          textDecoration: "none",
          display: "flex",
        }}
      >
        <img
          src={avatar}
          alt=""
          style={{
            maxHeight: 45,
            maxWidth: 45,
            borderRadius: 50,
            margin: "auto",
          }}
        />
        <h3
          style={{
            color: "#00FA9A",
            fontSize: 25,
          }}
        >
          TinyScholars
        </h3>
      </Link>
    </div>
  );
};

export default Logo;
