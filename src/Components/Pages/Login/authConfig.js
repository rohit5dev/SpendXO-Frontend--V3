import { PublicClientApplication } from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "6a04712e-132b-43b8-9f4a-ce5605484709", // Replace with your Application (client) ID
    authority:
      "https://login.microsoftonline.com/55e0a09f-7836-4d37-b386-b5605b46a125", // Replace with your Directory (tenant) ID
    redirectUri: "https://spendxo.com",
    // redirectUri: "http://localhost:3000",
  },
  cache: {
    cacheLocation: "localStorage", // Options: 'localStorage' or 'sessionStorage'
    storeAuthStateInCookie: true, // Set to true if using IE11 or Edge
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
