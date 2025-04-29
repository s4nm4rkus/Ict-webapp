import React, { useState, useEffect } from "react";
import Navbar from "../../../../components/Nav/navbar";
import { useNavigate } from "react-router-dom";

import "./admindashboard.css";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";

function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("schools");
  const [schools, setSchools] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [itemsPerPage] = useState(15); // Items per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndSchools = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch logged-in user
        const { data: userData } = await axios.get(
          "http://localhost:5000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(userData.user);

        // Fetch all users (schools)
        const { data: schoolsData } = await axios.get(
          "http://localhost:5000/api/auth/all",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSchools(schoolsData.users); // assuming your API returns { users: [...] }
      } catch (error) {
        console.error(
          "Error fetching user or schools:",
          error.response?.data?.msg || error.message
        );
      }
    };

    fetchUserAndSchools();
  }, []);

  // Calculate the indices for slicing schools
  const indexOfLastSchool = currentPage * itemsPerPage;
  const indexOfFirstSchool = indexOfLastSchool - itemsPerPage;
  const currentSchools = schools.slice(indexOfFirstSchool, indexOfLastSchool);

  // Handle page changes
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total number of pages
  const totalPages = Math.ceil(schools.length / itemsPerPage);

  return (
    <>
      <Navbar />
      {user ? (
        <div className="container">
          <div className="mainContainer-admin">
            <div className="upperContainer">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div className="tabContainer">
                  <ul className="customTabs">
                    <li>
                      <div
                        className={`tabLink ${
                          activeTab === "schools" ? "activeTab" : ""
                        }`}
                        onClick={() => setActiveTab("schools")}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ")
                            setActiveTab("schools");
                        }}
                      >
                        <i className="fa-solid fa-school"></i>
                        <span>Schools</span>
                      </div>
                    </li>

                    <li>
                      <div
                        className={`tabLink ${
                          activeTab === "report" ? "activeTab" : ""
                        }`}
                        onClick={() => setActiveTab("report")}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ")
                            setActiveTab("report");
                        }}
                      >
                        <i className="fa-solid fa-chart-line"></i>
                        <span>Report Summary</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <hr
                style={{
                  borderColor: "#E7495C",
                  borderWidth: 3,
                  marginTop: -2,
                }}
              ></hr>
            </div>

            <div className="contentContainer">
              {activeTab === "schools" && (
                <div className="cardsGrid">
                  {currentSchools.length > 0 ? (
                    currentSchools.map((sch) => (
                      <div
                        key={sch._id}
                        className="schoolCard"
                        style={{
                          textAlign: "center",
                          alignContent: "center",
                        }}
                        // onClick={() => navigate(`/schoolData/${sch._id}`)}
                      >
                        <i
                          className="fa fa-school"
                          style={{
                            color: "#1B91E1",
                            fontSize: 24,
                            paddingTop: 22,
                            paddingBottom: 22,
                            paddingLeft: 19,
                            paddingRight: 19,
                            backgroundColor: "#f1f1f1",
                            borderRadius: 50,
                          }}
                        ></i>
                        <p className="schoolName">{sch.schoolName}</p>
                        {/* <p>
                          <strong>Admin:</strong> {sch.firstName} {sch.lastName}
                        </p>
                        <p>
                          <strong>Contact:</strong> {sch.contactNumber}
                        </p> */}
                        {/* Add any other fields you need */}
                      </div>
                    ))
                  ) : (
                    <p>No schools found.</p>
                  )}
                </div>
              )}

              {activeTab === "report" && (
                <div>
                  {/* Report Summary Content */}
                  <h2>Report Summary Tab Content</h2>
                  <p>Summary Reports and Charts...</p>
                </div>
              )}

              {activeTab === "schools" && (
                <nav>
                  <ul className="pagination">
                    <li
                      className={`page-item ${currentPage === 1 && "disabled"}`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, idx) => (
                      <li
                        key={idx}
                        className={`page-item ${
                          currentPage === idx + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(idx + 1)}
                        >
                          {idx + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages && "disabled"
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </div>
          </div>
        </div>
      ) : (
        <p style={{ fontSize: "22px", color: "#fff" }}></p>
      )}
    </>
  );
}

export default AdminDashboard;
