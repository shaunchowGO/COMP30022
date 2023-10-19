import React, { useState } from 'react';

function ViewDocuments() {
  const [fileContent, setFileContent] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target.result);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      <div className="content-container">
        <pre>{fileContent}</pre>
      </div>
    </div>
  );
}

export default ViewDocuments;
