import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../../components/Nav/navbar";
import axios from "axios";
import userIcon from "../../../../assets/Icons/user-ic.png";
import SchoolFileCardICTLS from "./cards/ICT Laboratory Schedule/schoolFileCardICTLS";
import SchoolFileCardMS from "./cards/Maintenance Schedule/schoolFileCardMS";
import SchoolFileCardLULB from "./cards/ICT Laboratory Users Log Book/schoolFileCardICTLULB";
import SchoolFileCardMMR from "./cards/Monthly Maintenance Report/schoolFileCardICTMMR";

import "font-awesome/css/font-awesome.min.css";
import "./schooldata.css";

function SchoolData() {
  const { userId } = useParams();
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const passedUser = location.state?.selectedUser;

  const handleBack = () => {
    navigate(-1);
  };

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
                    <button
                      style={{
                        border: 0,
                        backgroundColor: "transparent",

                        marginRight: 5,
                      }}
                      onClick={handleBack}
                    >
                      <i className="fas fa-arrow-left fs-6 editIcon"></i>
                    </button>
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
              <div className="filesCardsGrid">
                <SchoolFileCardICTLS
                  title="ICT Laboratory Schedule"
                  description="to be sent at the beginning of school year/semester"
                  apiEndpoint="http://localhost:5000/api/files/ict-laboratory-schedule"
                  userId={selectedUser?._id}
                />

                <SchoolFileCardMS
                  title="Maintenance Schedule"
                  description="to be sent at the beginning of school year"
                  apiEndpoint="http://localhost:5000/api/files/maintenance-schedule"
                  userId={selectedUser?._id}
                />
                <SchoolFileCardLULB
                  title="ICT Laboratory Users Log Book"
                  description="to be sent monthly"
                  apiEndpoint="http://localhost:5000/api/files/ict-laboratory-users-log-book"
                  userId={selectedUser?._id}
                />
                <SchoolFileCardMMR
                  title="Monthly Maintenance Report"
                  description="to be sent monthly"
                  apiEndpoint="http://localhost:5000/api/files/monthly-maintenance-report"
                  userId={selectedUser?._id}
                />
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
