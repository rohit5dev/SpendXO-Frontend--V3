import React, { useState } from "react";
import { useMsal } from "@azure/msal-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
// Image Icons
import microsoft from "../../../Images/microsoft.png";
import apple from "../../../Images/apple.png";
import google from "../../../Images/google.png";
import axios from "axios";
import Cookies from "universal-cookie";
import apiUrls from "../../../Config/apiUrls";
import loginBg from "../../../Images/loginBg.jpg";
import spendxoGreen from "../../../Images/spendxoGreen.png";

const Login = () => {
  const { instance } = useMsal(); // MSAL instance
  const navigate = useNavigate(); // Initialize useNavigate hook
  const cookies = new Cookies();
  const expirationTime = new Date();
  expirationTime.setMonth(expirationTime.getMonth() + 1);

  // State to manage loading spinner
  const [loading, setLoading] = useState(false);

  // Function to handle the login with Microsoft
  const handleMicrosoftLogin = async () => {
    setLoading(true); // Show spinner
    try {
      // Perform login with MSAL
      let loginResponse = await instance.loginPopup({
        scopes: ["openid", "profile", "User.Read"],
      });
      console.log("Login Response:", loginResponse);
      let accesstoken = loginResponse.accessToken;

      // Fetch user data from Microsoft Graph API
      const userResponse = await axios.get(
        "https://graph.microsoft.com/v1.0/me",
        {
          headers: {
            Authorization: `Bearer ${accesstoken}`,
          },
        }
      );
      console.log(userResponse.data);

      // Store user data in cookies
      cookies.set("spendXoUser", userResponse.data, {
        expires: expirationTime,
      });
      //add auth coockie
      cookies.set("spendXoIsAuth", true, { expires: expirationTime });

      // Fetch access rights from backend
      const tokenResponse = await axios.get(
        `${apiUrls.urlPrefix}/user-login?email=${userResponse.data.mail}&name=${userResponse.data.displayName}&job=${userResponse.data.jobTitle}`,
        { headers: { "Content-Type": "application/json" } }
      );

      let data = tokenResponse.data.result;
      cookies.set("spendXoToken", data.token, { expires: expirationTime });
      cookies.set("spendXoUserType", data.userType, {
        expires: expirationTime,
      });
      // Navigate based on access rights
      if (
        // data.isAccess &&
        // data.isAuth && // no needed
        data.token
      ) {
        navigate("/dashboard");
        // toast.success("Login Successful", {
        //   position: "top-center",
        // });
      } else {
        cookies.set("spendXoIsAuth", false, { expires: expirationTime });
        // toast.error("Sorry, you don't have access rights.", {
        //   position: "top-center",
        // });
      }
    } catch (error) {
      console.error("Login Error:", error);
      // toast.error("An error occurred during login.", {
      //   position: "top-center",
      // });
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  // Function for non-Microsoft logins (Google, Apple)
  const handleOtherLogin = (provider) => {
    console.log(`Sign in with ${provider} clicked.`);
    // Add specific logic for other providers if needed
  };

  return (
    <div
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center 30%",
        // background: "#f5f5f5",
        width: "100%",
        height: "100vh",
        display: "flex", // Use flexbox to center content
        justifyContent: "center", // Center horizontally
        alignItems: "center", // Center vertically
      }}
    >
      <div
        style={{
          width: "350px",
          height: "350px",
          background:
            "linear-gradient(to bottom,rgba(255, 255, 255, 0.8), rgba(12, 139, 164, 0.7))",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <img style={{ width: "120px", marginTop: "30px" }} src={spendxoGreen} />
        {/* <p style={{ fontSize: "11px" }}>
          Gain complete visibility into your spend & savings with SpendXo’s
          AI-powered solution
        </p> */}

        {/* Microsoft Login Button */}
        <button
          style={{
            border: "none",
            background: "white",
            width: "300px",
            boxShadow: "0px 0px 2px grey",
            textAlign: "center",
            paddingBottom: "5px",
            borderRadius: "5px",
            marginTop: "50px",
          }}
          onClick={handleMicrosoftLogin} // Microsoft login handler
        >
          {loading ? (
            <div class="spinner-border spinner-border-sm" role="status" />
          ) : (
            <div>
              {" "}
              <img style={{ width: "20px" }} src={microsoft} />
              <span style={{ marginLeft: "20px", fontSize: "13px" }}>
                Sign in with Microsoft
              </span>
            </div>
          )}
        </button>

        {/* Google Login Button */}
        <button
          style={{
            border: "none",
            background: "white",
            width: "300px",
            boxShadow: "0px 0px 2px grey",
            textAlign: "center",
            paddingBottom: "5px",
            borderRadius: "5px",
            marginTop: "20px",
          }}
          onClick={() => handleOtherLogin("Google")} // Google login handler
        >
          <img style={{ width: "20px" }} src={google} />
          <span style={{ marginLeft: "20px", fontSize: "13px" }}>
            Sign In With Google{" "}
          </span>
        </button>

        {/* Apple Login Button */}
        <button
          style={{
            border: "none",
            background: "white",
            width: "300px",
            boxShadow: "0px 0px 2px grey",
            textAlign: "center",
            paddingBottom: "5px",
            borderRadius: "5px",
            marginTop: "20px",
          }}
          onClick={() => handleOtherLogin("Apple")} // Apple login handler
        >
          <img style={{ width: "20px" }} src={apple} />
          <span style={{ marginLeft: "20px", fontSize: "13px" }}>
            Sign In With Apple{" "}
          </span>
        </button>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Login;
