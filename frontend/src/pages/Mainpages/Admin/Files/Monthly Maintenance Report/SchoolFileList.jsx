import React, { useState, useEffect } from "react";
import Navbar from "../../../../../components/Nav/navbar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./schoolfilelist.css";
import fileIcon from "../../../../../assets/Icons/file-ic.png";
import StatusFilesUpdated from "./tags/Submitted/updated";
import StatusNoCurrentFile from "./tags/Empty/noCurrentFileTag";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function SchoolFileListMMR() {
  const [files, setFiles] = useState([]);
  const location = useLocation();
  const userId = location.state?.selectedUser;
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchFiles = async () => {
      if (!userId) return;
      try {
        const res = await fetch(
          `http://localhost:5000/api/files/monthly-maintenance-report/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error(`Error: ${res.statusText}`);
        }

        const data = await res.json();
        setFiles(data.files);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [userId]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const sortedFiles = files
    .slice()
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const currentFiles = sortedFiles.slice(indexOfFirstItem, indexOfLastItem);

  // Get the current month and year
  const currentDate = new Date();
  const currentMonthYear = `${
    currentDate.getMonth() + 1
  }-${currentDate.getFullYear()}`;

  // Filter files that match the current month and year
  const filteredFiles = files.filter((file) => {
    const fileDate = new Date(file.timestamp);
    const fileMonthYear = `${
      fileDate.getMonth() + 1
    }-${fileDate.getFullYear()}`;
    return fileMonthYear === currentMonthYear;
  });

  const totalPages = Math.ceil(files.length / itemsPerPage);

  return (
    <>
      <Navbar />
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
                  src={fileIcon}
                  alt="Background-image"
                />
                <div className="leftHeader">
                  <p style={{ fontWeight: 600, fontSize: "24px" }}>
                    Monthly Maintenance Report
                  </p>
                  <p style={{ fontSize: "16px", marginTop: "-7px" }}>
                    to be sent monthly
                  </p>
                </div>
              </div>
            </div>
          </div>
          <hr style={{ borderColor: "#E7495C", borderWidth: 3 }}></hr>
          <div className="contentContainer">
            <div style={{ display: "flex" }}>
              <p
                style={{
                  fontSize: 20,
                  fontWeight: 500,
                  marginRight: 5,
                  marginTop: -3,
                  marginBottom: 8,
                }}
              >
                Recent Uploads
              </p>
              {filteredFiles.length > 0 ? (
                <StatusFilesUpdated />
              ) : (
                <StatusNoCurrentFile /> // Display StatusNoCurrentFile if no files are uploaded for this month
              )}
            </div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th
                    style={{
                      backgroundColor: "#1B91E1",
                      color: "#FFF",
                      fontWeight: 600,
                      borderTopLeftRadius: "8px",
                      textAlign: "center",
                    }}
                    scope="col"
                  >
                    Date
                  </th>
                  <th
                    className="tableHeader"
                    style={{
                      backgroundColor: "#1B91E1",
                      color: "#FFF",
                      fontWeight: 600,
                    }}
                    scope="col"
                  >
                    Title
                  </th>
                  <th
                    style={{
                      backgroundColor: "#1B91E1",
                      color: "#FFF",
                      fontWeight: 600,
                    }}
                    scope="col"
                  >
                    Description
                  </th>
                  <th
                    style={{
                      backgroundColor: "#1B91E1",
                      color: "#FFF",
                      fontWeight: 600,
                    }}
                    scope="col"
                  >
                    Month/Year
                  </th>
                  <th
                    style={{
                      backgroundColor: "#1B91E1",
                      color: "#FFF",
                      fontWeight: 600,
                    }}
                    scope="col"
                  >
                    File Name
                  </th>
                  <th
                    style={{
                      backgroundColor: "#1B91E1",
                      color: "#FFF",
                      borderTopRightRadius: "8px",
                      textAlign: "center",
                      fontWeight: 600,
                    }}
                    scope="col"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentFiles.map((file, index) => (
                  <tr key={index}>
                    <td className="date" style={{ textAlign: "center" }}>
                      {new Date(file.timestamp).toLocaleString()}
                    </td>
                    <td className="title">{file.title}</td>
                    <td className="description">{file.description}</td>
                    <td className="monthYear">
                      {new Date(file.timestamp).toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="filename">
                      <a
                        href={file.fileUrl}
                        download={file.originalFileName}
                        style={{ color: "#1B91E1" }}
                      >
                        {file.originalFileName}{" "}
                      </a>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      <div className="dropdown-center">
                        <button
                          style={{
                            fontSize: 25,
                            padding: 0,
                            border: 0,
                          }}
                          className="btn dropdown-toggle"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        ></button>
                        <ul
                          style={{
                            marginTop: "-20px",
                            paddingTop: 15,
                            paddingBottom: 15,
                            paddingRight: 30,
                            paddingLeft: 30,
                            textAlign: "center",
                            justifyContent: "center",
                          }}
                          className="dropdown-menu"
                        >
                          <div
                            style={{
                              display: "flex",
                              textAlign: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            <li>
                              <i className="fas fa-edit fs-5 editIcon"></i>
                            </li>
                            <li>
                              <i className="fas fa-trash fs-5 deleteIcon"></i>
                            </li>
                          </div>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 30,
              }}
            >
              <button
                style={{
                  border: 0,
                  backgroundColor: "transparent",
                  marginTop: -20,
                }}
                onClick={handleBack}
              >
                <i className="fas fa-arrow-left fs-5 editIcon"></i>
              </button>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SchoolFileListMMR;
