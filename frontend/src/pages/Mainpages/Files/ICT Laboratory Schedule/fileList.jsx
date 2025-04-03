import React, { useState } from "react";
import Navbar from "../../../../components/Nav/navbar";
// import CardFile from "../../../../components/Cards/ICT Laboratory Schedule/fileCard";

import "./filelist.css";
// import axios from "axios";
import fileIcon from "../../../../assets/Icons/file-ic.png";
import StatusFilesUpdated from "../../../../components/Tags/Submitted/updated";
import FileUploadModal from "../../../../components/Modals/Upload Files/ICT Lab Schedules/uploadFile";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function FileListLS() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
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
                <FileUploadModal />
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
              <StatusFilesUpdated />
            </div>
            <table class="table table-hover">
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
                <tr>
                  <td className="date">03/19/2025 3:16 pm</td>
                  <td className="title">Sample Title</td>
                  <td className="description">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </td>
                  <td className="monthYear">March 2025</td>
                  <td className="filename">filename.docx</td>
                  <td
                    style={{
                      textAlign: "center",
                      justifyContent: "center",
                      alignContent: "center",
                    }}
                  >
                    <div class="dropdown-center">
                      <button
                        style={{
                          fontSize: 25,
                          padding: 0,
                          border: 0,
                        }}
                        class="btn dropdown-toggle"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      ></button>
                      <ul
                        style={{
                          marginTop: "-20px",
                          paddingTop: 20,
                          paddingBottom: 20,
                          paddingRight: 25,
                          paddingLeft: 25,
                          textAlign: "center",
                          justifyContent: "center",
                        }}
                        class="dropdown-menu "
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
              </tbody>
            </table>
            <FileUploadModal show={showModal} handleClose={handleCloseModal} />
          </div>
        </div>
      </div>
    </>
  );
}

export default FileListLS;
