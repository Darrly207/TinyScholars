import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import imgBackground from "../assets/hinh1.png";
import logo from "../assets/logo1.png";
import search from "../assets/z5995353599012_1aa81823073c801aeb426bcaba313cc4.jpg";
import eye from "../assets/z5995359982036_8f916b50aa1f59258171ad18fc8fe073.jpg";
import { LoginCredentials } from "../store/types/auth";
import { useAuth } from "../context/authContext";
import axios from "axios";
import Header from "../components/Header";

interface LoginError {
  email?: string;
  password?: string;
  general?: string;
}

const Signup = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<LoginError>({});
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: LoginError = {};

    if (!credentials.email.trim()) {
      newErrors.email = "Email là bắt buộc";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(credentials.email)
    ) {
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCredentials({
      ...credentials,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    try {
      await register(credentials);
      navigate("/home");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError({
          general: "Đăng ký thất bại. Vui lòng thử lại sau.",
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError({});

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        credentials
      );

      await login(credentials);
      if (response.data.user) {
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        navigate("/home");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError({
            general: "Email hoặc mật khẩu không chính xác",
          });
        } else if (err.response?.status === 404) {
          // Show registration dialog when account doesn't exist
          setShowRegisterDialog(true);
        } else {
          setError({
            general: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
          });
        }
      } else {
        setError({
          general: "Không thể kết nối đến máy chủ",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const ErrorMessage = ({ message }: { message?: string }) =>
    message ? <div className="text-red-500 text-sm mt-1">{message}</div> : null;

  return (
    <div style={styles.container}>
      <AlertDialog
        open={showRegisterDialog}
        onOpenChange={setShowRegisterDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Tài khoản không tồn tại</AlertDialogTitle>
            <AlertDialogDescription>
              Tài khoản này chưa được đăng ký. Bạn có muốn đăng ký tài khoản mới
              không?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowRegisterDialog(false)}>
              Hủy
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleRegister}>
              Đăng ký
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div style={styles.loginForm}>
        {/* Rest of the existing JSX remains the same */}
        <h1 style={styles.welcomeText}>CHÀO MỪNG TRỞ LẠI</h1>

        <div style={styles.pawIconContainer}>
          <img src={logo} alt="Logo" style={styles.pawIcon} />
        </div>

        <form onSubmit={handleSubmit} style={styles.formFields}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Tài khoản</label>
            <div style={styles.inputContainer}>
              <input
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                placeholder="example@gmail.com"
                style={styles.input}
              />
              <ErrorMessage message={error.email} />
            </div>
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
              <button
                type="button"
                style={styles.eyeIcon}
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <img src={eye} alt="" style={{ width: "15px" }} />
              </button>
              <ErrorMessage message={error.password} />
            </div>
          </div>

          <ErrorMessage message={error.general} />

          <div style={styles.rememberForgotContainer}>
            <label style={styles.checkboxLabel}>
              <input type="checkbox" style={styles.checkbox} />
              <span style={styles.checkboxText}>Ghi nhớ đăng nhập</span>
            </label>
            <a href="#" style={styles.forgotPassword}>
              Quên mật khẩu?
            </a>
          </div>

          <div style={styles.buttonContainer}>
            <button
              type="button"
              style={{
                ...styles.registerButton,
                background: "linear-gradient(45deg, #f1b21f, #306f00)",
                color: isHovered2 ? "white" : "black",
                flex: 3.5,
              }}
              onMouseEnter={() => setIsHovered2(true)}
              onMouseLeave={() => setIsHovered2(false)}
            >
              Đăng ký
            </button>
            <button
              type="submit"
              style={{
                ...styles.loginButton,
                background: "linear-gradient(45deg, #f1b21f, #306f00)",
                color: isHovered ? "white" : "black",
                flex: 6.5,
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Đăng nhập →"}
            </button>
          </div>
        </form>
      </div>

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
  nav: {
    background: "white",
    padding: "10px 20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    position: "fixed" as const,
    width: "100%",
    top: 0,
    zIndex: 1000,
  },
  navContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoLink: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    gap: "10px",
  },
  navLogo: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
  },
  brandName: {
    fontSize: "24px",
    fontWeight: 600,
    color: "#306f00",
  },
  searchContainer: {
    flex: 1,
    maxWidth: "600px",
    margin: "0 48px",
    position: "relative" as const,
  },
  searchInput: {
    width: "100%",
    padding: "8px 16px",
    paddingRight: "40px",
    borderRadius: "24px",
    border: "1px solid #e5e7eb",
    outline: "none",
    fontSize: "16px",
  },
  searchButton: {
    position: "absolute" as const,
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  searchIcon: {
    width: "15px",
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
