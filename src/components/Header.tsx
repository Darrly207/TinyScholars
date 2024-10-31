import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

const Header: React.FC = () => {
  return (
    <div>
      <nav
        style={{
          display: "flex",
          background: "gray",
          alignItems: "center",
          padding: 10,
        }}
      >
        <Row
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Col>
            <Link
              to="/"
              style={{
                color: "white",
                fontSize: 25,
                textDecoration: "none",
              }}
            >
              TinyScholars
            </Link>
          </Col>
          <Col>
            <Link
              to="/FeaturedGames"
              style={{
                color: "white",
                fontSize: 18,
                textDecoration: "none",
              }}
            >
              Trò chơi
            </Link>
          </Col>
          <Col>
            <Link
              to="/business"
              style={{
                color: "white",
                fontSize: 18,
                textDecoration: "none",
              }}
            >
              Doanh nghiệp
            </Link>
          </Col>
          <Col>
            <Link
              to="/PackagesAndPrices"
              style={{
                color: "white",
                fontSize: 18,
                textDecoration: "none",
              }}
            >
              Gói và mức giá
            </Link>
          </Col>
          <Col>
            <Link
              to="/home"
              style={{
                color: "white",
                fontSize: 18,
                textDecoration: "none",
              }}
            >
              home
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
              color: "white",
              fontSize: 15,
              textDecoration: "none",
              marginLeft: 10,
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
            }}
          >
            Tài khoảng
            <img
              src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?ga=GA1.1.2107631779.1727836364&semt=ais_hybrid"
              alt="Person with sunglasses"
              style={{
                maxHeight: 35,
                maxWidth: 35,
                borderRadius: 20,
                marginLeft: 10,
              }}
            />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
