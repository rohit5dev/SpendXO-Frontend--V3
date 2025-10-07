import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import InputField from "./InputField";
import "./css/ChatBot.css";

const ChatBot = () => {
  const [chats, setChats] = useState(() => {
    const savedChats = localStorage.getItem("chats");
    return savedChats
      ? JSON.parse(savedChats).filter((chat) => chat.messages.length > 0)
      : [];
  });
  const [currentChatIndex, setCurrentChatIndex] = useState(null);
  const currentChatIndexRef = useRef(null); // Add a ref to track currentChatIndex
  const [isNavClosed, setIsNavClosed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cancelTokenSource, setCancelTokenSource] = useState(null);
  const ws = useRef(null);
  const messagesEndRef = useRef(null);
  const [input, setInput] = useState("");
  const [lastStatusId, setLastStatusId] = useState(null);
  const [isWebSocketOpen, setIsWebSocketOpen] = useState(false); // Track WebSocket status
  const [loadingMessage, setLoadingMessage] = useState(null); // Track loading message
  const [msgStartTime, setMsgStartTime] = useState(null); // Track loading message
  const [globalChatId, setGlobalChatId] = useState(""); // Track global chat ID

  // Modify the initializeWebSocket function to dynamically set the new_chat parameter
  const initializeWebSocket = () => {
    const currentChat = chats[currentChatIndexRef.current];
    const newChat = !currentChat || currentChat.messages.length === 0;
    const chatId = currentChat?.chatId || "";

    console.log("Initializing WebSocket with chatId:", chatId);

    ws.current = new WebSocket(
      `${process.env.REACT_APP_CHATBOT_CHAT_URL_WS}/chat?chat_id=${chatId}&new_chat=${newChat}`
    );

    ws.current.onopen = () => {
      console.log("✅ WebSocket connected");
      setIsWebSocketOpen(true); // Set status to open
    };

    ws.current.onerror = (err) => {
      console.error("❌ WebSocket error", err);
      setIsWebSocketOpen(false); // Set status to closed
      setTimeout(initializeWebSocket, 3000); // Attempt to reconnect
    };

    ws.current.onclose = () => {
      console.log("🔌 WebSocket disconnected");
      setIsWebSocketOpen(false); // Set status to closed
      setTimeout(initializeWebSocket, 3000); // Attempt to reconnect
    };

    ws.current.onmessage = handleReceivedMessage;
  };

  // Initialize WebSocket connection on component mount
  useEffect(() => {
    initializeWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  // // TRIM HEADING FROM RESPONSE FOR TITLE
  // const trimMarkdownHeading = (markdown) => {
  //   return markdown.replace(/^#+\s*/, ""); // Removes '#' and any leading spaces
  // };

  // Handle incoming WebSocket messages
  const handleReceivedMessage = (event) => {
    try {
      console.log("Received message:", event.data);
      const data = JSON.parse(event.data);

      if (data.type === "agent_state") {
        const { id, state } = data.content;
        setLastStatusId(id);
        state === "SQL query ran successfully..."
          ? setLoadingMessage(null)
          : setLoadingMessage(state); // Set loading message

        console.log("check one:", state);
      }

      if (data.type === "chat_message") {
        setIsLoading(false); // Reset loading state
        const { date_created, date_last_modified } = data;
        setLastStatusId(null);

        const { id, message } = data.content;
        setLastStatusId(id);

        const chatTitle = data.title;

        // console.log("check two:", message);

        // Ensure the response is stored in the currently active chat
        if (currentChatIndexRef.current !== null) {
          setChats((prevChats) => {
            const updatedChats = [...prevChats];
            const currentChat = updatedChats[currentChatIndexRef.current];

            if (!currentChat) {
              console.warn("No valid chat found for currentChatIndexRef.");
              return prevChats;
            }

            const currentMessages = currentChat.messages || []; // Ensure messages is an array

            // Avoid adding duplicate messages
            if (
              currentMessages.length === 0 ||
              currentMessages[currentMessages.length - 1].text !==
                message.content
            ) {
              currentMessages.push({
                sender: "bot",
                text: message.content,
                time: new Date().toISOString(),
              });

              // Update the chat title with the first bot message if it's still "New Chat"
              if (currentChat.title === "New Chat") {
                console.log("\n TESTING FOR THE CHAT TITLE- ", chatTitle);

                // Update the Chat Title
                currentChat.title = chatTitle;
              }
            }

            // Always update chatId if a new one comes from the server
            updatedChats[currentChatIndexRef.current] = {
              ...currentChat,
              chatId: id,
              creationDate: date_created,
              lastModifiedDate: date_last_modified,
              messages: currentMessages,
            };

            // Also store chatId in globalChatId state
            setGlobalChatId(id);

            return updatedChats;
          });
        } else {
          console.warn("No valid currentChatIndexRef to update messages.");
        }
      }
    } catch (err) {
      console.error("❌ Failed to parse message", err);
    }
  };

  // Load chats from localStorage on initial render
  useEffect(() => {
    const savedChats = localStorage.getItem("chats");
    const initialChats = savedChats ? JSON.parse(savedChats) : [];
    const newChat = {
      title: "New Chat",
      messages: [],
      chatId: "",
      creationDate: "",
      lastModifiedDate: "",
    };
    const updatedChats = [...initialChats, newChat];
    setChats(updatedChats);
    const newIndex = updatedChats.length - 1;
    setCurrentChatIndex(newIndex);
    currentChatIndexRef.current = newIndex; // Update the ref
  }, []);

  // Save chats to localStorage when they change
  useEffect(() => {
    if (chats) {
      localStorage.setItem(
        "chats",
        JSON.stringify(chats.filter((chat) => chat.messages.length > 0))
      );
    }
  }, [chats]);

  // Create New Chat
  const handleNewChat = () => {
    console.log("Creating a new chat...");
    if (chats && chats[chats.length - 1].messages.length < 1) return;

    // New chat should not contain any old chatId, treat as first query
    const newChat = {
      title: "New Chat",
      messages: [],
      chatId: "", // Ensure chatId is empty
      creationDate: "",
      lastModifiedDate: "",
    };

    setGlobalChatId(""); // Reset globalChatId for new chat

    setChats((prevChats) => {
      const updatedChats = [...prevChats, newChat];
      const newIndex = updatedChats.length - 1;
      setCurrentChatIndex(newIndex);
      currentChatIndexRef.current = newIndex; // Update the ref
      return updatedChats;
    });

    // Hit fresh new API/WebSocket for the new chat
    setTimeout(() => {
      initializeWebSocket();
    }, 0);
  };

  // Update handleSelectChat to establish a new WebSocket connection
  const handleSelectChat = (index) => {
    setCurrentChatIndex(index);
    currentChatIndexRef.current = index; // Update the ref

    // Reset WebSocket status before reinitializing
    setIsWebSocketOpen(false);

    // Reinitialize WebSocket with the new chat ID
    initializeWebSocket();
  };

  // Ensure ref is updated when a chat is deleted
  const handleDeleteChat = (index) => {
    setChats((prevChats) => {
      const updatedChats = prevChats.filter((_, i) => i !== index);
      if (currentChatIndex === index) {
        setCurrentChatIndex(null);
        currentChatIndexRef.current = null; // Reset the ref
      } else if (currentChatIndex > index) {
        const newIndex = currentChatIndex - 1;
        setCurrentChatIndex(newIndex);
        currentChatIndexRef.current = newIndex; // Update the ref
      }
      return updatedChats;
    });
  };

  const handleRenameChat = (index, newTitle) => {
    setChats((prevChats) => {
      const updatedChats = [...prevChats];
      updatedChats[index].title = newTitle || updatedChats[index].title;
      return updatedChats;
    });
  };

  const handleMessage = async (
    message,
    isRetry = false,
    messageIndex = null
  ) => {
    if (currentChatIndex === null || !ws.current) return;
    try {
      const userQuestion = isRetry
        ? chats[currentChatIndex].messages[messageIndex - 1].text
        : message;

      // Add user message to chat only if it's not already the last message
      if (!isRetry) {
        setChats((prevChats) => {
          const updatedChats = [...prevChats];
          const currentMessages = updatedChats[currentChatIndex].messages;

          if (
            currentMessages.length === 0 ||
            currentMessages[currentMessages.length - 1].text !== message
          ) {
            currentMessages.push({
              sender: "user",
              text: message,
              time: new Date().toISOString(),
            });
          }

          return updatedChats;
        });
      } else {
        // For retry, remove messages after the retried one
        setChats((prevChats) => {
          const updatedChats = [...prevChats];
          updatedChats[currentChatIndex].messages = updatedChats[
            currentChatIndex
          ].messages.slice(0, messageIndex);
          return updatedChats;
        });
      }

      // Send message via WebSocket
      if (ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(
          JSON.stringify({
            type: "user_prompt",
            content: {
              message: userQuestion,
              chat_id: chats[currentChatIndex]?.chatId || "",
            },
          })
        );

        setIsLoading(true); // Set loading state
      } else {
        throw new Error("WebSocket connection is not open");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSendMessage = (message) => handleMessage(message);
  const handleRetryMessage = (message, messageIndex) =>
    handleMessage(message, true, messageIndex);

  const handleCancelRequest = () => {
    if (cancelTokenSource) {
      cancelTokenSource.cancel("Request canceled by user.");
    }
    // For WebSocket, you might need to send a cancel message
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(
        JSON.stringify({
          type: "cancel_request",
          content: { chat_id: chats[currentChatIndex]?.chatId || "" },
        })
      );
    }
  };

  return (
    <div className="chatbot-card">
      <div className="chatbot-container">
        {/* Sidebar and Chat Section */}
        {!isNavClosed && (
          <Sidebar
            chats={chats}
            onNewChat={handleNewChat}
            onSelectChat={handleSelectChat}
            onDeleteChat={handleDeleteChat}
            onRenameChat={handleRenameChat}
            currentChatIndex={currentChatIndex}
            isLoading={isLoading}
            isNavClosed={isNavClosed}
            setIsNavClosed={setIsNavClosed}
          />
        )}

        {currentChatIndex !== null ? (
          <div className="chat-section">
            <ChatWindow
              onSendMessage={handleSendMessage}
              onRetryMessage={handleRetryMessage}
              messages={chats[currentChatIndex].messages}
              isNavClosed={isNavClosed}
              setIsNavClosed={setIsNavClosed}
              isLoading={isLoading}
              currentChatIndex={currentChatIndex}
              isWebSocketOpen={isWebSocketOpen} // Pass WebSocket status
              initializeWebSocket={initializeWebSocket} // Pass WebSocket initialization function
              onNewChat={handleNewChat}
              loadingMessage={loadingMessage} // Pass loading message
              ws={ws.current} // Pass ws reference
              globalChatId={globalChatId} // Pass global chat ID
            />
            {chats[currentChatIndex].messages.length !== 0 && (
              <div className="container w-75">
                <InputField
                  onSendMessage={handleSendMessage}
                  onCancelRequest={handleCancelRequest}
                  isNewChat={false}
                  isLoading={isLoading}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="chat-window text-center empty-chat">
            <div className="spinner-grow" role="status" />
            <InputField
              onSendMessage={handleSendMessage}
              onCancelRequest={handleCancelRequest}
              isNewChat={true}
              isLoading={isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBot;
