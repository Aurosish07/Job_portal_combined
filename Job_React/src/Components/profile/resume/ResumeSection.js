import React, { useState } from 'react';
import './ResumeUpload.css';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Check file size (2MB = 2 * 1024 * 1024 bytes)
      if (selectedFile.size > 2 * 1024 * 1024) {
        alert('File size should not exceed 2MB');
        return;
      }
      
      // Check file type
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/rtf'];
      if (!validTypes.includes(selectedFile.type)) {
        alert('Please upload a valid file format (doc, docx, rtf, pdf)');
        return;
      }

      setFile(selectedFile);
    }
  };

  return (
    <div className="resume-section">
      <h2>Resume</h2>
      <p className="description">
        Your resume is the first impression you make on potential employers. Craft it carefully to secure your desired job or internship.
      </p>

      <div className="upload-area">
        <input
          type="file"
          id="resume-upload"
          onChange={handleFileChange}
          accept=".doc,.docx,.rtf,.pdf"
          className="file-input"
        />
        <label htmlFor="resume-upload" className="upload-button">
          Upload resume
        </label>
        <p className="format-text">
          Supported formats: doc, docx, rtf, pdf, up to 2MB
        </p>
      </div>

      <div className="create-resume-box">
        <div className="icon-container">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5Z" stroke="#1A91FF" strokeWidth="2"/>
            <path d="M7 7H17M7 12H17M7 17H12" stroke="#1A91FF" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <div className="create-resume-content">
          <h3>Don't have a resume yet?</h3>
          <p>Create a job-winning resume with our simple resume builder</p>
        </div>
        <button className="create-resume-button">Create resume</button>
      </div>
    </div>
  );
};

export default ResumeUpload;