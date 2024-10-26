import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/authContext";
import { LoginCredentials } from "../types/auth";
import { useFacebookLogin } from "../hook/useFacebookLogin";
import google from "../assets/google-icon-isolated-3d-render-illustration_47987-9777.avif";
import facbook from "../assets/blue-white-sign-that-says-facebook_470458-570.avif";
import gmail from "../assets/gmail-logo-on-transparent-white-background-free-vector.jpg";
import backgroundImage from "../assets/reflection.avif";
interface GoogleLoginResponse {
  access_token: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginError {
  email?: string;
  password?: string;
  general?: string;
}

//const FACEBOOK_APP_ID = "YOUR_FACEBOOK_APP_ID";

const LoginPage: React.FC = () => {
  const { login, loginWithGoogle, loginWithFacebook } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);

    try {
      await login(credentials);
      navigate("/");
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGmailClick = () => {
    navigate("/Signup");
  };

  // Google Login
  // const googleLogin = useGoogleLogin({
  //   onSuccess: async (tokenResponse: GoogleLoginResponse) => {
  //     setIsLoading(true);
  //     try {
  //       await loginWithGoogle(tokenResponse.access_token);
  //       navigate("/");
  //     } catch (error) {
  //       setError("Đăng nhập với Google thất bại");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },
  //   onError: () => setError("Đăng nhập với Google thất bại"),
  // });

  // Facebook Login using custom hook
  // const handleFacebookLogin = useFacebookLogin(
  //   FACEBOOK_APP_ID,
  //   async (token: string) => {
  //     setIsLoading(true);
  //     try {
  //       await loginWithFacebook(token);
  //       navigate("/");
  //     } catch (error) {
  //       setError("Đăng nhập với Facebook thất bại");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },
  //   (error: string) => setError(error)
  // );

  return (
    <div style={styles.loginForm}>
      <div style={{ flex: 1, marginTop: "2.2%" }}>
        <div>
          <h2 style={{ marginLeft: "5%" }}>
            Đăng nhập hoặc đăng ký nhanh chóng
          </h2>
        </div>
        <div style={{ marginLeft: "5%", marginRight: "10%" }}>
          Dùng email hoặc dịch vụ khác để tiếp tục với Tiny, hoàn toàn miễn phí
        </div>

        {/* Google Login Button */}
        <div
          style={styles.googleContainer}
          // onClick={() => googleLogin()}
          //type="button"
          //disabled={isLoading}
        >
          <div style={{ flex: 1, marginLeft: 2 }}>
            <img src={google} alt="Google" style={styles.icon} />
          </div>
          <div style={{ flex: 3 }}>Tiếp tục với Google</div>
        </div>

        {/* Facebook Login Button */}
        <div
          style={styles.googleContainer}
          //onClick={handleFacebookLogin}
          //disabled={isLoading}
        >
          <div style={{ flex: 1, marginLeft: 2 }}>
            <img src={facbook} alt="Facebook" style={styles.icon} />
          </div>
          <div style={{ flex: 3 }}>Tiếp tục với Facebook</div>
        </div>

        {/* Gmail Sign Up Button */}
        <div
          style={styles.googleContainer}
          onClick={handleGmailClick}
          //type="button"
          //disabled={isLoading}
        >
          <div style={{ flex: 1, marginLeft: 2 }}>
            <img src={gmail} alt="Gmail" style={styles.icon} />
          </div>
          <div style={{ flex: 3 }}>Tiếp tục với Gmail</div>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <div style={styles.terms}>
          Tiếp tục có nghĩa là bạn đồng ý với{" "}
          <a href="/terms" style={styles.link}>
            Điều khoản sử dụng
          </a>{" "}
          của Tiny. Đọc{" "}
          <a href="/privacy" style={styles.link}>
            Chính sách quyền riêng tư của chúng tôi
          </a>
        </div>
      </div>
      <div style={styles.image} />
    </div>
  );
};

const styles = {
  loginForm: {
    maxHeight: "65%",
    height: "70vh",
    maxWidth: "80%",
    width: "80vh",
    background: "#DDDDDD",
    display: "flex",
    margin: "auto",
    marginTop: "5%",
    borderRadius: 20,
  },
  image: {
    backgroundImage: `url(${backgroundImage})`,
    height: "100vh",
    maxHeight: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden",
    flex: 1,
    borderRadius: "0 20px 20px 0",
  },
  googleContainer: {
    marginLeft: "5%",
    marginRight: "6%",
    display: "flex",
    marginTop: "5%",
    border: "1px solid",
    padding: 4,
    justifyItems: "center",
    alignItems: "center",
    borderRadius: 10,
    background: "#DDDDDD",
    cursor: "pointer",
  },
  icon: {
    height: 25,
    width: 25,
    borderRadius: 7,
    marginTop: "3%",
  },
  error: {
    color: "red",
    marginLeft: "5%",
    marginTop: "10px",
  },
  terms: {
    marginLeft: "5%",
    marginRight: "10%",
    fontSize: 15,
    marginTop: "5%",
  },
  link: {
    color: "gray",
    cursor: "pointer",
    textDecoration: "none",
  },
} as const;

export default LoginPage;
