import React, { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import "./navbar.css";
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
    <div className="navContainer">
      <div className="navItems">
        <p className="logoNav"> LOGO </p>
        <div className="rightNav">
          {user ? (
            <>
              <p
                style={{ fontSize: "22px", color: "black", fontWeight: "400" }}
              >
                <i className="fa-solid fa-user pe-3"></i>
                {user.firstName} {""} {user.lastName}
              </p>
              <button
                onClick={handleLogout}
                className="logoutButton"
                style={{
                  height: "55px",
                  marginTop: "-12px",
                  paddingRight: "25px",
                  paddingLeft: "25px",
                  border: "none",
                  borderRadius: 8,
                }}
              >
                <p
                  style={{
                    fontSize: "22px",
                    fontWeight: "400",
                    padding: 0,
                    marginTop: "9px",
                    color: "#1b91e1",
                  }}
                >
                  Logout
                  <i className="fas fa-sign-out-alt ps-3"></i>
                </p>
              </button>
            </>
          ) : (
            <p style={{ fontSize: "22px", color: "#fff" }}></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
