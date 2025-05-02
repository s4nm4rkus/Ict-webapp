import React, { useEffect, useState } from "react";
import axios from "axios";
import StatusFilesUpdated from "../../../School/tags/Submitted/updated";
import StatusNoCurrentFile from "../../../School/tags/Empty/noCurrentFile";
import fileIcon from "../../../../../../assets/Icons/file-ic.png";
import "./schoolfilecard.css";

function SchoolFileCardMS({ title, description, apiEndpoint, userId }) {
  const [files, setFiles] = useState([]);
  const currentDate = new Date();
  const currentMonth = 5; // June (0-based index)
  const currentYear = currentDate.getFullYear();

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
    const d = new Date(file.timestamp);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  return (
    <div className="card">
      <div class="card-header">
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

export default SchoolFileCardMS;
