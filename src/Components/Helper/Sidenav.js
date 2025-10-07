import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sidenav, Nav } from "rsuite";
import "./css/Sidenav.css";
import Routes from "../../Routes";
// ICONS
import { IoLockClosed } from "react-icons/io5";
import { IoLockOpen } from "react-icons/io5";
import xoGreen from "../../Images/xoGreen.png";
import spendxoGreen from "../../Images/spendxoGreen.png";

const Sidenavbar = ({ onCollapseChange }) => {
  const location = useLocation();
  const path = location.pathname;

  const navigate = useNavigate();
  const initialLockState = localStorage.getItem("lock") === "true";
  const [expanded, setExpanded] = useState(initialLockState);
  const [lock, setLock] = useState(initialLockState);
  const [activeKey, setActiveKey] = useState(
    localStorage.getItem("activeKey") || null
  );
  const [openKeys, setOpenKeys] = useState([]);

  const handleMouseEnter = () => {
    if (!lock) {
      setExpanded(true);
      onCollapseChange(true);
    }
  };

  const handleMouseLeave = () => {
    if (!lock) {
      onCollapseChange(false);
      setExpanded(false);
    }
  };

  useEffect(() => {
    const lockState = localStorage.getItem("lock") === "true";
    setLock(lockState);
    setExpanded(lockState);
    onCollapseChange(lockState);
  }, []);

  useEffect(() => {
    if (activeKey !== null) {
      localStorage.setItem("activeKey", activeKey);
    }
  }, [activeKey]);

  const handleLock = (val) => {
    setLock(val);
    setExpanded(val);
    onCollapseChange(val);
    localStorage.setItem("lock", val);
  };

  const isParentActive = (parentKey) => {
    if (!activeKey) return false;
    return activeKey.toString().startsWith(parentKey + "-");
  };

  useEffect(() => {
    const findActiveKey = (routes) => {
      for (let i = 0; i < routes.length; i++) {
        if (routes[i].link === path) {
          setActiveKey(i + 1);
          return;
        }
        if (routes[i].sub && routes[i].routes) {
          const subRouteIndex = routes[i].routes.findIndex(
            (subRoute) => subRoute.link === path
          );
          if (subRouteIndex !== -1) {
            setActiveKey(`${i + 1}-${subRouteIndex + 1}`);
            // Set the open key to the current menu
            setOpenKeys([String(i + 1)]);
            return;
          }
        }
      }
    };
    findActiveKey(Routes);
  }, [path]);

  const handleClick = (subRouteLink) => {
    navigate(subRouteLink);
  };

  const handleMenuToggle = (openKeys) => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    setOpenKeys(lastOpenKey ? [lastOpenKey] : []);
  };

  return (
    <div
      className={`sidebar ${expanded ? "collapse-out" : "collapse-in"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="side-brand ">
        <p
          style={{
            paddingTop: "20px",
            margin: "0px",
            fontSize: "18px",
            fontWeight: 700,
            textAlign: "center",
          }}
        >
          {expanded ? (
            <img style={{ width: "100px" }} src={spendxoGreen} />
          ) : (
            <img style={{ width: "30px" }} src={xoGreen} />
          )}
        </p>
        <div style={{ position: "absolute", right: 12, top: 20 }}>
          {expanded &&
            (lock ? (
              <IoLockClosed
                onClick={() => handleLock(false)}
                style={{ cursor: "pointer", color: "#38858e" }}
              />
            ) : (
              <IoLockOpen
                onClick={() => handleLock(true)}
                style={{ cursor: "pointer" }}
              />
            ))}
        </div>
      </div>
      <hr style={{ background: "black", margin: "10px" }} />
      <Sidenav
        appearance="inverse"
        expanded={expanded}
        openKeys={openKeys}
        onOpenChange={handleMenuToggle}
      >
        <Sidenav.Body>
          <Nav activeKey={activeKey}>
            {Routes.map((route, i) => {
              if (route.sub) {
                return (
                  <Nav.Menu
                    key={i}
                    placement="rightStart"
                    eventKey={String(i + 1)}
                    title={
                      <span style={{ fontSize: "12px", margin: "0px" }}>
                        {route.name}
                      </span>
                    }
                    icon={route.icon}
                    active={isParentActive(String(i + 1))}
                  >
                    {route.routes.map((sub, index) => (
                      <Nav.Item
                        style={{ fontSize: "11px" }}
                        key={`${i + 1}-${index}`}
                        eventKey={`${i + 1}-${index + 1}`}
                        icon={
                          <span style={{ marginRight: "5px" }}>{sub.icon}</span>
                        }
                        onClick={() => handleClick(sub.link)}
                      >
                        {sub.name}
                      </Nav.Item>
                    ))}
                  </Nav.Menu>
                );
              }

              return (
                <Nav.Item
                  style={{ fontSize: "12px" }}
                  key={i}
                  eventKey={i + 1}
                  icon={route.icon}
                  onClick={() => {
                    navigate(route.link);
                  }}
                >
                  {route.name}
                </Nav.Item>
              );
            })}
          </Nav>
        </Sidenav.Body>
      </Sidenav>
    </div>
  );
};

export default Sidenavbar;
