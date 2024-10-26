import React from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import avatar from "../assets/462261668_824775729828330_6660427130959853689_n.png";
function Home() {
  return (
    <div>
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          padding: 10,
          maxHeight: 65,
          overflow: "hidden",
          background: "#d3f1f5",
        }}
      >
        <Row
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "space-around",
          }}
        >
          <Col style={{ overflow: "hidden" }}>
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
                  maxHeight: 65,
                  maxWidth: 65,
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
          </Col>
        </Row>
        <div
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "flex-end",
            marginRight: 25,
            alignItems: "center",
          }}
        >
          <Link
            to="/support"
            style={{
              fontSize: 15,
              textDecoration: "none",
              marginLeft: 10,
              color: "darkviolet",
            }}
          >
            Trợ giúp
          </Link>
          <Link
            to="/login"
            style={{
              border: "1px solid",
              background: "#11211",
              marginLeft: 10,
              display: "flex",
              alignItems: "center",
              padding: 5,
              borderRadius: 10,
              textDecoration: "none",
              color: "darkorange",
            }}
          >
            Tài khoảng
            <img
              src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?ga=GA1.1.2107631779.1727836364&semt=ais_hybrid"
              alt="Person with sunglasses"
              style={{
                maxHeight: 35,
                maxWidth: 35,
                borderRadius: 50,
                marginLeft: 10,
              }}
            />
          </Link>
        </div>
      </nav>
      <div
        style={{
          background: "#E0F7FA",
          flex: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifySelf: "center",
          }}
        >
          <img
            src={avatar}
            alt=""
            style={{
              maxHeight: 70,
              maxWidth: 70,
              borderRadius: 50,
              marginRight: "7%",
              alignItems: "start",
            }}
          />
          <h1
            style={{
              fontSize: 40,
              maxWidth: "100%",
              display: "flex",
              flex: 1,

              flexDirection: "column",
            }}
          >
            <div style={{ display: "flex", width: "70%", gap: "10px" }}>
              Nơi{" "}
              <div style={{ color: "blue", margin: "0 5px" }}> học tập </div> và{" "}
              <div style={{ color: "orange", margin: "0 5px" }}>chơi</div>
            </div>{" "}
            lý tưởng cho bé!!
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Home;
