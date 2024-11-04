import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imgBackground from "../assets/z5995318488437_5d9b48a051ec3de542fcfd17166a8f0f.jpg";
import logo from "../assets/logo.png";
import search from "../assets/z5995353599012_1aa81823073c801aeb426bcaba313cc4.jpg";
import eye from "../assets/z5995359982036_8f916b50aa1f59258171ad18fc8fe073.jpg";
const Signup = () => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      {/* <div style={styles.logoContainer}>
        <img style={styles.logo} src={logo}></img>
        <span style={styles.logoText}>TinyScholars</span>
      </div> */}
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
          ></div>
        </div>
      </nav>
      <div style={styles.loginForm}>
        {/* Logo */}

        {/* Welcome Text */}
        <h1 style={styles.welcomeText}>CHÀO MỪNG TRỞ LẠI</h1>

        {/* Paw Icon */}
        <div style={styles.pawIconContainer}>
          <img style={styles.pawIcon} src={logo}></img>
        </div>

        {/* Form Fields */}
        <div style={styles.formFields}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Tài khoản</label>
            <div style={styles.inputContainer}>
              <input
                type="email"
                placeholder="example@gmail.com"
                style={styles.input}
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Mật khẩu</label>
            <div style={styles.inputContainer}>
              <input type="password" style={styles.input} />
              <span style={styles.eyeIcon}>
                <img src={eye} alt="" style={{ width: "15px" }} />
              </span>
            </div>
          </div>
        </div>

        {/* Remember Me & Forgot Password */}
        <div style={styles.rememberForgotContainer}>
          <label style={styles.checkboxLabel}>
            <input type="checkbox" style={styles.checkbox} />
            <span style={styles.checkboxText}>Ghi nhớ đăng nhập</span>
          </label>
          <a href="#" style={styles.forgotPassword}>
            Quên mật khẩu?
          </a>
        </div>

        {/* Buttons */}
        <div style={styles.buttonContainer}>
          <button
            style={{
              ...styles.loginButton,
              backgroundColor: isHovered ? "#95CBC6" : "#B7E4E0",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Đăng nhập →
          </button>
          <button style={styles.registerButton}>Đăng ký</button>
        </div>
      </div>

      {/* Background Decorations */}
      <div style={styles.topLeftDecoration}></div>
      <div style={styles.bottomRightDecoration}></div>
    </div>
  );
};

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    backgroundImage: `url(${imgBackground})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    position: "relative" as "relative",
    overflow: "hidden",
    // backdropFilter: "blur(100px)",
  },

  loginForm: {
    width: "100%",
    maxWidth: "440px",
    backgroundColor: "white",
    borderRadius: "24px",
    padding: "32px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  logoContainer: {
    display: "flex",
    gap: "8px",
  },
  logo: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
  },
  logoText: {
    fontSize: "20px",
    fontWeight: "600",
  },
  welcomeText: {
    fontSize: "24px",
    textAlign: "center" as "center",
    marginBottom: "32px",
    color: "#22d3ee",
    letterSpacing: "4px",
    fontWeight: "500",
  },
  pawIconContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "32px",
  },
  pawIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
  },
  formFields: {
    display: "flex",
    flexDirection: "column" as "column",
    gap: "16px",
    marginBottom: "16px",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column" as "column",
    gap: "8px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "500",
  },
  inputContainer: {
    position: "relative" as "relative",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "8px",
    border: "1px solid black",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box" as "border-box",
  },
  eyeIcon: {
    position: "absolute" as "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#9CA3AF",
    cursor: "pointer",
  },
  rememberForgotContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  checkbox: {
    marginRight: "8px",
  },
  checkboxText: {
    fontSize: "14px",
  },
  forgotPassword: {
    fontSize: "14px",
    color: "#B7E4E0",
    textDecoration: "none",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    gap: "12px",
  },
  loginButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#B7E4E0",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  registerButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "white",
    color: "black",
    border: "2px solid #B7E4E0",
    borderRadius: "8px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  topLeftDecoration: {
    position: "fixed" as "fixed",
    top: "16px",
    left: "16px",
    width: "32px",
    height: "32px",
    backgroundColor: "#B7E4E0",
    opacity: "0.2",
    borderRadius: "50%",
  },
  bottomRightDecoration: {
    position: "fixed" as "fixed",
    bottom: "16px",
    right: "16px",
    width: "64px",
    height: "64px",
    backgroundColor: "#B7E4E0",
    opacity: "0.2",
    borderRadius: "50%",
  },
};

export default Signup;
