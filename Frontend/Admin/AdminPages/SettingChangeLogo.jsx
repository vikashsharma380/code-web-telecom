import React, { useState } from "react";

export default function SettingChangeLogo() {
  const [fileName, setFileName] = useState("No file chosen");

  const containerStyle = {
    margin: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const headerStyle = {
    backgroundColor: "#337ab7",
    color: "#fff",
    padding: "12px 20px",
    fontSize: "18px",
    borderTopLeftRadius: "4px",
    borderTopRightRadius: "4px",
  };

  const boxStyle = {
    border: "1px solid #ddd",
    borderTop: "none",
    padding: "25px",
    backgroundColor: "#fff",
    borderBottomLeftRadius: "4px",
    borderBottomRightRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  };

  const inputStyle = {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "6px 8px",
    cursor: "pointer",
  };

  const buttonStyle = {
    backgroundColor: "#337ab7",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    padding: "8px 18px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "0.3s",
  };

  const fileNameStyle = {
    fontSize: "14px",
    color: "#555",
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "No file chosen");
  };

  const handleUpload = () => {
    alert("Logo uploaded successfully!");
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>Upload Logo</div>
      <div style={boxStyle}>
        <input
          type="file"
          style={inputStyle}
          onChange={handleFileChange}
          id="fileInput"
        />
        <span style={fileNameStyle}>{fileName}</span>
        <button
          style={buttonStyle}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#286090")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#337ab7")}
          onClick={handleUpload}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
