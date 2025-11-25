import React from "react";
import { useAssistantBody } from "./useAssistantBody";

const AssistantBody = ({ messages, messagesEndRef }) => {
  useAssistantBody(messages, messagesEndRef);

  return (
    <div className="assistant-modal-body">
      {messages.map(msg => (
        <div
          key={msg.id}
          className={`message-bubble ${msg.sender === "assistant" ? "chat-bot" : "user"}`}
        >
          {msg.text}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default AssistantBody;
