import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import ComplaintCard from "../components/ComplaintCard";

function HomeScreen() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTopComplaints = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/complaints/top-liked`
        );
        setComplaints(data);
      } catch (err) {
        setError("Failed to fetch complaints");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopComplaints();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Most Liked Complaints</h1>

        {loading && <p>Loading complaints...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {complaints.map((complaint) => (
            <ComplaintCard
              key={complaint._id}
              complaint={complaint}
              setComplaints={setComplaints} // pass setter to update likes
            />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default HomeScreen;
