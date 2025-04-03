import React from "react";
import "font-awesome/css/font-awesome.min.css";
import "./file.card.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
import fileIcon from "../../../assets/Icons/file-ic.png";
import StatusFilesUpdated from "../../Tags/Submitted/updated";

function CardFile() {
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
                  <StatusFilesUpdated />
                </div>
              </div>
              <p style={{ fontSize: "14px", padding: 0, margin: 0 }}>
                to be sent monthly
              </p>
            </div>
          </div>

          <div className="rightSide">
            <button
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
