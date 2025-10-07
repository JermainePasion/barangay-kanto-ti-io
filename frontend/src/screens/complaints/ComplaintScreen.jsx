import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";
import axios from "axios";

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
      } catch (err) {
        setError("Failed to fetch complaint details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaint();
  }, [id]);

  if (loading) return <DashboardLayout><p className="p-4">Loading...</p></DashboardLayout>;
  if (error) return <DashboardLayout><p className="p-4 text-red-500">{error}</p></DashboardLayout>;

  return (
    <DashboardLayout>
      <div className="p-4 max-w-3xl mx-auto">
        <button 
          className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

        <div className="bg-white shadow rounded p-6 flex flex-col gap-4">
          {complaint.imageUrl && (
            <img 
              src={complaint.imageUrl} 
              alt="Complaint" 
              className="w-full h-64 object-cover rounded"
            />
          )}
          <h2 className="text-xl font-bold">{complaint.category}</h2>
          <p><strong>Description:</strong> {complaint.description}</p>
          <p><strong>Location:</strong> {complaint.location}</p>
          <p><strong>Status:</strong> 
            <span className={`ml-2 font-semibold ${
              complaint.status === "Resolved" ? "text-green-600" : complaint.status === "In Progress" ? "text-yellow-600" : "text-gray-600"
            }`}>
              {complaint.status}
            </span>
          </p>
          {complaint.adminRemarks && (
            <p><strong>Admin Remarks:</strong> {complaint.adminRemarks}</p>
          )}
          <p><strong>Submitted by:</strong> {complaint.user?.name || "Anonymous"}</p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ComplaintScreen;
