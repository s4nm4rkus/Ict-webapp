import React, { useState, useEffect } from "react";
import Navbar from "../../../../components/Nav/navbar";
import { useNavigate } from "react-router-dom";
import "./filelist.css";
import fileIcon from "../../../../assets/Icons/file-ic.png";
import StatusFilesUpdated from "../../../../components/Tags/Submitted/updated";
import StatusNoCurrentFile from "../../../../components/Tags/Empty/noCurrentFile";
import FileUploadModal from "../../../../components/Modals/Upload Files/ICT Lab Schedules/uploadFile";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function FileListLS() {
  const [files, setFiles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleFileUploaded = (newFile) => {
    setFiles((prevFiles) => [...prevFiles, newFile]); // Adds the new file to the list
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/files/ict-laboratory-schedule`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Ensure you're passing the token
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
        // alert("Failed to load files");
      }
    };

    fetchFiles();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const sortedFiles = files
    .slice()
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const currentFiles = sortedFiles.slice(indexOfFirstItem, indexOfLastItem);

  // Get the current month and year
  const currentDate = new Date();

  // Filter files that match the current month and year

  const totalPages = Math.ceil(files.length / itemsPerPage);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0 = Jan, …, 5 = June, …, 11 = Dec

  // Elementary/JHS submitted if any file.level === 'elementary/jhs' uploaded in June (month 5) of this year
  const jhsSubmitted = files.some((file) => {
    if (file.level !== "Elementary/JHS") return false;
    const d = new Date(file.timestamp);
    return d.getFullYear() === currentYear && d.getMonth() === 5;
  });

  // SHS submitted if any file.level === 'shs' in the current semester:
  //  - 1st Sem: June (5) → November (10)
  //  - 2nd Sem: December (11) → May (4)
  const shsSubmitted = files.some((file) => {
    if (file.level !== "Senior High School") return false;
    const d = new Date(file.timestamp);
    const y = d.getFullYear();
    const m = d.getMonth();

    if (currentMonth >= 5 && currentMonth <= 10) {
      // we’re in 1st Sem now
      return y === currentYear && m >= 5 && m <= 10;
    } else {
      // we’re in 2nd Sem now
      // if month is Dec (11) → May (4):
      //   Dec belongs to this year, Jan–May belong to this year
      return y === currentYear && (m >= 11 || m <= 4);
    }
  });
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
                    ICT Laboratory Schedule
                  </p>
                  <p style={{ fontSize: "16px", marginTop: "-7px" }}>
                    to be sent at the beginning of school year / semester
                  </p>
                </div>
              </div>

              <div className="rightHeader">
                <button
                  onClick={handleShowModal}
                  type="submit"
                  className="viewFileBtnContainer"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    width: "160px",
                    color: "white",
                    marginTop: -20,
                    marginBottom: 10,
                  }}
                >
                  <p style={{ fontWeight: "500" }} className="viewFileBtn ">
                    Upload file
                    <i
                      style={{ fontSize: "16px" }}
                      className="fas fa-upload ps-2"
                    ></i>
                  </p>
                </button>
                <FileUploadModal onFileUploaded={handleFileUploaded} />
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
                  marginRight: 10,
                  marginTop: -3,
                  marginBottom: 8,
                }}
              >
                Recent Uploads:
              </p>
              <p
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  marginRight: 10,
                  marginTop: -1,
                  marginBottom: 8,
                }}
              >
                Elementary/JHS
              </p>
              {jhsSubmitted ? (
                <StatusFilesUpdated />
              ) : (
                <StatusNoCurrentFile /> // Display StatusNoCurrentFile if no files are uploaded for this month
              )}

              <p
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  marginRight: 10,
                  marginLeft: 10,
                  marginTop: -1,
                  marginBottom: 8,
                }}
              >
                | Senior High School
              </p>
              {shsSubmitted ? (
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
                    Level
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
                    <td
                      className="date"
                      style={{ textAlign: "center", width: "90px" }}
                    >
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
                    <td className="level">{file.level}</td>
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
            <FileUploadModal show={showModal} handleClose={handleCloseModal} />
          </div>
        </div>
      </div>
    </>
  );
}

export default FileListLS;
