import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { ArrowLeft, MapPin, StickyNote, User, ImageOff } from "lucide-react";

const ComplaintScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaint = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/complaints/${id}`);
        setComplaint(data);
      } catch {
        setError("Failed to fetch complaint details");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaint();
  }, [id]);

  if (loading)
    return (
      <DashboardLayout>
        <p className="p-4 text-center text-gray-600">Loading...</p>
      </DashboardLayout>
    );

  if (error)
    return (
      <DashboardLayout>
        <p className="p-4 text-center text-red-600">{error}</p>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      <div className="p-2 max-w-6xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-orange-600 font-semibold text-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            Back to Complaints
          </button>
        </div>

        <div className="bg-orange-50 shadow-xl rounded-3xl p-10 flex flex-col md:flex-row gap-10">
          {complaint.imageUrl ? (
            <img
              src={complaint.imageUrl}
              alt="Complaint"
              className="w-full md:w-[45%] h-[26rem] object-cover rounded-2xl"
            />
          ) : (
            <div className="w-full md:w-[45%] h-[26rem] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center rounded-2xl">
              <ImageOff className="w-16 h-16 text-gray-500" />
            </div>
          )}

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <h2 className="text-4xl font-bold text-red-600">
                  {complaint.category}
                </h2>
                <span
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                    complaint.status === "Resolved"
                      ? "bg-green-100 text-green-700"
                      : complaint.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {complaint.status}
                </span>
              </div>

              <p className="text-gray-800 mt-6 text-lg leading-relaxed">
                {complaint.description}
              </p>

              <div className="mt-8 space-y-3 text-gray-700 text-base">
                <p className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  <span>
                    <span className="font-semibold">Location:</span>{" "}
                    {complaint.location || "Not specified"}
                  </span>
                </p>

                {complaint.adminRemarks && (
                  <p className="flex items-center gap-2">
                    <StickyNote className="w-5 h-5 text-orange-600" />
                    <span>
                      <span className="font-semibold">Admin Remarks:</span>{" "}
                      {complaint.adminRemarks}
                    </span>
                  </p>
                )}

                <p className="flex items-center gap-2">
                  <User className="w-5 h-5 text-orange-600" />
                  <span>
                    <span className="font-semibold">Submitted by:</span>{" "}
                    {complaint.user?.name || "Anonymous"}
                  </span>
                </p>
              </div>
            </div>

            {complaint.createdAt && (
              <p className="text-sm text-gray-500 mt-10">
                Posted{" "}
                {formatDistanceToNow(new Date(complaint.createdAt), {
                  addSuffix: true,
                })}
              </p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ComplaintScreen;
