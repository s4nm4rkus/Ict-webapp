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
  const currentMonth = 5; // June (0-based index)
  const currentYear = currentDate.getFullYear();

  const handleViewFiles = () => {
    navigate("/filelistMS"); // Navigate to FileList page
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/files/maintenance-schedule",
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

  const filteredFiles = files.filter((file) => {
    const d = new Date(file.timestamp);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
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
                  Maintenance Schedule
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
                to be sent at the beginning of school year
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
