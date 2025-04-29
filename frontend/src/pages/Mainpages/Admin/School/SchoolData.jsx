import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../../../../components/Nav/navbar";
import axios from "axios";
import userIcon from "../../../../assets/Icons/user-ic.png";
import "font-awesome/css/font-awesome.min.css";
import "./schooldata.css";

function SchoolData() {
  const { userId } = useParams();
  const [selectedUser, setSelectedUser] = useState(null);
  const location = useLocation();
  const passedUser = location.state?.selectedUser;

  useEffect(() => {
    const fetchSelectedUser = async () => {
      try {
        const token = localStorage.getItem("token");

        // If passedUser is available from location state, use it
        if (passedUser) {
          setSelectedUser(passedUser);
          return;
        }

        // Otherwise, fetch user by userId from the URL
        if (userId) {
          const { data } = await axios.get(
            `http://localhost:5000/api/auth/user/${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setSelectedUser(data.user);
        }
      } catch (error) {
        console.error("Error fetching selected user:", error.message);
      }
    };

    fetchSelectedUser();
  }, [userId, passedUser]);

  return (
    <>
      <Navbar />
      {selectedUser ? (
        <div className="container">
          <div className="mainContainer">
            <div className="upperContainer">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="rightHomeHeader">
                  <p
                    style={{
                      fontWeight: 600,
                      fontSize: "24px",
                      marginBottom: 0,
                    }}
                  >
                    <i
                      className="fa-solid fa-school pe-3"
                      style={{ fontSize: "28px", color: "#1e1e1e" }}
                    ></i>
                    {selectedUser?.schoolName}
                    <i
                      className="fa-solid fa-arrow-up-right-from-square ps-2"
                      style={{ fontSize: "16px", color: "#1B91E1" }}
                    ></i>
                  </p>
                </div>
              </div>
            </div>

            <hr style={{ borderColor: "#E7495C", borderWidth: 3 }} />

            <div className="contentContainer">
              <div style={{ display: "flex" }}>
                <img className="userIcon" src={userIcon} alt="User Icon" />
                <div className="schoolDataHeader">
                  <p style={{ fontWeight: 600, fontSize: "20px" }}>
                    {selectedUser.firstName} {selectedUser.lastName}{" "}
                    <span style={{ fontWeight: 300 }}>| ICT Coordinator </span>
                  </p>
                  <p style={{ fontSize: "16px", marginTop: "-5px" }}>
                    <i
                      className="fa-solid fa-phone pe-1"
                      style={{ fontSize: "14px" }}
                    ></i>
                    +63{selectedUser.contactNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p style={{ fontSize: "22px", color: "#fff" }}>Loading...</p>
      )}
    </>
  );
}

export default SchoolData;
