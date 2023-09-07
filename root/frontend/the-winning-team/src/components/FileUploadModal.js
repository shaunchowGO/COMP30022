import React, { useState } from 'react';
import Modal from 'react-modal';
import { uploadFile } from '../utils/api';

Modal.setAppElement('#root');

function FileUploadModal({ isOpen, onRequestClose }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const fileUploaded = event.target.files[0];
    setFile(fileUploaded);
  };

  const handleUpload = () => {
    console.log('upload file triggered');
    if (files.length > 0) {
      const formData = new FormData();
      files.forEach((file, index) => {
        formData.append(`file${index}`, file);
      });

      uploadFile(file)
        .then((response) => {
          if (response.ok) {
            console.log('Files uploaded successfully');
            onRequestClose();
          } else {
            console.error('File upload failed');
          }
        })
        .catch((error) => {
          console.error('API call failed:', error);
        });
    }
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
