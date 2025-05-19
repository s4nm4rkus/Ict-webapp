import React, { useState, useEffect } from "react";
import "font-awesome/css/font-awesome.min.css";
import "./file.card.css";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import fileIcon from "../../../assets/Icons/file-ic.png";
import StatusNoCurrentFile from "../../Tags/Empty/noCurrentFile";
import StatusFilesUpdated from "../../../components/Tags/Submitted/updated";

function CardFile() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const currentDate = new Date();
  const currentMonthYear = `${
    currentDate.getMonth() + 1
  }-${currentDate.getFullYear()}`;

  const handleViewFiles = () => {
    navigate("/filelistLUL"); // Navigate to FileList page
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/files/ict-laboratory-users-logbook`,
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
  }, []);

  // Filter files based on the current month and year
  const filteredFiles = files.filter((file) => {
    const fileDate = new Date(file.timestamp);
    const fileMonthYear = `${
      fileDate.getMonth() + 1
    }-${fileDate.getFullYear()}`;
    return fileMonthYear === currentMonthYear;
  });

  return (
    <div className="cardContainer">
      <div className="cardContent">
        <div
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignContent: "center",
              alignSelf: "center",
            }}
          >
            <img className="fileIcon" src={fileIcon} alt="Background-image" />
            <div className="leftSide  ps-3">
              <div
                style={{
                  display: "flex",
                  alignContent: "center",
                }}
              >
                <p
                  style={{
                    fontWeight: 600,
                    fontSize: "24px",
                    padding: 0,
                    margin: 0,
                  }}
                >
                  ICT Laboratory Users Logbook
                </p>
                <div style={{ marginLeft: "5px" }}>
                  {filteredFiles.length > 0 ? (
                    <StatusFilesUpdated />
                  ) : (
                    <StatusNoCurrentFile />
                  )}
                </div>
              </div>
              <p style={{ fontSize: "14px", padding: 0, margin: 0 }}>
                to be sent monthly
              </p>
            </div>
          </div>

          <div className="rightSide">
            <button
              onClick={handleViewFiles}
              type="submit"
              className="viewFileBtnContainer"
              style={{
                backgroundColor: "transparent",
                border: "none",
                width: "160px",
                color: "white",
              }}
            >
              <p className="viewFileBtn ">
                View Files
                <i
                  style={{ fontSize: "16px" }}
                  className="fa-solid fa-arrow-right-long ps-2"
                ></i>
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardFile;
