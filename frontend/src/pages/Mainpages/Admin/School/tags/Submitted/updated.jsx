import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "./updatedfiles.css";
// import axios from "axios";

function StatusFilesUpdated() {
  return (
    <div className="tagContainerDone">
      <p className="nocurrentfilText" style={{ paddingTop: 2 }}>
        Updated <i className="fas fa-check-circle ps-1"></i>
      </p>
    </div>
  );
}

export default StatusFilesUpdated;
