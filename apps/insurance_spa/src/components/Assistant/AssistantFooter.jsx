import React from "react";

const AssistantFooter = ({ input, setInput, textareaRef, handleKeyPress, sendMessage }) => (
  <div className="assistant-modal-footer">
    <textarea
      ref={textareaRef}
      value={input}
      onInput={(e) => {
        setInput(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
      }}
      onKeyDown={handleKeyPress}
      placeholder="Napiš zprávu..."
      rows={1}
    />
    <button onClick={sendMessage}>Odeslat</button>
  </div>
);

export default AssistantFooter;
