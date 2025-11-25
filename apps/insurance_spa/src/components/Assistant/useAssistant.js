import { useState, useRef, useEffect } from "react";

export const useAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => {
        setIsVisible(true);
        setMessages([{ id: Date.now(), text: "Ahoj! Jak ti mohu pomoci?", sender: "assistant" }]);
        }, 100);
    } else {
      setIsVisible(false);
      setTimeout(() => {
        setIsOpen(false);
        setInput("");
        setIsMinimized(false);
        if (textareaRef.current) textareaRef.current.style.height = "auto";
      }, 300);
    }
  };

  const toggleMinimize = () => setIsMinimized(prev => !prev);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { id: Date.now(), text: input, sender: "user" };
    setMessages(prev => [...prev, newMsg]);
    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    document.querySelectorAll(".message-bubble:not(.show)").forEach((b, i) => {
      setTimeout(() => b.classList.add("show"), i * 80);
    });
  }, [messages]);

  return {
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
    setInput,
    setMessages
  };
};

