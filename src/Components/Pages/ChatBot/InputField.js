import React, { useState } from "react";
import "./css/ChatBot.css";
import "./css/InputField.css";
import { suggestionsList } from "./Data/BotData";
import Suggestions from "./Suggestions"; // Import the new component
//ICONS
import { RiAttachment2 } from "react-icons/ri";
import { IoSendOutline } from "react-icons/io5";
import { FaStop } from "react-icons/fa";

const InputField = ({
  onSendMessage,
  onCancelRequest,
  isNewChat,
  isLoading,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue("");
    setSuggestions([]); // Clear suggestions on submit
    // Reset rows to 1 when input is cleared
    const textarea = e.target.querySelector("textarea");
    if (textarea) {
      textarea.rows = 1;
    }
  };

  const handleFileChange = (e) => {
    setSelectedFiles([...e.target.files]);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInput = (e) => {
    const textarea = e.target;
    const value = textarea.value;
    setInputValue(value);
    textarea.rows = 1; // Reset rows to 1 to calculate the correct height
    const rows = Math.min(5, Math.ceil(textarea.scrollHeight / 24)); // Adjust based on content
    textarea.rows = rows;

    // Update suggestions based on input value
    if (value) {
      const filteredSuggestions = suggestionsList
        .filter((suggestion) =>
          value
            .toLowerCase()
            .split(" ")
            .every((word) => suggestion.toLowerCase().includes(word))
        )
        .slice(0, 5); // Limit to 4 suggestions
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle suggestions option click
  const handleSuggestionClick = (suggestion) => {
    setInputValue(suggestion);
    setSuggestions([]);
    // onSendMessage(suggestion);
    // setInputValue("");
    // setSuggestions([]);
    // // Reset rows to 1 when input is cleared
    const textarea = document.querySelector("textarea");
    if (textarea) {
      textarea.rows = 1;
    }
  };

  // on suggestion click set to the input field value
  // Handle suggestions option click
  // const handleSuggestionClick = (suggestion) => {
  //   setInputValue(suggestion);
  //   setSuggestions([]);
  // };

  return (
    <div>
      {!isNewChat && inputValue && suggestions.length > 0 && (
        <form className="input-field card ms-2 me-2 ps-4 pb-0 card-rounded-top ">
          <Suggestions
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
          />
        </form>
      )}
      <form
        className={`input-field card m-2 p-4 pb-2 ${
          suggestions.length > 0
            ? inputValue
              ? isNewChat
                ? "card-rounded-top"
                : "card-rounded-bottom"
              : "rounded-5"
            : "rounded-5"
        }`}
        onSubmit={handleSubmit}
      >
        {/* Render Suggestions above the input box */}

        <div>
          <textarea
            className="input-box d-flex w-100"
            placeholder="Ask Anything..."
            value={inputValue}
            rows={1}
            onChange={handleInput}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="d-flex justify-content-end mt-2">
          <label className="attach btn p-1 ms-2 rounded-circle">
            <RiAttachment2 size={16} />
            <input
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </label>

          <button
            type="button"
            className="p-1 ms-2 rounded-5"
            // onClick={isLoading ? onCancelRequest : handleSubmit}
            onClick={handleSubmit}
          >
            {/* {isLoading ? <FaStop size={12} /> : <IoSendOutline size={16} />} */}
            <IoSendOutline size={16} />
          </button>
        </div>
        {/* Render Suggestions below the input box */}
      </form>

      {isNewChat && inputValue && suggestions.length > 0 && (
        <form className="input-field card ms-2 me-2 ps-4 pb-0 card-rounded-bottom">
          <Suggestions
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
          />
        </form>
      )}
    </div>
  );
};

export default InputField;
