import React from "react";

const AssistantHeader = ({ toggleMinimize, toggleChat }) => (
  <div className="assistant-modal-header">
    Asistent PPV
    <div className="assistant-header-buttons">
      <button className="assistant-min-btn" onClick={toggleMinimize}>–</button>
      <button className="assistant-close-btn" onClick={toggleChat}>✖</button>
    </div>
  </div>
);

export default AssistantHeader;
