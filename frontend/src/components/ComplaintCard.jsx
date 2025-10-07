import React from "react";
import { useNavigate } from "react-router-dom";
import LikeButton from "./LikeButton";

const ComplaintCard = ({ complaint }) => {
  const navigate = useNavigate();
  const userLiked = complaint.likes?.some(
    (id) => id.toString() === localStorage.getItem("userId")
  );

  return (
    <div
      onClick={() => navigate(`/complaints/${complaint._id}`)}
      className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-sm cursor-pointer hover:shadow-lg transition-shadow"
    >
      <img
        src={complaint.imageUrl || "https://via.placeholder.com/400x200"}
        alt={complaint.category}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {complaint.user?.name || "Anonymous"}
        </h2>
        <p className="text-sm text-gray-600 mt-1">{complaint.category}</p>
        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
          {complaint.description}
        </p>

        <div
          className="mt-3 flex items-center justify-between"
          onClick={(e) => e.stopPropagation()} // prevent triggering navigate when liking
        >
          <LikeButton
            complaintId={complaint._id}
            initialLikes={complaint.likes?.length}
            initialLiked={userLiked}
          />
          <span className="text-sm text-gray-500">{complaint.status}</span>
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard;
