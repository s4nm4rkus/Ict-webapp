import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "./outdatedfiles.css";
// import axios from "axios";

function StatusNoCurrentFile() {
  return (
    <div className="tagContainer">
      <p className="nocurrentfilText" style={{ paddingTop: 2 }}>
        Outdated <i className="fas fa-exclamation-circle ps-1"></i>
      </p>
    </div>
  );
}

export default StatusNoCurrentFile;
