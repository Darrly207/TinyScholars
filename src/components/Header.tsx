import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import logo from "../assets/logo1.png";
import search from "../assets/z5995353599012_1aa81823073c801aeb426bcaba313cc4.jpg";
const Header: React.FC = () => {
  return (
    <div style={{}}>
      <nav
        style={{
          background: "white",
          padding: "10px 20px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          position: "fixed",
          width: "100%",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo Section */}
          <Link
            to="/home"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              gap: "10px",
            }}
          >
            <img
              src={logo}
              alt="TinyScholars Logo"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
              }}
            />
            <span
              style={{
                fontSize: "24px",
                fontWeight: 600,
                color: "#306f00",
              }}
            >
              TinyScholars
            </span>
          </Link>

          {/* Search Bar */}
          <div
            style={{
              flex: "1",
              maxWidth: "600px",
              margin: "0 48px",
              position: "relative",
            }}
          >
            <input
              type="search"
              placeholder="Tìm kiếm..."
              style={{
                width: "100%",
                padding: "8px 16px",
                paddingRight: "40px",
                borderRadius: "24px",
                border: "1px solid #e5e7eb",
                outline: "none",
                fontSize: "16px",
              }}
            />
            <button
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
            >
              <img src={search} alt="" style={{ width: "15px" }} />
            </button>
          </div>

          {/* Auth Buttons */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
            }}
          ></div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
