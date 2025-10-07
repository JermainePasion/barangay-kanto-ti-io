import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import LikeButton from "./LikeButton";

const ComplaintCard = ({ complaint }) => {
  const navigate = useNavigate();
  const userLiked = complaint.likes?.some(
    (id) => id.toString() === localStorage.getItem("userId")
  );

  return (
    <div
      onClick={() => navigate(`/complaints/${complaint._id}`)}
      className="flex flex-col justify-between bg-orange-50 rounded-2xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-transform duration-200 h-full"
    >
      {/* Image */}
      {complaint.imageUrl ? (
        <img
          src={complaint.imageUrl}
          alt={complaint.category}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7zm3 0l6 6 6-6"
            />
          </svg>
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-grow justify-between p-4">
        <div>
          <h2 className="text-base font-medium text-gray-700">
            {complaint.user?.name || "Anonymous"}
          </h2>
          <p className="text-sm font-semibold text-red-600 mt-1">
            {complaint.category}
          </p>
          <p className="text-sm text-gray-500 mt-2 line-clamp-2">
            {complaint.description}
          </p>
        </div>

        <div className="mt-4">
          <p className="text-xs text-gray-400">
            {formatDistanceToNow(new Date(complaint.createdAt), {
              addSuffix: true,
            })}
          </p>
        </div>

        {/* Footer */}
        <div
          className="mt-4 flex items-center justify-between bg-orange-100 rounded-lg px-3 py-2"
          onClick={(e) => e.stopPropagation()} // prevent navigation on like click
        >
          <LikeButton
            complaintId={complaint._id}
            initialLikes={complaint.likes?.length}
            initialLiked={userLiked}
          />
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              complaint.status === "Resolved"
                ? "bg-green-100 text-green-700"
                : complaint.status === "Pending"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {complaint.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard;
