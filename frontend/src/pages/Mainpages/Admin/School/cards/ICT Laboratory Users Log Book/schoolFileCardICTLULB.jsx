import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import StatusFilesUpdated from "../../tags/Submitted/updated";
import StatusNoCurrentFile from "../../tags/Empty/noCurrentFile";
import fileIcon from "../../../../../../assets/Icons/file-ic.png";
import "./schoolfilecard.css";

function SchoolFileCardLULB({ title, description, apiEndpoint, userId }) {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const currentDate = new Date();
  const currentMonthYear = `${
    currentDate.getMonth() + 1
  }-${currentDate.getFullYear()}`;

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

  // Filter files based on the current month and year
  const filteredFiles = files.filter((file) => {
    const fileDate = new Date(file.timestamp);
    const fileMonthYear = `${
      fileDate.getMonth() + 1
    }-${fileDate.getFullYear()}`;
    return fileMonthYear === currentMonthYear;
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
            onClick={() =>
              navigate("/school-file-list-lulb", {
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

export default SchoolFileCardLULB;
