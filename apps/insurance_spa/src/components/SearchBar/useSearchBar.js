import { useState, useEffect, useRef } from "react";

export function useSearchBar(initialQuery = "", onSave) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [query, setQuery] = useState(initialQuery);

  const inputRef = useRef(null);

  const toggleSearch = () => {
    if (!isOpen) {
      setIsOpen(true);
      setTimeout(() => setIsVisible(true), 60);
    } else {
      if (onSave && query) onSave(query);

      setIsVisible(false);
      setTimeout(() => {
        setIsOpen(false);
        setQuery("");
      }, 360);
    }
  };

  const closeSearch = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsOpen(false);
      setQuery("");
    }, 360);
  };

  const clearQuery = () => setQuery("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (onSave && query) onSave(query);
      clearQuery();
      closeSearch();
    }
  };

  useEffect(() => {
    if (isVisible) setTimeout(() => inputRef.current?.focus(), 50);
  }, [isVisible]);

  return { isOpen, isVisible, query, setQuery, toggleSearch, closeSearch, clearQuery, handleKeyDown, inputRef };
}
