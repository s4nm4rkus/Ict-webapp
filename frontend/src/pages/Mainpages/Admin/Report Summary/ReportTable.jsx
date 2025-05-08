import React, { useState, useEffect } from "react";
// import Navbar from "../../../../components/Nav/navbar";
import axios from "axios";
import "./reporttable.css";

import "font-awesome/css/font-awesome.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function ReportTable() {
  const [files, setFiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/summary");
        console.log(res.data); // Check what the response looks like
        setFiles(res.data);
      } catch (err) {
        console.error("Failed to fetch grouped files:", err);
      }
    };

    fetchFiles();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const sortedFiles = files
    .slice()
    .sort((a, b) => a.school.localeCompare(b.school));

  const currentFiles = sortedFiles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(files.length / itemsPerPage);

  return (
    <>
      <div className="contentContainer">
        <table className="table table-hover mt-4">
          <thead>
            <tr>
              <th
                style={{
                  backgroundColor: "#1B91E1",
                  color: "#FFF",
                  fontWeight: 600,
                  borderTopLeftRadius: "8px",
                }}
                scope="col"
              >
                School
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
                ICT Coordinator
              </th>
              <th
                style={{
                  backgroundColor: "#1B91E1",
                  color: "#FFF",
                  fontWeight: 600,
                  textAlign: "center",
                }}
                scope="col"
              >
                ICT Laboratory Schedule
              </th>
              <th
                style={{
                  backgroundColor: "#1B91E1",
                  color: "#FFF",
                  fontWeight: 600,
                  textAlign: "center",
                }}
                scope="col"
              >
                Maintenance Schedule
              </th>
              <th
                style={{
                  backgroundColor: "#1B91E1",
                  color: "#FFF",
                  fontWeight: 600,
                  textAlign: "center",
                }}
                scope="col"
              >
                Monthly Maintenance Report
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
                ICT Laboratory Users Logbook
              </th>
            </tr>
          </thead>
          <tbody>
            {currentFiles.map((group, index) => (
              <tr key={index}>
                <td className="school">{group.school}</td>
                <td className="ict_coord">{group.ictCoordinator}</td>
                <td className="ict-lab-sched"></td>
                <td className="maintenance-sched"></td>
                <td
                  className="monthly-maintenance-sched"
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
                          width: 600,
                          minHeight: 100,
                          textAlign: "center",
                        }}
                      >
                        <p style={{ marginBottom: 0 }}>
                          Monthly Maintenance Report
                        </p>
                        <hr></hr>
                        <table className="table table-calendar">
                          <thead>
                            <tr>
                              <th>JAN</th>
                              <th>FEB</th>
                              <th>MAR</th>
                              <th>APR</th>
                              <th>MAY</th>
                              <th>JUN</th>
                              <th>JUL</th>
                              <th>AUG</th>
                              <th>SEP</th>
                              <th>OCT</th>
                              <th>NOV</th>
                              <th>DEC</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="jan">red</td>
                              <td className="feb">red</td>
                              <td className="mar">red</td>
                              <td className="apr">red</td>
                              <td className="may">red</td>
                              <td className="jun">red</td>
                              <td className="jul">red</td>
                              <td className="aug">red</td>
                              <td className="sep">red</td>
                              <td className="oct">red</td>
                              <td className="nov">red</td>
                              <td className="dec">red</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </ul>
                  </div>
                </td>
                <td
                  className="ict-lab-users-log"
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
                          width: 600,
                          minHeight: 100,
                          textAlign: "center",
                        }}
                      >
                        <p style={{ marginBottom: 0 }}>
                          ICT Laboratory Users Logbook
                        </p>
                        <hr></hr>
                        <table className="table table-calendar">
                          <thead>
                            <tr>
                              <th>JAN</th>
                              <th>FEB</th>
                              <th>MAR</th>
                              <th>APR</th>
                              <th>MAY</th>
                              <th>JUN</th>
                              <th>JUL</th>
                              <th>AUG</th>
                              <th>SEP</th>
                              <th>OCT</th>
                              <th>NOV</th>
                              <th>DEC</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="jan">red</td>
                              <td className="feb">red</td>
                              <td className="mar">red</td>
                              <td className="apr">red</td>
                              <td className="may">red</td>
                              <td className="jun">red</td>
                              <td className="jul">red</td>
                              <td className="aug">red</td>
                              <td className="sep">red</td>
                              <td className="oct">red</td>
                              <td className="nov">red</td>
                              <td className="dec">red</td>
                            </tr>
                          </tbody>
                        </table>
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
          <nav>
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 && "disabled"}`}>
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
    </>
  );
}

export default ReportTable;
