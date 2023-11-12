import React, { useState } from 'react';
import Modal from 'react-modal';
import { downloadSubmission } from '../utils/api';
import RotateLoader from "react-spinners/RotateLoader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import '../css/Modal.css';

const ViewDocument = ({ subjectName, studentID, assignmentID }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [fileContent, setFileContent] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  Modal.setAppElement('#root');
  const openModal = async () => {
    setModalIsOpen(true);
  
    try {
      const response = await downloadSubmission(subjectName, studentID, assignmentID);
      console.log(subjectName, studentID, assignmentID)
      if (response && response.blob) {
        const textContent = await response.blob.text();
        console.log(textContent)
        setFileContent(textContent);
        setDownloadUrl(response.downloadUrl);
      } else {
        console.error('Invalid response:', response);
      }
    } catch (error) {
      console.error('Download error:', error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button className='download-button' onClick={openModal}><i className="fa fa-eye"></i> View Submission</button>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
      >
        {fileContent ? (
        <div>
          <pre className='file-container'>{fileContent}</pre>
          {downloadUrl && (
            <a href={downloadUrl} download>
              <button className="download-button">Download Submission</button>
            </a>
          )}
        </div>
        ) : (
          <div>
        <section id="group-spinner">
        <div className="loading-container">
          <RotateLoader color="#7179e7" />
        </div>
      </section>
      </div>
        )}

        <button onClick={closeModal} className="modal-close-button"><FontAwesomeIcon className="close-icon" icon={faXmark} /></button>
      </Modal>
    </div>
  );
};

export default ViewDocument;
