import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import Cookies from "universal-cookie";
import "./css/Navbar.css";
import { useMsal } from "@azure/msal-react";
import { useNavigate, useLocation } from "react-router-dom";

function MenuNavbar() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const { instance } = useMsal();
  const location = useLocation();
  const path = location.pathname.slice(1).split("-");
  const formattedPath = path
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  let user = cookies.get("spendXoUser");

  const handleLogout = async () => {
    await instance.logoutPopup();
    cookies.remove("spendXoIsAuth");
    cookies.remove("spendXoToken");
    cookies.remove("spendXoUser");
    cookies.remove("spendXoUserType");
    navigate("/");
  };
  return (
    <div className="navbar">
      <div>
        <p
          style={{
            margin: "0px",
            fontSize: "14px",
            fontWeight: 600,
            textAlign: "left",
          }}
        >
          Procurement Intelligence and Analytics Platform
        </p>
        <p style={{ margin: "0px", fontSize: "12px", textAlign: "left" }}>
          {formattedPath}
        </p>
      </div>
      {/* PROFILE */}
      <div style={{ paddingTop: "2px" }}>
        <Dropdown>
          <Dropdown.Toggle
            bsPrefix="custom-toggle"
            size="sm"
            className="custom-toggle"
          >
            <FaUser />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item className="custom-item">
              <FaUser className="custom-icon" />
              {user?.displayName}
            </Dropdown.Item>
            <Dropdown.Item onClick={handleLogout} className="custom-item">
              <FaSignOutAlt className="custom-icon" />
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default MenuNavbar;
