import React, { useState } from "react";
import "font-awesome/css/font-awesome.min.css";
import "./uploadfile.css";
import SuccessModal from "./Done Upload/success.upload";

function FileUploadModal({ show, handleClose, onFileUploaded }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [level, setLevel] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!file || !title || !description || !level) {
      alert("Please fill all required fields.");
      return;
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "my_preset"); // Ensure it's an unsigned preset
    formData.append("resource_type", "auto"); // Auto type, handles all file types

    try {
      // Upload to Cloudinary
      const cloudinaryRes = await fetch(
        "https://api.cloudinary.com/v1_1/dfjqx87qg/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!cloudinaryRes.ok) {
        throw new Error(`Cloudinary Error: ${cloudinaryRes.statusText}`);
      }

      const cloudinaryData = await cloudinaryRes.json();

      if (!cloudinaryData.secure_url) {
        throw new Error("Cloudinary upload failed");
      }

      // Send file data to MongoDB after successful upload
      const fileData = {
        title,
        description,
        timestamp: new Date(),
        fileUrl: cloudinaryData.secure_url,
        originalFileName: file.name, // Save the Cloudinary URL
        level,
      };

      const dbResponse = await fetch(
        "http://localhost:5000/api/upload/ict-laboratory-schedule",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(fileData),
        }
      );

      if (!dbResponse.ok) {
        throw new Error(`Database Error: ${dbResponse.statusText}`);
      }
      if (onFileUploaded) {
        onFileUploaded(fileData);
      }

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 4000);

      setTimeout(() => {
        handleClose(); // Close modal
        window.location.reload(); // Refresh page after closing
      }, 2800);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      {show && <div className="modal-overlay" onClick={handleClose}></div>}

      <div className={`modalContainer ${show ? "show" : ""}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Upload File</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
              ></button>
            </div>

            <hr style={{ marginTop: 5, borderColor: "red", borderWidth: 2 }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h5 style={{ fontSize: "20px", fontWeight: 400 }}>
                ICT Laboratory Schedule
              </h5>
              <div style={{ display: "flex" }}>
                <h5
                  style={{ fontSize: "20px", fontWeight: 400, marginRight: 20 }}
                >
                  <input
                    type="radio"
                    name="fileSelect"
                    value="Elementary/JHS"
                    checked={level === "Elementary/JHS"}
                    onChange={() => setLevel("Elementary/JHS")}
                    style={{
                      transform: "scale(1.4)",
                      cursor: "pointer",
                      marginRight: 8,
                    }}
                  />
                  Elementary/JHS
                </h5>
                <h5 style={{ fontSize: "20px", fontWeight: 400 }}>
                  <input
                    type="radio"
                    name="fileSelect"
                    value="Senior High School"
                    checked={level === "Senior High School"}
                    onChange={() => setLevel("Senior High School")}
                    style={{
                      transform: "scale(1.4)",
                      cursor: "pointer",
                      marginRight: 8,
                    }}
                  />
                  SHS
                </h5>
              </div>
            </div>
            {/* Title Input */}
            <div className="inputContainer" style={{ marginTop: 10 }}>
              <label htmlFor="fileTitle" className="inputLabelEmail">
                Title *
              </label>
            </div>
            <input
              type="text"
              className="titleInput"
              id="fileTitle"
              placeholder="Enter document title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{ backgroundColor: "#F1F1F1" }}
            />

            {/* Description Input */}
            <div className="inputContainer" style={{ marginTop: 10 }}>
              <label htmlFor="fileDescription" className="inputLabelEmail">
                Description *
              </label>
            </div>
            <input
              type="text"
              className="titleInput"
              id="fileDescription"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ backgroundColor: "#F1F1F1" }}
            />

            {/* File Input */}
            <div className="modal-body">
              <div className="inputContainer">
                <label htmlFor="fileInput" className="inputLabelEmail">
                  Choose File *
                </label>
              </div>
              <input
                type="file"
                id="fileInput"
                className="form-control"
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                style={{
                  backgroundColor: "#F1F1F1",
                  color: "#A3A3A3",
                  fontWeight: 300,
                }}
              />
            </div>

            {/* Submit Button */}
            <div className="modal-footer">
              <button
                className="viewFileBtnContainer"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  width: "160px",
                  color: "white",
                  marginTop: "10px",
                  cursor: uploading ? "not-allowed" : "pointer",
                }}
                disabled={uploading}
                onClick={handleUpload}
              >
                <p className="viewFileBtn" style={{ fontWeight: "500" }}>
                  {uploading ? "Uploading..." : "Submit"}
                </p>
              </button>
            </div>

            {showSuccess && (
              <SuccessModal onClose={() => setShowSuccess(false)} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default FileUploadModal;
