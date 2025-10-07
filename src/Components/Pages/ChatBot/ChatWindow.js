import React, { useEffect, useRef, useState } from "react";
import "./css/ChatWindow.css";
import xoImg from "../../../Images/Chatbot/xo.png";
import { toast } from "react-toastify";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import InputField from "./InputField";
import Markdown from "markdown-to-jsx";
// ICONS
import { LuRefreshCcw } from "react-icons/lu";
import { FaArrowDown } from "react-icons/fa";
import { IoCopyOutline } from "react-icons/io5";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { FaCircle } from "react-icons/fa";
import { BiMessageSquareAdd } from "react-icons/bi";

const ChatWindow = ({
  messages,
  isNavClosed,
  setIsNavClosed,
  isLoading,
  onSendMessage,
  onRetryMessage, // Add retry handler
  isWebSocketOpen, // Pass WebSocket status
  initializeWebSocket, // Pass WebSocket initialization function
  loadingMessage,
  onNewChat,
  setLoadingMessage,
  ws, // Add ws as a prop
}) => {
  const endOfMessagesRef = useRef(null);
  const [isScrolledUp, setIsScrolledUp] = useState(false); // Initially false

  // Auto-scroll to the bottom when messages or loading state changes
  useEffect(() => {
    const scrollToEnd = () => {
      if (endOfMessagesRef.current) {
        const offset = isScrolledUp ? 50 : 0; // Adjust for button height if visible
        setTimeout(() => {
          endOfMessagesRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest",
          });
          if (offset) {
            window.scrollBy(0, offset);
          }
        }, 100); // Small delay to ensure DOM is fully rendered
      }
    };

    scrollToEnd();
    setIsScrolledUp(false); // Ensure button is not visible initially
  }, [messages, isLoading, isWebSocketOpen]); // Add isWebSocketOpen to dependencies

  // Handle scroll events to show/hide the "scroll to bottom" button
  useEffect(() => {
    const handleScroll = () => {
      const chatWindow = document.querySelector(".chat-window");
      if (
        chatWindow.scrollTop + chatWindow.clientHeight <
        chatWindow.scrollHeight - 10 // Adjusted to ensure it's not too sensitive
      ) {
        setIsScrolledUp(true);
      } else {
        setIsScrolledUp(false);
      }
    };

    const chatWindow = document.querySelector(".chat-window");
    chatWindow.addEventListener("scroll", handleScroll);

    return () => {
      chatWindow.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to the bottom of the chat
  const handleScrollToBottom = () => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  // Handle copying text to clipboard
  const handleCopy = (msg) => {
    if (msg) {
      navigator.clipboard.writeText(msg);
      toast("Copied to clipboard!");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div className="sidebar-title">
          {isNavClosed && (
            <>
            {/* Open sidenav bar */}
              <OverlayTrigger
                key="bottom"
                placement="bottom"
                overlay={
                  <Tooltip style={{ fontSize: "12px" }}>Open Sidebar</Tooltip>
                }
              >
                <div
                  className="sidenav-icon"
                  onClick={() => setIsNavClosed(false)}
                >
                  <TbLayoutSidebarRightCollapse />
                </div>
              </OverlayTrigger>

              {/* New Chat Button */}
              <OverlayTrigger
                key="bottom"
                placement="bottom"
                overlay={
                  <Tooltip style={{ fontSize: "12px" }}>New Chat</Tooltip>
                }
              >
                <div
                  className="sidenav-icon chat-icon ms-2 "
                  style={{marginBottom: "1px"}}
                  onClick={() => {
                    !isLoading && onNewChat();
                  }}
                >
                  <BiMessageSquareAdd size="20px"/>
                </div>
              </OverlayTrigger>
            </>
          )}

          <h5 className="chatbot-title ms-2">ProcXO</h5>
        </div>
        {/* WebSocket status button */}
        <div className="websocket-status me-4">
          {ws?.readyState === WebSocket.CONNECTING ? (
            <div
              className="d-flex align-items-center"
              title="Attempting to connect..."
            >
              <div
                className="spinner-grow text-danger spinner-grow-sm"
                role="status"
              ></div>
            </div>
          ) : isWebSocketOpen ? (
            <div
              className="d-flex align-items-center text-success"
              title="WebSocket is connected"
            >
              <FaCircle />
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <FaCircle
                className="text-danger"
                title="WebSocket is disconnected"
              />
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={initializeWebSocket}
              >
                Reconnect
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="chat-window">
        {messages?.length === 0 ? (
          <div className="empty-chat text-center container w-75">
            <h2 className="p-2" style={{ fontSize: "35px" }}>
              What do you want to know?
            </h2>
            {/* Render InputField below the welcome message when no messages are available */}
            <InputField onSendMessage={onSendMessage} isNewChat={true} />
          </div>
        ) : (
          <>
            {messages?.map((msg, index) => {
              const isUserMessage = msg.sender === "user";
              const previousMessage = messages[index - 1];
              const timeDifference =
                !isUserMessage &&
                previousMessage?.sender === "user" &&
                previousMessage?.time &&
                msg.time
                  ? Math.abs(
                      new Date(msg.time) - new Date(previousMessage.time)
                    ) / 1000
                  : null;

              return (
                <div
                  key={index}
                  className={`${isUserMessage ? "user" : "bot"} container w-75`}
                >
                  {/* Avatar */}
                  {isUserMessage ? (
                    <div className="d-flex justify-content-start align-items-start text-dark flex-column mt-4 border-top-1">
                      <h3 className="text-capitalize text-start">{msg.text}</h3>
                    </div>
                  ) : (
                    <div className="text-dark answer">
                      {msg.text !==
                        "Request has been cancelled , Please try again!" && (
                        <div className="d-flex mb-0 align-items-center mt-3">
                          <div className="avatar">
                            <img src={xoImg} alt=" Avatar" />
                          </div>
                          <h4>Answer</h4>
                        </div>
                      )}
                      <div className="row g-3">
                        <div className="col-12 mt-4">
                          <Markdown>{msg.text}</Markdown>
                          <div className="d-flex align-items-center justify-content-between mb-5 mt-2">
                            <div className="d-flex">
                              <OverlayTrigger
                                placement="bottom"
                                overlay={
                                  <Tooltip style={{ fontSize: "12px" }}>
                                    Copy
                                  </Tooltip>
                                }
                              >
                                <button
                                  className="bot-icon"
                                  data-toggle="tooltip"
                                  title="Copy"
                                  onClick={() => handleCopy(msg.text)}
                                >
                                  <IoCopyOutline />
                                </button>
                              </OverlayTrigger>
                              {msg.sender === "bot" && (
                                <OverlayTrigger
                                  placement="bottom"
                                  overlay={
                                    <Tooltip style={{ fontSize: "12px" }}>
                                      Regenerate
                                    </Tooltip>
                                  }
                                >
                                  <button
                                    className="bot-icon"
                                    onClick={() =>
                                      onRetryMessage(msg.text, index)
                                    }
                                  >
                                    <LuRefreshCcw />
                                  </button>
                                </OverlayTrigger>
                              )}
                            </div>
                            <div>
                              {timeDifference && (
                                <small className="text-secondary ms-2">
                                  {timeDifference.toFixed(1)} sec
                                </small>
                              )}
                            </div>
                          </div>
                          {/* separation between 2 responses */}
                          {messages?.length > 2 &&
                            index !== messages.length - 1 && <hr />}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Loading Spinner */}
            {isLoading && (
              <div className="text-start mt-3 container w-75">
                <div
                  className="spinner-border spinner-border-sm text-dark "
                  role="status"
                ></div>
                <p className="mt-2 text-dark">{loadingMessage}</p>
              </div>
            )}

            {/* Scroll to the bottom of the chat */}
            {isScrolledUp && (
              <button
                className="scroll-to-bottom"
                onClick={handleScrollToBottom}
              >
                <FaArrowDown />
              </button>
            )}
            <div ref={endOfMessagesRef} />
          </>
        )}
      </div>
    </>
  );
};

export default ChatWindow;
