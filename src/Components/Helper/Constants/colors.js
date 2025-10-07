// utils/setCSSVariables.js

export const setPlatformColors = () => {
  // SIDENAV
  // 235d64
  document.documentElement.style.setProperty("--bg-sidenav", " #f5f5f5");
  document.documentElement.style.setProperty("--bg-sidenav-dd", " #e9e9e9ec");
  document.documentElement.style.setProperty("--bg-sidenav-hover", " #38858e");
  document.documentElement.style.setProperty("--bg-sidenav-active", " #38858e");
  document.documentElement.style.setProperty("--color-sidenav", " #124147");
  document.documentElement.style.setProperty("--color-sidenav-hover", "white");

  // TOP NAVBAR
  document.documentElement.style.setProperty("--bg-menu", " #f5f5f5");
  document.documentElement.style.setProperty("--color-menu", "black");
  document.documentElement.style.setProperty("--bg-menu-icon", " #38858e");
  document.documentElement.style.setProperty("--color-menu-icon", "white");

  //NUMBER & HEADING & Icons
  document.documentElement.style.setProperty("--color-num", " #5cb0b9");
  document.documentElement.style.setProperty("--color-head", "black"); // can remove this
  document.documentElement.style.setProperty("--color-icon", " #38858e");

  //AG GRID
  document.documentElement.style.setProperty("--bg-ag", " #38858e");
  document.documentElement.style.setProperty("--color-ag", "white");

  //SCROLL
  document.documentElement.style.setProperty("--bg-scroll", " #acaebd");
  document.documentElement.style.setProperty("--bg-scroll-hover", " #9597a3");

  //BUTTON
  document.documentElement.style.setProperty("--bg-btn", " #72a5ad");
  document.documentElement.style.setProperty("--bg-btn-hover", " #49767c");
  document.documentElement.style.setProperty("--color-btn", "white");
  //BTN - DARK
  document.documentElement.style.setProperty("--bg-btn-dark", " #38858e");
  document.documentElement.style.setProperty("--bg-btn-dark-hover", " #22626a");
  document.documentElement.style.setProperty("--color-btn-dark", "white");

  //MAIN
  document.documentElement.style.setProperty("--color-main", " #38858e");
  document.documentElement.style.setProperty("--color-main-light", " #84b9c1");
  document.documentElement.style.setProperty("--color-main-light2", "rgba(132, 185, 193, 0.67)");

  // BACKGROUND COLORS - LIGHT
  document.documentElement.style.setProperty("--color-bg-red", "rgb(255, 167, 157)");
  document.documentElement.style.setProperty("--color-bg-yellow", "rgb(255, 220, 151)");
  document.documentElement.style.setProperty("--color-bg-green", "rgb(181, 255, 207)");
  // TEXT COLORS - DARK
  document.documentElement.style.setProperty("--color-red", "rgb(231, 75, 57)");
  document.documentElement.style.setProperty("--color-yellow", "rgb(243, 162, 0)");
  document.documentElement.style.setProperty("--color-green", "rgb(31, 184, 85)");

  // CHATBOT- PROCXO---------------------

  // CHAT WINDOW
  document.documentElement.style.setProperty("--bg-procxo-primary", " #4cccc6");
  document.documentElement.style.setProperty(
    "--bg-procxo-secondary",
    " #e6e9f0"
  );
  // chat window background
  document.documentElement.style.setProperty("--bg-color", "white");

  // chatbot sidebar background color
  document.documentElement.style.setProperty("--bg-sidebar-new", " #dadee6");
  document.documentElement.style.setProperty(
    "--bg-chat-btn-hover",
    "rgb(171, 221, 219)"
  );

  // user message and send button icon
  document.documentElement.style.setProperty("--color-msg", "white");

  //   Icons
  document.documentElement.style.setProperty("--bg-icon", " #6c757d");
  document.documentElement.style.setProperty("--bg-icon-hover", " #2c2c2c");

  // Buttons

  document.documentElement.style.setProperty("--bg-btn-newchat", " #e6e9f0");
  document.documentElement.style.setProperty(
    "--bg-btn-newchat-hover",
    " #c2c6cf"
  );

  // Input Field- rename
  document.documentElement.style.setProperty("--bg-rename", " #ffffff3f");

  // others
  document.documentElement.style.setProperty("--color-seperator", "black");
};
