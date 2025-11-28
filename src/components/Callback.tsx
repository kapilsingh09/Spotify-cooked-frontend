// src/pages/Callback.jsx
import { useEffect } from "react";
import axios from "axios";
// import BACKEND_URL  from "../config/Backend";
import BACKEND_URL from '../config/Backend';
const Callback = () => {
  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (!code) {
      alert("Authorization failed");
      return;
    }

    // Send code to backend
    axios
      .get(`${BACKEND_URL}/auth/callback?code=${code}`)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);

        // Redirect to dashboard
        window.location.href = "/dashboard";
      })
      .catch((err) => {
        console.error(err);
        alert("Token exchange failed");
      });
  }, []);

  return <p style={{ textAlign: "center" }}>Processing login...</p>;
};

export default Callback;
