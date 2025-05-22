import React, { useState, useEffect } from "react";
import Navbar from "../../../components/Nav/navbar";
import CardFile from "../../../components/Cards/ICT Laboratory Schedule/fileCard";
import CardFile2 from "../../../components/Cards/Maintenance Schedule/fileCard";
import CardFile3 from "../../../components/Cards/Monthly Maintenance Report/fileCard";
import CardFile4 from "../../../components/Cards/ICT Laboratory Users Logbook/fileCard";

import "./homepage.css";
import axios from "axios";
// import fileIcon from "../../../assets/Icons/file-ic.png";
import userIcon from "../../../assets/Icons/user-ic.png";
import "font-awesome/css/font-awesome.min.css";

function Homepage() {
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

  return (
    <>
      <Navbar />
      {user ? (
        <div className="container">
          <div className="mainContainer">
            <div className="upperContainer">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex" }}>
                  <img
                    className="userIcon"
                    src={userIcon}
                    alt="Background-image"
                  />
                  <div className="leftHomeHeader">
                    <p>ICT Coordinator</p>
                    <p style={{ fontWeight: 600, fontSize: "24px" }}>
                      {user.firstName} {""} {user.lastName}
                    </p>
                    <p style={{ fontSize: "16px", marginTop: "-7px" }}>
                      <i
                        style={{ fontSize: "14px" }}
                        className="fa-solid fa-phone pe-1"
                      ></i>
                      +63{user.contactNumber}
                    </p>
                  </div>
                </div>

                <div className="rightHomeHeader">
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: "24px",
                    }}
                  >
                    <i
                      style={{
                        fontSize: "28px",
                        color: "#1e1e1e",
                        textTransform: "capitalize",
                      }}
                      className="fa-solid  fa-school pe-3"
                    ></i>
                    {user.schoolName}
                    <i
                      style={{
                        fontSize: "16px",
                        color: "#1B91E1",
                      }}
                      className="fa-solid fa-arrow-up-right-from-square ps-2"
                    ></i>
                  </p>
                </div>
              </div>
            </div>
            <hr style={{ borderColor: "#E7495C", borderWidth: 3 }}></hr>
            <div className="contentContainer">
              <CardFile />
              <CardFile2 />
              <CardFile3 />
              <CardFile4 />
            </div>
          </div>
        </div>
      ) : (
        <p style={{ fontSize: "22px", color: "#fff" }}></p>
      )}
    </>
  );
}

export default Homepage;
