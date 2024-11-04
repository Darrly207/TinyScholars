import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import search from "../assets/z5995353599012_1aa81823073c801aeb426bcaba313cc4.jpg";
function Home() {
  return (
    <div className="app-container" style={{ minHeight: "100vh" }}>
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
          <Link
            to="/"
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
                color: "#22d3ee",
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
          >
            <Link
              to="/login"
              style={{
                padding: "8px 24px",
                borderRadius: "24px",
                border: "1px solid #e5e7eb",
                textDecoration: "none",
                color: "#374151",
                transition: "background-color 0.2s",
              }}
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              style={{
                padding: "8px 24px",
                borderRadius: "24px",
                backgroundColor: "#a5f3fc",
                textDecoration: "none",
                color: "#374151",
                transition: "background-color 0.2s",
              }}
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "150px auto 60px",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            marginBottom: "32px",
            lineHeight: "1.2",
          }}
        >
          <span>Nơi </span>
          <span style={{ color: "#22d3ee" }}>học tập </span>
          <span>và </span>
          <span style={{ color: "#fb923c" }}>chơi </span>
          <span>lý tưởng cho bé!!!</span>
        </h1>

        <button
          style={{
            padding: "12px 32px",
            fontSize: "18px",
            fontWeight: 500,
            backgroundColor: "#a5f3fc",
            border: "none",
            borderRadius: "24px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            margin: "0 auto",
            transition: "background-color 0.2s",
          }}
        >
          <Link to="/gameLayout" style={{ textDecoration: "none" }}>
            Bắt đầu{" "}
          </Link>
          <span>▶</span>
        </button>
      </div>

      {/* Subject Grid */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 60px",
          position: "relative",
          right: "50px",
        }}
      >
        <button
          style={{
            position: "absolute",
            left: "0",
            top: "50%",
            transform: "translateY(-50%)",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "white",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            cursor: "pointer",
            zIndex: 1,
          }}
        >
          ←
        </button>

        {/* Subject Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "24px",
            padding: "0 20px",
          }}
        >
          {[
            { name: "Toán học", color: "#d9f99d", icon: "🔢" },
            { name: "Tiếng Việt", color: "#fef08a", icon: "📚" },
            { name: "Ngoại ngữ", color: "#fdba74", icon: "🌎" },
            { name: "Lịch sử", color: "#fca5a5", icon: "⏳" },
            { name: "Địa lí", color: "#d8b4fe", icon: "🌍" },
          ].map((subject, index) => (
            <div
              key={index}
              style={{
                backgroundColor: subject.color,
                borderRadius: "24px",
                padding: "24px",
                height: "280px",
                width: "200px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                transition: "transform 0.2s",
                marginRight: "20px",
                // ":hover": {
                //   transform: "scale(1.05)",
                // },
              }}
            >
              <span style={{ fontSize: "36px", marginBottom: "16px" }}>
                {subject.icon}
              </span>
              <h3 style={{ fontSize: "20px", fontWeight: 500 }}>
                {subject.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Navigation Arrow Right */}
        <button
          style={{
            position: "absolute",
            right: "-8.5vw",
            top: "50%",
            transform: "translateY(-50%)",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "white",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            cursor: "pointer",
            zIndex: 1,
          }}
        >
          →
        </button>
      </div>
    </div>
  );
}

export default Home;
