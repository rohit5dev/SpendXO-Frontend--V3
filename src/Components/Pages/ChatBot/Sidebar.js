import React, { useState } from "react";
import "./css/Sidebar.css";
import { MdDeleteOutline, MdEdit, MdMoreVert } from "react-icons/md"; // Import the three-dot icon
import { BiMessageSquareAdd, BiSolidRename } from "react-icons/bi";
import { TbLayoutSidebarRightExpand } from "react-icons/tb";
import { OverlayTrigger, Tooltip } from "react-bootstrap/";
import { Popover } from "react-bootstrap";

const Sidebar = ({
  chats,
  onNewChat,
  onSelectChat,
  onRenameChat,
  currentChatIndex,
  isLoading,
  setIsNavClosed,
}) => {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        <div>
          <p>Are you sure you want to delete?</p>
          <div className="d-flex justify-content-end">
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => setShowPopover(false)}
            >
              Cancel
            </button>
            <button
              className="ms-2 btn btn-sm btn-danger"
              onClick={() => confirm()}
            >
              Delete
            </button>
          </div>
        </div>
      </Popover.Body>
    </Popover>
  );

  const [editingChatIndex, setEditingChatIndex] = useState(null);
  const [tempTitle, setTempTitle] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [showHelpPopUp, setShowHelpPopUp] = useState(false);
  const [activePopoverIndex, setActivePopoverIndex] = useState(null); // Track active popover index

  //hwlp desk popup toogle
  const togglePopup = () => {
    setShowHelpPopUp(!showHelpPopUp);
  };

  //confirmation for delete popover handling
  const handlePopoverClick = (isOpen) => {
    setShowTooltip(!isOpen);
    setShowPopover(true);
  };

  //when delete confirmed for the delete from the popup
  const confirm = (chatIndex) => {
    if (chatIndex !== undefined) {
      const updatedChats = chats.filter((_, index) => index !== chatIndex);
      localStorage.setItem("chats", JSON.stringify(updatedChats));
      window.location.reload();
    } else {
      handleClearLocalStorage();
    }
  };

  // handle sidebar visibility
  const handleSidebarToggle = () => {
    setIsNavClosed((prev) => !prev); // Update state in Chatbot
  };

  // Start editing a chat title
  const handleRenameStart = (index) => {
    setEditingChatIndex(index);
    setTempTitle(chats[index].title);
  };

  // Update the temporary title as the user types
  const handleRenameChange = (e) => {
    setTempTitle(e.target.value);
  };

  // Submit the updated chat title
  const handleRenameSubmit = (index) => {
    if (tempTitle.trim() === "") return; // Avoid empty titles
    onRenameChat(index, tempTitle); // Update the chat title in the parent
    setEditingChatIndex(null); // Stop editing
  };

  const handleClearLocalStorage = () => {
    localStorage.removeItem("chats");
    window.location.reload();
  };

  return (
    <div className="sidebar-bot">
      <div className="chats-container">
        <div className="nav-title">
          {/* Close Sidebar */}
          <OverlayTrigger
            key="bottom"
            placement="bottom"
            overlay={
              <Tooltip style={{ fontSize: "12px" }}>Close Sidebar</Tooltip>
            }
          >
            <div className="sidenav-icon " onClick={handleSidebarToggle}>
              <TbLayoutSidebarRightExpand />
            </div>
          </OverlayTrigger>

          <div className="icon-container">
            {/* new chat */}
            <OverlayTrigger
              key="bottom"
              placement="bottom"
              overlay={<Tooltip style={{ fontSize: "12px" }}>New Chat</Tooltip>}
            >
              <div
                className="sidenav-icon chat-icon"
                onClick={() => {
                  !isLoading && onNewChat();
                }}
              >
                <BiMessageSquareAdd />
              </div>
            </OverlayTrigger>

            {/* Clear chat hiostory */}
            <OverlayTrigger
              trigger="click"
              show={showPopover}
              placement="bottom"
              overlay={popover}
              onToggle={handlePopoverClick}
            >
              <div
                onMouseEnter={() => setShowTooltip(true)} // Show tooltip on hover
                onMouseLeave={() => setShowTooltip(false)} // Hide tooltip when not hovering
              >
                <OverlayTrigger
                  show={showTooltip}
                  placement="bottom"
                  overlay={
                    <Tooltip style={{ fontSize: "12px" }}>
                      Clear Chat History
                    </Tooltip>
                  }
                >
                  <div className="sidenav-icon">
                    <MdDeleteOutline />
                  </div>
                </OverlayTrigger>
              </div>
            </OverlayTrigger>
          </div>
        </div>
        <hr className="seperator" />

        <div className="chat-history">
          {chats.length === 0 ? (
            <p className="muted">No chats yet. Start a new one!</p>
          ) : (
            [...chats].reverse().map((chat, index) => {
              const reversedIndex = chats.length - 1 - index;
              return (
                <div
                  key={reversedIndex}
                  className={`chat-item chat-title  ${
                    currentChatIndex === reversedIndex ? "active" : ""
                  }`}
                  onClick={() => {
                    !isLoading && onSelectChat(reversedIndex);
                  }}
                >
                  {editingChatIndex === reversedIndex ? (
                    <input
                      className="edit-input"
                      value={tempTitle}
                      onChange={handleRenameChange}
                      onBlur={() => handleRenameSubmit(reversedIndex)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && handleRenameSubmit(reversedIndex)
                      }
                      autoFocus
                    />
                  ) : (
                    <div className="chat-history-item">
                      <span>{chat.title}</span>
                      <OverlayTrigger
                        trigger="click"
                        placement="bottom"
                        show={activePopoverIndex === reversedIndex} // Show only for the active index
                        onToggle={(isOpen) => {
                          if (!isOpen) setActivePopoverIndex(null); // Close when toggled off
                        }}
                        rootClose // Close when clicking outside
                        overlay={
                          <Popover id="popover-basic">
                            <Popover.Body className="p-1 pt-2">
                              <div className="d-flex flex-column">
                                <button
                                  className="btn btn-sm outlined-btn global-font d-flex align-items-center mb-1 px-4"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleRenameStart(reversedIndex);
                                    setActivePopoverIndex(null);
                                  }}
                                >
                                  <BiSolidRename className="me-2" /> Rename
                                </button>
                                <button
                                  className="btn btn-sm outlined-btn global-font d-flex align-items-center px-4"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    confirm(reversedIndex);
                                    setActivePopoverIndex(null);
                                  }}
                                >
                                  <MdDeleteOutline className="me-2" /> Delete
                                </button>
                              </div>
                            </Popover.Body>
                          </Popover>
                        }
                      >
                        <button
                          className="btn p-0 chat-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePopoverIndex(
                              activePopoverIndex === reversedIndex
                                ? null
                                : reversedIndex
                            ); // Toggle visibility
                          }}
                        >
                          <MdMoreVert />{" "}
                          {/* Three-dot icon to trigger the popover */}
                        </button>
                      </OverlayTrigger>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
