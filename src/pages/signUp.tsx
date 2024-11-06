import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imgBackground from "../assets/hinh1.png";
import logo from "../assets/logo1.png";
import search from "../assets/z5995353599012_1aa81823073c801aeb426bcaba313cc4.jpg";
import eye from "../assets/z5995359982036_8f916b50aa1f59258171ad18fc8fe073.jpg";
import { LoginCredentials } from "../types/auth";
import { useAuth } from "../context/authContext";
import axios from "axios";

interface LoginError {
  email?: string;
  password?: string;
  general?: string;
}

const Signup = () => {
  const { login } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<LoginError>({});
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: LoginError = {};

    if (!credentials.email) {
      newErrors.email = "Email là bắt buộc";
    } else if (!/\S+@\S+\.\S+/.test(credentials.email)) {
      newErrors.email = "Email không hợp lệ";
    }

    if (!credentials.password) {
      newErrors.password = "Mật khẩu là bắt buộc";
    } else if (credentials.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError({});

    try {
      await login(credentials);
      navigate("/home");
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError({
          general: err.response.data.message || "Đăng nhập thất bại.",
        });
      } else {
        setError({ general: "Đăng nhập thất bại." });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginForm}>
        <h1 style={styles.welcomeText}>CHÀO MỪNG TRỞ LẠI</h1>
        <div style={styles.pawIconContainer}>
          <img style={styles.pawIcon} src={logo} alt="Logo" />
        </div>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Tài khoản</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleInputChange}
              placeholder="example@gmail.com"
              style={styles.input}
            />
            {error.email && <div style={{}}>{error.email}</div>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Mật khẩu</label>
            <div style={styles.inputContainer}>
              <input
                type={isPasswordVisible ? "text" : "password"}
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                style={styles.input}
              />
              <span
                style={styles.eyeIcon}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <img src={eye} alt="Show Password" style={{ width: "15px" }} />
              </span>
            </div>
            {error.password && <div style={{}}>{error.password}</div>}
          </div>

          {error.general && <div style={{}}>{error.general}</div>}

          <div style={styles.buttonContainer}>
            <button type="button" style={styles.registerButton}>
              Đăng ký
            </button>
            <button
              type="submit"
              style={styles.loginButton}
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Đăng nhập →"}
            </button>
          </div>
        </form>
      </div>
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
    fontFamily: "Bungee",
    fontSize: "24px",
    textAlign: "center" as "center",
    marginBottom: "32px",
    color: "#306f00",
    letterSpacing: "4px",
    fontWeight: "800",
  },
  pawIconContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "12px",
  },
  pawIcon: {
    width: "80px",
    height: "80px",
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
    border: "1px solid #306f00",
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
    color: "#306f00",
  },
  forgotPassword: {
    fontSize: "14px",
    color: "#306f00",
    textDecoration: "none",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row" as "row",
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
