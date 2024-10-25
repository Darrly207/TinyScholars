import React from "react";
import { Container } from "react-bootstrap";

function Login() {
  return (
    <div
      style={{
        height: 400,
        width: 150,
        background: "red",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3>Đăng nhập hoặc đăng ký nhanh chóng</h3>
    </div>
  );
}
const style = {
  loginForm: {
    height: 400,
    width: 150,
    background: "red",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default Login;
