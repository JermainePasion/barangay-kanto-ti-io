import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import ComplaintCard from "../../components/ComplaintCard";
import axios from "axios";
import { Link } from "react-router-dom";

const ComplaintsList = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/complaints/`);
        // Sort by most recent
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setComplaints(sorted);
      } catch (err) {
        setError("Failed to fetch complaints");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Recent Complaints</h1>

        {loading && <p>Loading complaints...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {complaints.map((complaint) => (
            <Link to={`/complaints/${complaint._id}`} key={complaint._id}>
              <ComplaintCard complaint={complaint} />
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ComplaintsList;
