import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import logo from "../assets/logo1.png";
const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".user-dropdown")) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
  };

  return (
    <div>
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
                color: "#306f00",
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
              <img src="/path/to/search.jpg" alt="" style={{ width: "15px" }} />
            </button>
          </div>

          {/* Conditional Auth Section */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
            }}
          >
            {user ? (
              // User is authenticated
              <div className="user-dropdown" style={{ position: "relative" }}>
                <button
                  onClick={toggleDropdown}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: "2px solid #22d3ee",
                    }}
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="User avatar"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          background: "#22d3ee",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                      >
                        {user.firstName?.[0]?.toUpperCase() ||
                          user.email?.[0]?.toUpperCase()}
                      </div>
                    )}
                  </div>
                </button>

                {isDropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      background: "white",
                      borderRadius: "8px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                      minWidth: "200px",
                      padding: "8px 0",
                    }}
                  >
                    <div
                      style={{
                        padding: "8px 16px",
                        borderBottom: "1px solid #e5e7eb",
                      }}
                    >
                      <div style={{ fontWeight: "bold" }}>{user.firstName}</div>
                      <div style={{ fontSize: "14px", color: "#6b7280" }}>
                        {user.email}
                      </div>
                    </div>
                    <Link
                      to="/profile"
                      style={{
                        display: "block",
                        padding: "8px 16px",
                        color: "#374151",
                        textDecoration: "none",
                      }}
                    >
                      Hồ sơ của tôi
                    </Link>
                    <Link
                      to="/settings"
                      style={{
                        display: "block",
                        padding: "8px 16px",
                        color: "#374151",
                        textDecoration: "none",
                      }}
                    >
                      Cài đặt
                    </Link>
                    <button
                      onClick={handleLogout}
                      style={{
                        width: "100%",
                        padding: "8px 16px",
                        textAlign: "left",
                        background: "none",
                        border: "none",
                        color: "#ef4444",
                        cursor: "pointer",
                        fontSize: "16px",
                      }}
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // User is not authenticated
              <>
                <Link
                  to="/login"
                  style={{
                    padding: "8px 24px",
                    borderRadius: "24px",
                    border: "1px solid #e5e7eb",
                    textDecoration: "none",
                    color: "#374151",
                    transition: "background-color 0.2s",
                  }}
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  style={{
                    padding: "8px 24px",
                    borderRadius: "24px",
                    backgroundColor: "#a5f3fc",
                    textDecoration: "none",
                    color: "#374151",
                    transition: "background-color 0.2s",
                  }}
                >
                  Đăng ký
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
