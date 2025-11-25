import { useEffect } from "react";

export function useAssistantBody(messages, messagesEndRef) {
  useEffect(() => {
    const bubbles = document.querySelectorAll(".message-bubble:not(.show)");
    bubbles.forEach(b => requestAnimationFrame(() => b.classList.add("show")));

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, messagesEndRef]);
}

