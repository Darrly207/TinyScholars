import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/reflection.avif";
import { Button } from "react-bootstrap";
function SignUp() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const handleGoBackClick = () => {
    navigate("/login");
  };
  return (
    <div style={style.loginForm}>
      <div style={{ flex: 1 }}>
        <div onClick={handleGoBackClick} style={style.clickButton}>
          <h5 style={{ fontWeight: 500 }}>{"<<"} Trở lại với đăng nhập</h5>
        </div>
        <div style={{ fontSize: 15, marginLeft: "7%", marginRight: "5%" }}>
          Chúng tôi sẽ kiểm tra xem bạn đã có tài khoảng của bạn và giúp bạn nếu
          chưa có đăng ký
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "3%",
            marginBottom: "3%",
          }}
        >
          <label
            style={{
              fontSize: 17,
              marginLeft: "7%",
              marginRight: "5%",
              marginBottom: "1%",
            }}
          >
            Email của bạn:
          </label>
          <input style={style.inputStyle} />
          <Button
            style={{
              ...style.buttonStyle,
              background: isHovered ? "darkred" : "red",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            Tiếp tục
          </Button>
        </div>
      </div>
      <div style={style.image} />
    </div>
  );
}
const style = {
  loginForm: {
    maxHeight: "65%",
    height: "70vh",
    maxWidth: "80%",
    display: "flex",
    width: "80vh",
    background: "#DDDDDD",
    margin: "auto",
    marginTop: "5%",
    borderRadius: 20,
    overflow: "hidden",
  },
  clickButton: {
    cursor: "pointer",
    border: "1px solid",
    width: "85%",
    height: "7%",
    margin: "10% 5% 2% 7%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
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
  inputStyle: {
    padding: "8px 5px 8px 12px",
    width: "86%",
    margin: "0px 0px 3% 7%",
    background: "#EEEEEE",
    borderRadius: 8,
    fontSize: 15,
    paddingLeft: -10,
    display: "flex",
  },
  buttonStyle: {
    padding: "8px 5px 8px 12px",
    width: "86.5%",
    margin: "0px 0px 3% 7%",
    borderRadius: 8,
    fontSize: 15,
    paddingLeft: "12px",
    display: "flex",
    justifyContent: "center",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
};
export default SignUp;
