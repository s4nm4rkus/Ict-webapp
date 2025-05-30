import React, { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import "./adminnavbar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token); // Debugging: Check if token exists

        const { data } = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Fetched User:", data); // Debugging: Check API response

        setUser(data.user); // Ensure you're setting 'user', not just 'data'
      } catch (error) {
        console.error(
          "Error fetching user:",
          error.response?.data?.msg || error.message
        );
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/logout`,
        {},
        { withCredentials: true }
      );

      console.log("Logout response:", response.data);

      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error(
        "Logout failed:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="navContainer" style={{ position: "fixed", zIndex: 1 }}>
      <div className="navItems">
        <p className="logoNav"> ICT Unit </p>
        <p className="newNavItems"> Home </p>
        <p className="newNavItems"> Forms </p>
        <p className="newNavItems"> Schools </p>
        <button
          onClick={handleLogout}
          className="logoutButton"
          style={{
            border: "none",
            borderRadius: 8,
            paddingTop: 8,
            paddingBottom: 8,
            paddingRight: 13,
            paddingLeft: 13,
            marginBottom: 20,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "20px",
              fontWeight: "400",
              color: "#222831",
              paddingRight: "25px",
              paddingLeft: "25px",
              textTransform: "uppercase",
            }}
          >
            Logout
            <i className="fas fa-sign-out-alt ps-3"></i>
          </p>
        </button>
        {/* <div className="rightNav">
          {user ? (
            <>
              <p
                style={{ fontSize: "22px", color: "black", fontWeight: "400" }}
              >
                <i className="fa-solid fa-user pe-3"></i>
                {user.firstName} {""} {user.lastName}
              </p>
            </>
          ) : (
            <p style={{ fontSize: "22px", color: "#fff" }}></p>
          )}
        </div> */}
      </div>
    </div>
  );
}

export default Navbar;
