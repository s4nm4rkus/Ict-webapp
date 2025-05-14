import React, { useState, useEffect } from "react";
import axios from "axios";
import "./reporttable.css";
import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function ReportTable() {
  const [files, setFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const dropdownCellStyle = {
    textAlign: "center",
    justifyContent: "center",
    alignContent: "center",
    color: "#1b91e1",
  };

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/summary");
        setFiles(res.data || []);
      } catch (err) {
        console.error("Failed to fetch grouped files:", err);
      }
    };

    fetchFiles();
  }, []);

  const isMaintenanceSchedUpdated = (uploads) => {
    const currentYear = new Date().getFullYear();
    return uploads?.some((file) => {
      const date = new Date(file.timestamp);
      return date.getFullYear() === currentYear && date.getMonth() === 5; // June = 5 (0-based index)
    });
  };

  const isIctLabSchedUpdated = (uploads, schoolLevel) => {
    if (!uploads) return false;

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0-indexed

    const isFirstSem = currentMonth >= 5 && currentMonth <= 11;

    return uploads.some((file) => {
      const fileDate = new Date(file.timestamp);
      const fileYear = fileDate.getFullYear();
      const fileMonth = fileDate.getMonth();

      if (schoolLevel === "Senior High School") {
        if (isFirstSem) {
          // June–Dec of current year
          return fileYear === currentYear && fileMonth >= 5 && fileMonth <= 11;
        } else {
          // Dec of previous year OR Jan–May of current year
          return (
            (fileYear === currentYear && fileMonth >= 0 && fileMonth <= 4) ||
            (fileYear === currentYear - 1 && fileMonth === 11)
          );
        }
      } else {
        // Junior High: June only of current year
        return fileYear === currentYear && fileMonth === 5;
      }
    });
  };

  const getMonthColor = (month, uploadsForType) => {
    if (!uploadsForType || typeof uploadsForType !== "object") return "white";

    const uploadsInMonth = uploadsForType[month.toString()];
    if (!Array.isArray(uploadsInMonth)) return "white";

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // Check if any file in this month is from the current year
    const hasCurrentYearUpload = uploadsInMonth.some((file) => {
      const uploadDate = new Date(file.timestamp);
      return (
        uploadDate.getFullYear() === currentYear &&
        uploadDate.getMonth() === month
      );
    });

    return hasCurrentYearUpload ? "#1BE17E" : "white";
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const sortedFiles = files
    .slice()
    .sort((a, b) => a.school.localeCompare(b.school));
  const currentFiles = sortedFiles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(files.length / itemsPerPage);

  return (
    <div className="contentContainer">
      <table className="table table-hover mt-4">
        <thead>
          <tr>
            <th style={{ ...headerStyle(true), width: "200px" }} scope="col">
              School
            </th>
            <th style={{ ...headerStyle(), width: "220px" }} scope="col">
              ICT Coordinator
            </th>
            <th style={headerStyle()} scope="col">
              ICT Lab Sched
            </th>
            <th style={headerStyle()} scope="col">
              Maintenance Sched
            </th>
            <th style={headerStyle()} scope="col">
              Maintenance Report
            </th>
            <th style={headerStyle(false, true)} scope="col">
              ICT Lab Users Logbook
            </th>
          </tr>
        </thead>
        <tbody>
          {currentFiles.map((group, index) => (
            <tr key={index}>
              <td>{group.school}</td>
              <td>{group.ictCoordinator}</td>
              <td style={{ textAlign: "center", alignContent: "center" }}>
                {isIctLabSchedUpdated(
                  group.uploads?.ictLabSched,
                  group.level
                ) ? (
                  <i
                    className="fas fa-check-circle fs-5 ps-1"
                    style={{ color: "#1be17e" }}
                  ></i>
                ) : (
                  <i
                    className="fas fa-exclamation-circle fs-5 ps-1"
                    style={{ color: "#e7495c" }}
                  />
                )}
              </td>

              <td style={{ textAlign: "center", alignContent: "center" }}>
                {isMaintenanceSchedUpdated(group.uploads?.maintenanceSched) ? (
                  <i
                    className="fas fa-check-circle fs-5 ps-1"
                    style={{ color: "#1be17e" }}
                  ></i>
                ) : (
                  <i
                    className="fas fa-exclamation-circle fs-5 ps-1"
                    style={{ color: "#e7495c" }}
                  />
                )}
              </td>

              <td style={dropdownCellStyle}>
                {renderMonthDropdown(
                  "Monthly Maintenance Report",
                  group.uploadsPerMonth?.maintenanceReport,
                  group.userId
                )}
              </td>
              <td style={dropdownCellStyle}>
                {renderMonthDropdown(
                  "ICT Lab Users Logbook",
                  group.uploadsPerMonth?.logbook,
                  group.userId
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between mt-4">
        <nav>
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                currentPage === totalPages ? "disabled" : ""
              }`}
            >
              <button
                className="page-link"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );

  // ----- Helper functions -----

  function headerStyle(first = false, last = false) {
    return {
      backgroundColor: "#1B91E1",
      color: "#FFF",
      fontSize: 16,
      fontWeight: 600,
      borderTopLeftRadius: first ? "8px" : undefined,
      borderTopRightRadius: last ? "8px" : undefined,
      textAlign: "center",
    };
  }

  function renderMonthDropdown(title, monthsArray, userId) {
    return (
      <div className="dropdown-center">
        <button
          style={{ fontSize: 18, padding: 0, border: 0 }}
          className="btn dropdown-toggle"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onClick={() => console.log("UserID:", userId)}
        >
          <i className="fa fa-calendar fs-7" aria-hidden="true"></i>
        </button>
        <ul
          className="dropdown-menu dropdownCal"
          style={{
            marginTop: "-20px",
            padding: "15px 30px",
            textAlign: "center",
            justifyContent: "center",
            border: 0,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <p style={{ marginBottom: -4 }}>{title}</p>
            <hr style={{ marginBottom: 5 }} />
            <table className="table table-calendar mb-2">
              <thead>
                <tr>
                  {[
                    "JAN",
                    "FEB",
                    "MAR",
                    "APR",
                    "MAY",
                    "JUN",
                    "JUL",
                    "AUG",
                    "SEP",
                    "OCT",
                    "NOV",
                    "DEC",
                  ].map((monthName, idx) => (
                    <th key={idx}>{monthName}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {Array.from({ length: 12 }).map((_, month) => {
                    const color = getMonthColor(month, monthsArray);

                    return (
                      <td
                        key={month}
                        style={{
                          backgroundColor: color,
                          width: "40px",
                          height: "40px",
                          border: "1px solid #ccc",
                        }}
                      >
                        {color === "red" ? month + 1 : ""}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </ul>
      </div>
    );
  }
}

export default ReportTable;
