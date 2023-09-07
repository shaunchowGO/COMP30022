import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the modal's parent element

function FileUploadModal({ isOpen, onRequestClose }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // Handle the file upload here (e.g., send it to the server)
    // ...
    onRequestClose(); // Close the modal after the upload is complete
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="File Upload Modal"
    >
      <h2>Upload a File</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
}

export default FileUploadModal;
