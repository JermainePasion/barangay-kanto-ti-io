import React, { useState } from "react";
import axios from "axios";

const LikeButton = ({ complaintId, initialLikes = 0, initialLiked = false }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(initialLiked);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        alert("Please log in first");
        return;
      }

      const endpoint = liked
        ? `http://localhost:5000/api/complaints/${complaintId}/unlike`
        : `http://localhost:5000/api/complaints/${complaintId}/like`;

      await axios.put(
        endpoint,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI after success
      setLikes((prev) => (liked ? prev - 1 : prev + 1));
      setLiked(!liked);
    } catch (error) {
      console.error("Error liking/unliking complaint:", error);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center space-x-1 text-sm font-medium ${
        liked ? "text-blue-600" : "text-gray-600"
      } hover:text-blue-500`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`w-5 h-5 ${liked ? "fill-blue-600" : "fill-none"}`}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14 9l-1-5a2 2 0 00-2-2H5.5a2 2 0 00-2 2L3 12v9a1 1 0 001 1h10.5a2 2 0 001.995-1.85L17 14h3a1 1 0 001-1V9h-7z"
        />
      </svg>
      <span>{likes}</span>
    </button>
  );
};

export default LikeButton;
