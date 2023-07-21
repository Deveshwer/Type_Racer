import React, { useRef, useState } from 'react';

const DisplayGameCode = ({ gameID }) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const textInputRef = useRef(null);

  const copyToClipboard = (e) => {
    textInputRef.current.select();
    document.execCommand('copy');
    setCopySuccess(true);
  };

  return (
    <div className="card my-3">
      <div className="card-body text-center">
        <h4 className="card-title">Send this Code to Your Friends for them to join</h4>
        <div className="input-group mb-3">
          <input
            type="text"
            ref={textInputRef}
            value={gameID}
            readOnly
            className="form-control text-center" // Center the input text
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary" // Changed to a primary button for better visibility
              onClick={copyToClipboard}
              type="button"
            >
              Copy Game Code
            </button>
          </div>
        </div>
        {copySuccess ? (
          <div className="alert alert-success mt-2" role="alert"> {/* Added margin top */}
            Successfully Copied Game Code
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DisplayGameCode;