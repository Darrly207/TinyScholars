import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "./logo";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { FullscreenContext } from "../context/fullScreenContext";
interface NavbarProps {
  onToggleFullscreen: () => void;
}
const Navbar: React.FC = (onToggleFullscreen) => {
  const { isFullscreen, toggleFullscreen, containerRef, setIsFullscreen } =
    useContext(FullscreenContext);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div
      className="navbar"
      style={{
        background: "#C0C0C0",
        display: "flex",
      }}
    >
      <Link to="/start" style={{ marginLeft: "40vw", textDecoration: "none" }}>
        <h2>Bắt Đầu</h2>
      </Link>

      <div
        style={{
          width: "30vw",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div>
          <Button style={{ width: "8vw", margin: "0px 10px" }}>
            <Link
              to="/upgrade"
              style={{ color: "black", textDecoration: "none" }}
            >
              Upgrade
            </Link>
          </Button>
          <Button
            style={{
              background: "white",
              width: "8vw",
              height: "5vh",
              color: "black",
            }}
            onClick={handleFullscreen}
          >
            Xem trước
          </Button>
        </div>
        <div>
          <Button style={{ background: "white", margin: "0px 10px" }}>
            <Link
              to="/upgrade"
              style={{ color: "black", textDecoration: "none" }}
            >
              Thoát
            </Link>
          </Button>
          <Button>
            <Link
              to="/upgrade"
              style={{ color: "black", textDecoration: "none" }}
            >
              Lưu
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
