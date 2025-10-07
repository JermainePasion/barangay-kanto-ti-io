import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ComplaintCard from "../../components/ComplaintCard";
import axios from "axios";

function MyComplaintsScreen() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/complaints/my-complaints",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            withCredentials: true,
          }
        );
        console.log(data)
        setComplaints(data);
      } catch {
        setError("Failed to fetch your complaints");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-orange-600 mb-6">
          My Complaints
        </h1>

        {loading && (
          <p className="text-center text-gray-600 mt-10">Loading...</p>
        )}

        {error && <p className="text-center text-red-600 mt-10">{error}</p>}

        {!loading && !error && complaints.length === 0 && (
          <p className="text-center text-gray-600 mt-10">
            You haven't submitted any complaints yet.
          </p>
        )}

        {!loading && !error && complaints.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {complaints.map((complaint) => (
              <ComplaintCard key={complaint._id} complaint={complaint} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default MyComplaintsScreen;
