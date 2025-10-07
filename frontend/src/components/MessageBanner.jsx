import React, { useEffect } from "react";

const MessageBanner = ({ type = "info", message, onClose }) => {

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => onClose?.(), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const baseStyle =
    "fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-md text-white text-center font-semibold z-50 transition-all duration-300";

  const typeStyle =
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-yellow-500";

  return (
    <div className={`${baseStyle} ${typeStyle}`}>
      {message}
    </div>
  );
};

export default MessageBanner;
