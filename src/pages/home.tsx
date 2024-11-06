import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo1.png";
import search from "../assets/z5995353599012_1aa81823073c801aeb426bcaba313cc4.jpg";
import Header from "../components/Header";
function Home() {
  return (
    <div className="app-container" style={{ minHeight: "100vh" }}>
      <Header />

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
