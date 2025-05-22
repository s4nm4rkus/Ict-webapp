// Import React and necessary hooks
import React, { useState, useEffect } from "react";

// Import Font Awesome for icons
import "font-awesome/css/font-awesome.min.css";

// Import CSS for styling the file card
import "./file.card.css";

// Import React Router hook for navigation
import { useNavigate } from "react-router-dom";

// Import file icon image
import fileIcon from "../../../assets/Icons/file-ic.png";

// Import tag components for status display (either no file or files updated)
import StatusNoCurrentFile from "../../Tags/Empty/noCurrentFile";
import StatusFilesUpdated from "../../../components/Tags/Submitted/updated";

/**
 * This component displays a card for the ICT Laboratory Schedule files.
 * It fetches the file list from the backend, filters the files based on the
 * current month/semester, and displays a view files button.
 */
function CardFile() {
  const navigate = useNavigate(); // Hook to programmatically navigate to other routes
  const [files, setFiles] = useState([]); // State to store fetched files

  // Get the current month and year to help filter file timestamps
  const currentDate = new Date();
  const currentMonthYear = `${
    currentDate.getMonth() + 1
  }-${currentDate.getFullYear()}`;

  /**
   * Handles navigation to the File List page when the "View Files" button is clicked.
   */
  const handleViewFiles = () => {
    navigate("/filelistLS");
  };

  /**
   * Fetches files from the API when the component mounts.
   * Uses bearer token from localStorage for authorization.
   */
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/files/ict-laboratory-schedule`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Send token for authentication
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

  /**
   * Filters the fetched files to show only those that are:
   * - From June of the current year
   * - OR from the same semester and year as the current date
   */
  const filteredFiles = files.filter((file) => {
    const fileDate = new Date(file.timestamp);
    const fileMonth = fileDate.getMonth() + 1; // JS months are 0-based
    const fileYear = fileDate.getFullYear();

    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    // Condition 1: File is from June (6) of current year
    const isJuneCurrentYear = fileMonth === 6 && fileYear === currentYear;

    // Condition 2: File is from the same semester and year
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

  /**
   * Renders the ICT Laboratory Schedule card, including:
   * - Icon and title
   * - File status tag (updated or no file)
   * - Subtitle
   * - View Files button
   */
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
                  ICT Laboratory Schedule
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
                to be sent at the beginning of school year / semester
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
