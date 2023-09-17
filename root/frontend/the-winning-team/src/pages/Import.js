import React from 'react';
import '../css/popups/Import.css';

function Import(props) {
  const [files, setFiles] = React.useState(null);
  const inputRef = React.useRef();

  const handleDrag = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setFiles(event.dataTransfer.files);
    console.log(files);
  }

  const handleImport = (event) => {
    
  }

  return (props.trigger) ? (
        <div id="import">
          <div className="import-container">

            <div className="import-header">
              <div className="import-title">
                <h1>Import Document</h1>
                <button className="close-btn" 
                    onClick={props.SetImportTrigger}>
                    <img className="close-icon" src={require(`../assets/images/icons/close_icon.jpeg`)} /> 
                </button>
              </div>
              <p>Select a students assignment to be added to their profile</p>
            </div>

            {!files ? 
              <div className="import-box" onDragOver={handleDrag} onDrop={handleDrop}>
                <p>Drop an assignment file</p>
                <input
                  type='file'
                  multiple
                  onChange={(event) => setFiles(event.target.files)}
                  hidden
                  ref={inputRef}
                ></input>
                <button className="blue-btn" onClick={() => inputRef.current.click()}><img src={require("../assets/images/icons/upload_icon.png")}></img>Upload</button>
              </div>
              :
              <div className="uploads">
                <ul>
                  {Array.from(files).map((file, idx) => <li key={idx}>{file.name}</li>)}
                </ul>
              </div>
            }

            <div className="import-btn">
              <button className="discard-btn blue-btn" onClick={() => setFiles(null)}>Discard</button>
              <button className="blue-btn" onClick={() => handleImport()}>Import</button>
            </div>
          </div>
        </div>
    ) : "";
}

export default Import;
