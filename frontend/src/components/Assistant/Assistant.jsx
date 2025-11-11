import React from "react";
import AssistantHeader from "./AssistantHeader";
import AssistantBody from "./AssistantBody";
import AssistantFooter from "./AssistantFooter";
import { useAssistant } from "./useAssistant";
import "./AssistantBase.css";
import "./AssistantEffects.css";

export default function Assistant() {
  const {
    isOpen,
    isVisible,
    isMinimized,
    messages,
    input,
    messagesEndRef,
    textareaRef,
    toggleChat,
    toggleMinimize,
    sendMessage,
    handleKeyPress,
    setInput
  } = useAssistant();

  return (
    <>
      <button className={`assistant ${isOpen ? "open-disabled" : ""}`} onClick={toggleChat}>🤖</button>

      {isOpen && (
        <div
          className={`assistant-modal-content
            ${isVisible ? "open" : ""}
            ${isMinimized ? "minimized" : ""}`}
        >
          <AssistantHeader toggleMinimize={toggleMinimize} toggleChat={toggleChat} />
          <AssistantBody messages={messages} messagesEndRef={messagesEndRef} />
          <AssistantFooter
            input={input}
            setInput={setInput}
            textareaRef={textareaRef}
            handleKeyPress={handleKeyPress}
            sendMessage={sendMessage}
          />
        </div>
      )}
    </>
  );
}
