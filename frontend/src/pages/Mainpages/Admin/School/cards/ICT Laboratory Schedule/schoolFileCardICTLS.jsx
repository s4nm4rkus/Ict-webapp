import React, { useEffect, useState } from "react";
import axios from "axios";
import StatusFilesUpdated from "../../../School/tags/Submitted/updated";
import StatusNoCurrentFile from "../../../School/tags/Empty/noCurrentFile";
import fileIcon from "../../../../../../assets/Icons/file-ic.png";
import "./schoolfilecard.css";
import { useNavigate } from "react-router-dom";

function SchoolFileCardICTLS({ title, description, apiEndpoint, userId }) {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const currentDate = new Date();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const token = localStorage.getItem("token");
        const { data } = await axios.get(`${apiEndpoint}/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFiles(data.files || []);
      } catch (error) {
        console.error(`Error fetching files for ${title}:`, error.message);
      }
    };

    if (userId) fetchFiles();
  });

  const filteredFiles = files.filter((file) => {
    const fileDate = new Date(file.timestamp);
    const fileMonth = fileDate.getMonth() + 1; // JS months are 0-based
    const fileYear = fileDate.getFullYear();

    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    // ✅ Condition 1: File is from June (6) of current year
    const isJuneCurrentYear = fileMonth === 6 && fileYear === currentYear;

    // ✅ Condition 2: File is from the same semester and year
    let isSameSemester = false;

    // Check if both file and current date are in 1st semester
    const isFileFirstSem = fileMonth >= 6 && fileMonth <= 10;
    const isNowFirstSem = currentMonth >= 6 && currentMonth <= 10;

    // Check if both file and current date are in 2nd semester
    const isFileSecondSem = fileMonth >= 11 || fileMonth <= 4;
    const isNowSecondSem = currentMonth >= 11 || currentMonth <= 4;

    if (fileYear === currentYear) {
      if (
        (isFileFirstSem && isNowFirstSem) ||
        (isFileSecondSem && isNowSecondSem)
      ) {
        isSameSemester = true;
      }
    }

    return isJuneCurrentYear || isSameSemester;
  });

  return (
    <div className="card">
      <div className="card-header">
        <img className="fileIcon" src={fileIcon} alt="Background-image" />
        <span style={{ fontSize: "18px" }}>Files</span>
      </div>
      <div className="card-body">
        <div style={{ display: "block" }}>
          <div style={{ display: "flex" }}>
            <h5 className="card-title">{title}</h5>
            <div style={{ marginLeft: "10px" }}>
              {filteredFiles.length > 0 ? (
                <StatusFilesUpdated />
              ) : (
                <StatusNoCurrentFile />
              )}
            </div>
          </div>
          <p className="card-text">{description}</p>

          <button
            type="button"
            className="viewFileBtnContainer"
            style={{
              backgroundColor: "transparent",
              border: "none",
              width: "160px",
              color: "white",
            }}
            onClick={() =>
              navigate("/school-file-list-ls", {
                state: { selectedUser: userId },
              })
            }
          >
            <p className="viewFileBtn">
              View Files
              <i
                className="fa-solid fa-arrow-right-long ps-2"
                style={{ fontSize: "16px" }}
              ></i>
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SchoolFileCardICTLS;
