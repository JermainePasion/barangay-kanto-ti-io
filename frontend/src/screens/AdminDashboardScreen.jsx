import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import MessageBanner from "../components/MessageBanner"; // make sure the path is correct
import ComplaintStats from "../components/ComplaintStats";

function AdminDashboardScreen() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [search, setSearch] = useState("");
  const [banner, setBanner] = useState({ type: "", message: "" });

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/complaints", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComplaints(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching complaints:", err);
        setBanner({ type: "error", message: "Failed to load complaints." });
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const complaint = complaints.find((c) => c._id === id);
      const res = await axios.put(
        `http://localhost:5000/api/complaints/${id}/admin-update`,
        {
          status: complaint.status,
          adminRemarks: complaint.adminRemarks || "",
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updated = res.data.updatedComplaint || res.data.complaint;
      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? { ...c, ...updated } : c))
      );
      setSelectedComplaint(null);
      setBanner({ type: "success", message: "Complaint updated successfully!" });
    } catch (err) {
      console.error("Error updating complaint:", err);
      setBanner({ type: "error", message: "Failed to update complaint." });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?"))
      return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/complaints/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComplaints((prev) => prev.filter((c) => c._id !== id));
      setBanner({ type: "success", message: "Complaint deleted successfully!" });
    } catch (err) {
      console.error("Error deleting complaint:", err);
      setBanner({ type: "error", message: "Failed to delete complaint." });
    }
  };

  const filteredComplaints = complaints.filter((complaint) => {
    const query = search.toLowerCase();
    return (
      complaint.category?.toLowerCase().includes(query) ||
      complaint.description?.toLowerCase().includes(query) ||
      complaint.location?.toLowerCase().includes(query) ||
      complaint.status?.toLowerCase().includes(query)
    );
  });

  if (loading)
    return (
      <DashboardLayout>
        <div className="text-center text-gray-500 mt-10">
          Loading complaints...
        </div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout>
      
      <MessageBanner
        type={banner.type}
        message={banner.message}
        onClose={() => setBanner({ type: "", message: "" })}
      />

      

      <div className="p-6 bg-[#FEF3E2] min-h-screen">
         <ComplaintStats complaints={complaints}/>

        <div className="mb-3 mt-10">
          <input
            type="text"
            className="border rounded px-3 py-2 w-full"
            placeholder="Search by category, description, location, or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="overflow-x-auto bg-white shadow-lg rounded-2xl">
          <table className="min-w-full border border-gray-200 text-sm text-gray-700">
            <thead className="bg-[#FAB12F] text-white">
              <tr>
                <th className="p-3 border-b">Image</th>
                <th className="p-3 border-b">Category</th>
                <th className="p-3 border-b">Description</th>
                <th className="p-3 border-b">Location</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Remarks</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-6">
                    No complaints found.
                  </td>
                </tr>
              ) : (
                filteredComplaints.map((complaint) => (
                  <tr
                    key={complaint._id}
                    className="border-b hover:bg-[#FFF8EE] transition"
                  >
                    <td className="p-3">
                      {complaint.imageUrl ? (
                        <img
                          src={complaint.imageUrl}
                          alt="Complaint"
                          className="w-20 h-14 object-cover rounded-lg cursor-pointer hover:scale-105 transition"
                          onClick={() => setSelectedComplaint(complaint)}
                        />
                      ) : (
                        <span className="text-gray-400 italic">No Image</span>
                      )}
                    </td>
                    <td className="p-3">{complaint.category || "N/A"}</td>
                    <td
                      className="p-3 max-w-[200px] truncate cursor-pointer"
                      onClick={() => setSelectedComplaint(complaint)}
                    >
                      {complaint.description || "No description"}
                    </td>
                    <td className="p-3">{complaint.location || "N/A"}</td>
                    <td className="p-3">
                      <select
                        value={complaint.status || "Pending"}
                        onChange={(e) =>
                          setComplaints((prev) =>
                            prev.map((c) =>
                              c._id === complaint._id
                                ? { ...c, status: e.target.value }
                                : c
                            )
                          )
                        }
                        className="border border-gray-300 rounded-md px-2 py-1 text-sm"
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <textarea
                        rows={2}
                        value={complaint.adminRemarks || ""}
                        onChange={(e) =>
                          setComplaints((prev) =>
                            prev.map((c) =>
                              c._id === complaint._id
                                ? { ...c, adminRemarks: e.target.value }
                                : c
                            )
                          )
                        }
                        placeholder="Enter remarks..."
                        className="border border-gray-300 rounded-md px-2 py-1 text-sm w-full"
                      ></textarea>
                    </td>
                    <td className="p-3 flex flex-col gap-2">
                      <button
                        onClick={() => handleUpdate(complaint._id)}
                        className="bg-green-500 text-white px-3 py-1.5 rounded-md text-sm hover:bg-green-600 transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => handleDelete(complaint._id)}
                        className="bg-red-500 text-white px-3 py-1.5 rounded-md text-sm hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Complaint Details Modal */}
        {selectedComplaint && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-40">
            <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
              <button
                onClick={() => setSelectedComplaint(null)}
                className="absolute top-2 right-2 text-gray-600 hover:text-black"
              >
                ✕
              </button>
              <h2 className="text-xl font-semibold mb-3">
                {selectedComplaint.category || "No Category"}
              </h2>
              <img
                src={selectedComplaint.imageUrl}
                alt="Complaint"
                className="w-full h-64 object-contain mb-3 rounded-lg"
              />
              <p className="text-gray-700 mb-2">
                <strong>Description:</strong>{" "}
                {selectedComplaint.description || "No description provided"}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Location:</strong> {selectedComplaint.location || "N/A"}
              </p>
              <p className="text-gray-700">
                <strong>Status:</strong> {selectedComplaint.status || "Pending"}
              </p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default AdminDashboardScreen;
