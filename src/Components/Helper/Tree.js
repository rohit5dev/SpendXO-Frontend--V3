import React, { useState } from "react";
import { MdArrowDropDown } from "react-icons/md"; // Import MdArrowDropDown
import "./css/Tree.css"; // Import CSS file

const Tree = ({ data }) => {
  const [expanded, setExpanded] = useState(true); // Set expanded to true initially

  return (
    <ul
      className="text-start global-font ms-3 p-0 text-start"
      style={{ listStyleType: "none" }} // Reduce line spacing
    >
      {data.map((item, index) => (
        <li key={index}>
          <span
            onClick={() => setExpanded(!expanded)}
            style={{
              cursor: item.children ? "pointer" : "auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            {item.children ? (
              <MdArrowDropDown
                size={20} // Icon size remains the same
                style={{
                  transform: expanded ? "rotate(0deg)" : "rotate(270deg)",
                  marginRight: "5px", // Spacing between icon and text
                }}
              />
            ) : (
              ""
            )}
            <span
              className="tree-links"
              style={{
                cursor: "pointer",
                fontWeight:
                  item.name === "Hot Rolled Coil (HRC)" ? "bold" : "normal", // Bold text
                color:
                  item.name === "Hot Rolled Coil (HRC)"
                    ? "var(--color-main)"
                    : "inherit", // Highlight in blue
              }}
            >
              {item.name}
            </span>{" "}
            {/* Text remains clickable */}
          </span>
          {expanded && item.children && <Tree data={item.children} />}
        </li>
      ))}
    </ul>
  );
};

export default Tree;
