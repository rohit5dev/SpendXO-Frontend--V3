import React from "react";

const Suggestions = ({ suggestions, onSuggestionClick }) => {
  return (
    <ul
      className="suggestions-list"
      style={{ listStyleType: "none", paddingLeft: 0 }}
    >
      {suggestions.map((suggestion, index) => (
        <li
          key={index}
          onClick={() => onSuggestionClick(suggestion)}
          className="suggestions-item"
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
};

export default Suggestions;